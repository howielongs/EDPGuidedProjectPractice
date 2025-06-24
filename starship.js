let mglt;
let starshipClass;
let hyperdriveRating;
let pilotsList;

const baseUrl = `http://localhost:9001/api`;

addEventListener('DOMContentLoaded', () => {

    mglt = document.querySelector('span#mglt');
    starshipClass = document.querySelector('span#starship-class');
    hyperdriveRating = document.querySelector('span#hyperdrive-rating');
    pilotsList = document.querySelector('ul#pilotsList');

    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getStarship(id)
});

async function getStarship(id) {
    let starship;
    let pilots;

    try {
        starship = await fetchStarshipId(id)

        pilots = await fetchShipPilots(id

        )
    }
    catch (ex) {
        console.error(`Error reading starship
         ${id} data.`, ex.message);
    }
    renderStarship(starship, pilots);

}
async function fetchStarshipId(id) {
    let starshipUrl = `${baseUrl}/starships/${id}`;
    return await fetch(starshipUrl)
        .then(res => res.json())
}

async function fetchShipPilots(id) {
    let pilotsUrl = `${baseUrl}/starships/${id}/characters`;
    return await fetch(pilotsUrl)
        .then(res => res.json())


}

const renderStarship
    = (starship, pilots) => {
        document.title = `SWAPI - ${starship
            ?.starship_class}`;
        mglt.textContent = starship
            ?.MGLT;
        starshipClass.textContent = starship
            ?.starship_class;
        hyperdriveRating.textContent = starship
            ?.hyperdrive_rating;

        //Display list of associated pilots if any else show a placeholder

        if (pilots.length === 0) {

            const noPilotsMessage = document.createElement("h3")
            noPilotsMessage.textContent = "Information relating to this ship's pilots is missing"

            const obiWanImpossibleImg = document.createElement("img")
            obiWanImpossibleImg.src = "images/obiwanimpossible.jpg"

            pilotsList.appendChild(noPilotsMessage);
            pilotsList.appendChild(obiWanImpossibleImg);

        } else {

            for (let i = 0; i < pilots.length; i++) {
                const li = document.createElement("li");
                const link = document.createElement("a");

                link.textContent = pilots[i].name;
                link.href = `/character.html?id=${pilots[i].id}`;

                li.appendChild(link);
                pilotsList.appendChild(li);
            }
        }

    }
