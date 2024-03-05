function lodaInnerWhiteBox() {
    return /*html*/`
    <div id="infoInCard" class="posistionOfWitheCard">
        <div class="infoInCard">
            <a class="infoInCardLink" onclick="shwoInfo()">Info's</a>
            <a class="infoInCardLink" onclick="showTransformation()">Transformation</a>
            <a class="infoInCardLink" onclick="showStats()">Stats</a>
            <a class="infoInCardLink" onclick="showAttack()">Attack's</a>
        </div>
        <div class="infoContainer">
            <div class="infoContainerPadding">
            <div class="stats" id="stats"></div>
        </div>
            <div class="positionDetailsStats">
                <div id="detailsStats" class="textarea">              
                    <div class="myChart">
                        <canvas id="myChart"></canvas>
                    </div>    
                </div>
            </div>
        </div>
    </div>`;
}


function seeDetailsOfInfos() {
    const heightInMeters = currentPokemon.height / 10; 
    const weightInKilograms = currentPokemon.weight / 10; 

    return /*html*/` 
    <div class="positionDetails">
        <b class="positionDetailS">Name : ${currentPokemonDescription.names[8].name}</b> 
        <b class="positionDetailS">Type : ${currentPokemon.types[0].type.name}</b> 
        <b class="positionDetailS">Height: ${heightInMeters} m</b> 
        <b class="positionDetailS">Weight: ${weightInKilograms} kg</b> 
    </div>`;
}


function seeCanvas(hp, attack, defense, speed) {
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['HP', 'Attack', 'Defense', 'Speed'],
            datasets: [{
                label: '',

                backgroundColor: [
                    '#00D739',
                    '#DE0000',
                    '#001DD7',
                    '#F68300',
                ],
                borderColor: [
                    '#00D739',
                    '#DE0000',
                    '#001DD7',
                    '#F68300',
                ],
                data: [hp, attack, defense, speed],

                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}


function seePokemonWithToggle(){
    document.getElementById('pokedex').classList.toggle('d-none');
    document.getElementById('pokemonName').classList.toggle('d-none');
    document.getElementById('pokemonImgBig').classList.toggle('d-none');
    document.getElementById('pokeballImg').classList.toggle('d-none');
    document.getElementById('statsInfo').classList.toggle('d-none');
    document.getElementById('loadMore').classList.toggle('d-none');
}


function closePokemonWithToggle(){
    document.getElementById('pokedex').classList.toggle('d-none');
    document.getElementById('pokemonName').classList.toggle('d-none');
    document.getElementById('pokemonImgBig').classList.toggle('d-none');
    document.getElementById('pokeballImg').classList.toggle('d-none');
    document.getElementById('statsInfo').classList.toggle('d-none');
    document.getElementById('loadMore').classList.toggle('d-none');
}


function loadStats(){
    return /*html*/`
    <div id="detailsStats">
        <div class="myChart">
            <canvas id="myChart"></canvas>
        </div>
    </div>`;
}


function loadAllPokeBoxes(pokemonName, pokemonCapitalized, lastChar, pokemonDetails){
    return /*html*/`
    <div class="PokemonBox" onclick="seeThePokemonInBig('${pokemonName}')" userCardsContainer>
        <div class="NumberAndNameOfPokemon">
            <p># ${lastChar}</p>
            <p dataNames>${pokemonCapitalized}</p>
        </div>
        <img class="smalPokemon" src="${pokemonDetails}" alt="Small Pokemon Image">
    </div>`; 
}


async function lookingForImg(i) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    const response = await fetch(url);
    const pokemonData = await response.json();

    if (pokemonData.sprites.other.home.front_default === null) {
        return pokemonData.sprites.other['official-artwork'].front_default;
    } else {
        return pokemonData.sprites.other.home.front_default;
    }
}


function seeTheTransformation(pokemonName, imgUrl, nameUrl){
    return/*html*/`
    <div class="pokemonInfo" onclick="loadPokemon('${pokemonName}')">
        <img src="${imgUrl}" class="pokemonImage"/>
        <p class="pokemonName">${nameUrl}</p>
    </div>`;
}
