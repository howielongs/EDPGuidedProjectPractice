let titleH1;
let releaseDateSpan;
let episodeSpan;
let directorSpan;
let producersDiv;
let charactersDiv;
let starshipsDiv;
let openingCrawlSpan;
const baseUrl = `http://localhost:9001/api`;

function convertToNameCase (text) {
  return text.split (" ").map ((word) => { 
      return word[0].toUpperCase() + word.substring(1); 
  }).join(" ")
}

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  titleH1 = document.querySelector('h1#title');
  releaseDateSpan = document.querySelector('span#release_date');
  episodeSpan = document.querySelector('span#episode');
  directorSpan = document.querySelector('span#director');
  producersDiv = document.querySelector('#producers>ul');
  charactersDiv = document.querySelector('#characters>ul');
  starshipsDiv = document.querySelector('#starships>ul');
  openingCrawlSpan = document.querySelector('span#opening_crawl');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getFilm(id)
});

async function getFilm(id) {
  let film;
  try {
    film = await fetchFilm(id)
    film.characters = await fetchCharacters(film)
    film.starships = await fetchStarships(film)
  }
  catch (ex) {
    console.error(`Error reading character ${id} data.`, ex.message);
  }
  renderFilm(film);
}
async function fetchFilm(id) {
  let filmUrl = `${baseUrl}/films/${id}`;
  return await fetch(filmUrl)
    .then(res => res.json())
}

async function fetchCharacters(film) {
  const url = `${baseUrl}/films/${film?.id}/characters`;
  const characters = await fetch(url)
    .then(res => res.json())
  return characters;
}

async function fetchStarships(film) {
  const url = `${baseUrl}/films/${film?.id}/starships`;
  const starships = await fetch(url)
    .then(res => res.json())
  return starships;
}

const renderFilm = film => {
  document.title = `SWAPI - ${film?.title}`;  // Just to make the browser tab say their name
  titleH1.textContent = film?.title;

  releaseDateSpan.textContent = `${new Date(film?.release_date).toDateString()}`;

  episodeSpan.textContent = `#${film?.episode_id}`;

  directorSpan.textContent = film?.director;

  const producersList = film?.producer?.split(",")?.map(item => item.trim ())?.map(producer => `<li><p">${producer}</li>`)
  producersDiv.innerHTML = producersList.join("");

  const charactersList = film?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
  charactersDiv.innerHTML = charactersList.join("");

  const starshipsList = film?.starships?.map(starship => `<li><a href="/starship.html?id=${starship.id}">${convertToNameCase (starship.name)}</li>`)
  starshipsDiv.innerHTML = starshipsList.join("");

  openingCrawlSpan.textContent = film?.opening_crawl;
}
