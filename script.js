// https://superheroapi.com/api/access-token/character-id

const SUPERHERO_TOKEN = '3623329521272286';
const BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`;

const newHeroButton = document.getElementById('newHeroButton');
const heroImageDiv = document.getElementById('heroImage');
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const statsContainer = document.getElementById('heroStats'); // Moved this here

const getSuperHero = (id) => { // Removed 'name' parameter since it's not used
  fetch(`${BASE_URL}/${id}`)
    .then(response => response.json())
    .then(json => {
      console.log(json.powerstats);
      const superHero = json;
      showHeroInfo(superHero);
    });
}

const statToEmoji = {
  intelligence: '🧠',
  strength: '💪',
  speed: '⚡',
  durability: '🏋️‍♂️',
  power: '📊',
  combat: '⚔️',
}

// ... Previous code ...

const showHeroInfo = (character) => {
  const name = `<h2>${character.name}</h2>`;

  const img = `<div class="hero-image-container">
                  <img src="${character.image.url}" alt="">
                  <button id="showStatsButton">Show Stats</button>
               </div>`;

  heroImageDiv.innerHTML = `${name}${img}`;

  const showStatsButton = document.getElementById('showStatsButton');
  showStatsButton.addEventListener('click', () => {
    toggleStats();
    showStats(character);
  });
}

const showStats = (character) => {
  const stats = Object.keys(character.powerstats).map(stat => {
    return `<p>${statToEmoji[stat]} ${stat.toUpperCase()}: ${character.powerstats[stat]}</p>`;
  }).join('');

  statsContainer.innerHTML = stats; // Updated to use statsContainer
}

const toggleStats = () => {
  statsContainer.classList.toggle('show-stats');
}

// ... Rest of the code ...

const randomHero = () => {
  const numberOfHeroes = 731;
  return Math.floor(Math.random() * numberOfHeroes) + 1;
}

newHeroButton.onclick = () => getSuperHero(randomHero());

searchButton.onclick = () => getSearchSuperHero(searchInput.value);
