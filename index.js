let content = [];
let matchingContent = [];
const contentList = document.querySelector("#contentList")

const baseUrl = `http://localhost:9001/api`;

document.addEventListener('DOMContentLoaded', getContent)

async function getContent() {
  try {
    content.push (...(await fetchCharacters ()))
    content.push (...(await fetchFilms ()))
    content.push (...(await fetchStarships ()))
  }
  catch (ex) {
    console.error("Error reading content.", ex.message);
  }
  console.log("All the content is ", content)
  renderContent(content);
}

const filterContent = () => {
  const searchString = document.querySelector("#searchString").value;
  const re = new RegExp(searchString, "i");
  matchingContent = content.filter(item => re.test(item.name ?? "") || re.test(item.title ?? "") || re.test(item.starship_class ?? ""))
  renderContent(matchingContent);
}

const renderContent = content => {
  const divs = content.map(item => {
    const el = document.createElement('div');
    el.addEventListener('click', () => goToPage(item));
    el.textContent = item.name ?? item.title ?? `Ship ID: ${item.id} (${item.starship_class})` ?? "Error";
    return el;
  })
  contentList.replaceChildren(...divs)
}

async function fetchCharacters() {
  const url = `${baseUrl}/characters`;
  const characters = await fetch(url)
    .then(res => res.json())

  characters.forEach(element => {
    element.contentType = "character"
  })

  return characters;
}

async function fetchFilms() {
  const url = `${baseUrl}/films`;
  const films = await fetch(url)
    .then(res => res.json())

  films.forEach(element => {
    element.contentType = "film"
  })
  return films;
}

async function fetchStarships() {
  const url = `${baseUrl}/starships`;
  const starships = await fetch(url)
    .then(res => res.json())

  starships.forEach(element => {
    element.contentType = "starship"
  })
  return starships;
}

function goToPage (item) {
  window.location = `/${item.contentType}.html?id=${item.id}`
}

function randomContent () {
  let item = content[Math.floor(Math.random() * content.length)]
  goToPage (item)
}