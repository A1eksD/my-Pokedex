let currentPokemon = [];
let currentPokemonDescription;
let Evolution = [];
let seeCurrenName = [];
let seeCurrenCahin = [];


async function loadPokemon(pokemonName) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
  
    await loadPokemonSpecies(pokemonName);
    changeColor();
    await seeEvolution();
    await renderPokemonInfo(pokemonName);
    showLinksinBox();
    await lookingForImg(pokemonName);
}


async function loadPokemonSpecies(pokemonName) {
    let url = `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`;
    let response = await fetch(url);
    currentPokemonDescription = await response.json();
    seeEvolutionChain();
}


function seeEvolutionChain() { 
    let seeChain = currentPokemonDescription.evolution_chain.url;
    let parts = seeChain.split('/');
    let lastPart = parts[parts.length - 2];
    let lastNumber = parseInt(lastPart, 10);
    seeCurrenCahin = [];
    seeCurrenCahin.push(lastNumber);
}


async function seeEvolution() {
    let url = `https://pokeapi.co/api/v2/evolution-chain/`+ seeCurrenCahin;
    let response = await fetch(url);
    Evolution = await response.json();
}


function showLinksinBox() {
    document.getElementById('statsInfo').innerHTML = lodaInnerWhiteBox();
    shwoInfo();
}


async function renderPokemonInfo(pokemonName) {
    document.getElementById('pokemonName').innerHTML = currentPokemonDescription.names[8].name;
    const imgUrl = await lookingForImg(pokemonName);
    document.getElementById('pokemonImgBig').innerHTML = `<img src="${imgUrl}" class ="bigImgPokemon">`;
    document.getElementById('disableScroll').classList.add('disableScroll');
    document.getElementById('renderThings').classList.add('backgroundOpacity');
}


function shwoInfo() {
    document.getElementById('detailsStats').innerHTML = seeDetailsOfInfos();
}


function showStats() {
    document.getElementById('detailsStats').innerHTML = '';
    const hp = currentPokemon.stats[0].base_stat;
    const attack = currentPokemon.stats[2].base_stat;
    const defense = currentPokemon.stats[3].base_stat;
    const speed = currentPokemon.stats[5].base_stat;
    document.getElementById('detailsStats').innerHTML = loadStats();
    seeCanvas(hp, attack, defense, speed);
}


function showAttack() {
    document.getElementById('detailsStats').innerHTML = '';
    for (let i = 0; i < currentPokemon.moves.length; i++) {
        const attack = currentPokemon.moves[i];
        document.getElementById('detailsStats').innerHTML += `
            <span class="separateTheAttacks">${attack['move']['name']}</span>`;
    }
}


async function showTransformation() {
    let showFirstName = Evolution.chain.species.name;
    let showSecondName = Evolution.chain.evolves_to[0] ? Evolution.chain.evolves_to[0].species.name : undefined;
    let showThirdName = Evolution.chain.evolves_to[0] && Evolution.chain.evolves_to[0].evolves_to[0] ? Evolution.chain.evolves_to[0].evolves_to[0].species.name : undefined;
    let pokemonName = [showFirstName, showSecondName, showThirdName].filter(name => name); 

    document.getElementById('detailsStats').innerHTML = '';

    for (let i = 0; i < pokemonName.length; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName[i]}`;
        let response = await fetch(url);
        let currentImg = await response.json(); 
        let imgUrl = await lookingForImg(pokemonName[i]);;
        let nameUrl = currentImg.name.charAt(0).toUpperCase() + currentImg.name.slice(1); 

        document.getElementById('detailsStats').innerHTML += seeTheTransformation(pokemonName[i], imgUrl, nameUrl);
    }
}


function changeColor() {
    const pokedexElement = document.getElementById('pokedex');
    pokedexElement.classList.remove(
        "fire", "grass", "water", "normal", "bug", "fighting", "fairy",
        "poison", "ghost", "rock", "electric", "ice", "dragon", "psychic", "ground"
    );
    const type = currentPokemon.types[0].type.name;
    pokedexElement.classList.add(type);
}