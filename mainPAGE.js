let allPokemons;
let currentPokemonIndex = 0;
let foundPokemon = false;
let audio = new Audio('./Audio/music-for-relax-yoga-meditation-7783.mp3');
audio.autoplay = false;  


async function loadPokemonList(){
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=1000';
    let response = await fetch(url);
    allPokemons = await response.json();
    loadAllPokemons();
}


async function loadAllPokemons(){
    document.getElementById('seeAll').classList.add('d-none');
    document.getElementById('loadMore').classList.remove('d-none');
    let container = document.getElementById('container');
    container.innerHTML ='';


    for (let i = 0; i < 15; i++) {
        const pokemonName = allPokemons.results[i].name;
        const pokemonCapitalized = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
        const number = allPokemons.results[i].url.toString();
        const lastChar = number.split('/').slice(-2, -1)[0];
        const pokemonDetails = await lookingForImg(pokemonName);

            container.innerHTML += loadAllPokeBoxes(pokemonName, pokemonCapitalized, lastChar, pokemonDetails);
    }
}


async function loadPokemonDetails(index) {
    const url = `https://pokeapi.co/api/v2/pokemon/${index + 1}`;
    const response = await fetch(url);
    return await response.json();    
}


async function loadMorePokemon() {
    const container = document.getElementById('container');  
    document.getElementById('loadMore').disabled = true; 
    currentPokemonIndex += 15; 
  
    for (let i = currentPokemonIndex; i < currentPokemonIndex + 15; i++) { 
      if (i >= allPokemons.results.length) {        
        break;
      }
  
      const pokemonName = allPokemons.results[i].name;
      const pokemonCapitalized = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
      const number = allPokemons.results[i].url.toString();
      const lastChar = number.split('/').slice(-2, -1)[0];
      const pokemonDetails = await lookingForImg(pokemonName);
  
      container.innerHTML += loadAllPokeBoxes(pokemonName, pokemonCapitalized, lastChar, pokemonDetails);
    }
    document.getElementById('loadMore').disabled = false;
}
  

function seeThePokemonInBig(pokemonName) {
    loadPokemon(pokemonName);
    seePokemonWithToggle();
}


function closeInfoPokemon(){
    closePokemonWithToggle();
    document.getElementById('disableScroll').classList.remove('disableScroll');
    document.getElementById('renderThings').classList.remove('backgroundOpacity');
}


async function searchPokemon() {
    let search = document.getElementById('input').value;
    let container = document.getElementById('container');
    search = search.toLowerCase(); 
    let initialContent = container.innerHTML; 

    if (search == '') { 
        alert('Please type something in.');
        
        return;
    }

    container.innerHTML = '';  
    for (let i = 0; i < allPokemons.results.length; i++) {
        const name = allPokemons.results[i].name; 
        if (!name.toLowerCase().includes(search)) {
            continue;
        }
        foundPokemon = true;
        const pokemonCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
        const number = allPokemons.results[i].url.toString();
        const lastChar = number.split('/').slice(-2, -1)[0];
        const pokemonDetails = await lookingForImg(name);
        container.innerHTML += /*html*/ `${loadAllPokeBoxes(name, pokemonCapitalized, lastChar, pokemonDetails)}`;
    }
    
    if (!foundPokemon) {
        container.innerHTML = initialContent; 
        alert('No Pokémon found with that letter in the name. Please try another one.');
    } else {
        document.getElementById('loadMore').classList.add('d-none');
        document.getElementById('seeAll').classList.toggle('d-none');
    } 
}


function playAudio() {
    audio.volume = 0.1;
    audio.autoplay = false; 
    let AudioBoxImg = document.getElementById('volumen');
    if (AudioBoxImg.src.match('volumenOFF.png')) {
        AudioBoxImg.src = './img/volumenON.png';
        audio.autoplay = false; 
        audio.play();
    } else {
        AudioBoxImg.src = './img/volumenOFF.png';
        audio.autoplay = false; 
        audio.pause();
    }
}
