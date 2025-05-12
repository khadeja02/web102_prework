/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
    gamesContainer.innerHTML = ""; // clear container
    games.forEach(game => {
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");
        gameCard.innerHTML = `
          <img src="${game.img}" alt="${game.name}" class="game-img" />
          <h3>${game.name}</h3>
          <p>${game.description}</p>
          <p>Pledged: $${game.pledged.toLocaleString()} / $${game.goal.toLocaleString()}</p>
        `;
        gamesContainer.appendChild(gameCard);
    });
}

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// Calculate and display stats
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);
const totalPledged = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);
const totalGames = GAMES_JSON.length;

document.getElementById("num-contributions").textContent = totalContributions.toLocaleString();
document.getElementById("total-raised").textContent = `$${totalPledged.toLocaleString()}`;
document.getElementById("num-games").textContent = totalGames.toLocaleString();

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

function filterUnfundedOnly() {
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    addGamesToPage(unfundedGames);
}

function filterFundedOnly() {
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    addGamesToPage(fundedGames);
}

function showAllGames() {
    addGamesToPage(GAMES_JSON);
}

// Add event listeners to buttons
document.getElementById("unfunded-btn").addEventListener("click", filterUnfundedOnly);
document.getElementById("funded-btn").addEventListener("click", filterFundedOnly);
document.getElementById("all-btn").addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

const descriptionContainer = document.getElementById("description-container");
const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
const numUnfunded = unfundedGames.length;

const descriptionText = document.createElement("p");
descriptionText.innerHTML = `
  Welcome to Sea Monster Crowdfunding! We help bring creative tabletop games to life.
  We've been in operation for 12 years. Currently, we have ${numUnfunded} 
  ${numUnfunded === 1 ? 'game' : 'games'} that still need funding. 
  Explore and help make them a reality!
`;

// Clear existing description and add new one
descriptionContainer.innerHTML = '';
descriptionContainer.appendChild(descriptionText);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = [...GAMES_JSON].sort((a, b) => b.pledged - a.pledged);
const [firstGame, secondGame] = sortedGames;

const firstGameElement = document.createElement("p");
firstGameElement.textContent = firstGame.name;
firstGameContainer.appendChild(firstGameElement);

const secondGameElement = document.createElement("p");
secondGameElement.textContent = secondGame.name;
secondGameContainer.appendChild(secondGameElement);

// Initial display of all games
addGamesToPage(GAMES_JSON);

const searchInput = document.createElement("input");
searchInput.setAttribute("type", "text");
searchInput.setAttribute("placeholder", "Search games...");
searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredGames = GAMES_JSON.filter(game => 
        game.name.toLowerCase().includes(searchTerm) || 
        game.description.toLowerCase().includes(searchTerm)
    );
    addGamesToPage(filteredGames);
});
document.getElementById("button-container").prepend(searchInput);