let nameH1;
let climateSpan;
let terrainSpan;
let populationSpan;
let charactersUl;
let filmsUl;
const baseUrl = 'http://localhost:9001/api';

addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('#planet-name');
    climateSpan = document.querySelector('#climate');
    terrainSpan = document.querySelector('#terrain');
    populationSpan = document.querySelector('#population');
    charactersUl = document.querySelector('#planet-characters ul');
    filmsUl = document.querySelector('#planet-films ul');

    const sp = new URLSearchParams(window.location.search);
    const id = sp.get('id');

    getPlanet(id);
});

async function getPlanet(id) {
    try {
        const planet = await fetchPlanet(id);
        const characters = await fetchCharacters(id);
        const films = await fetchFilms(id);
        renderPlanet(planet, characters, films);
    } catch(ex) {
        console.error(`Error reading planet ${id} data.`, ex.message);
    }
}

async function fetchPlanet(id) {
    const res = await fetch(`${baseUrl}/planets/${id}`);
    return await res.json();
}
async function fetchCharacters(id) {
    const res = await fetch(`${baseUrl}/planets/${id}/characters`);
    return await res.json();
}
async function fetchFilms(id) {
    const res = await fetch(`${baseUrl}/planets/${id}/films`);
    return await res.json();
}

function renderPlanet(planet, characters, films) {
    document.title = `SWAPI - ${planet.name}`;
    nameH1.textContent = planet.name;
    climateSpan.textContent = planet.climate;
    terrainSpan.textContent = planet.terrain;
    populationSpan.textContent = planet.population;

    charactersUl.innerHTML = characters.map(c => 
        `<li><a href="/character.html?id=${c.id}">${c.name}</a></li>`
    ).join("");
    console.log("Fetched films:", films);
    filmsUl.innerHTML = "<li>TEST FILM</li>";  // just to test DOM
    filmsUl.innerHTML = films.map(f =>
        `<li><a href="/film.html?id=${f.id}">${f.title}</a></li>`
    ).join("");
}

