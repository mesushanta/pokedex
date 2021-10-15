(function() {
  const API_BASE = "https://pokeapi.co/api/v2/";
  const SEARCH_BUTTON = document.getElementById('run_search');
  const SEARCH_INPUT = document.getElementById('search');
  const NAME_PLACEHOLDER = document.getElementById('name');
  const IMAGE_PLACEHOLDER = document.getElementById('image');
  const MOVES_PLACEHOLDER = document.getElementById('moves');
  const EVOLUTIONS_PLACEHOLDER = document.getElementById('evolutions');
  var evolutions = "";

  async function getApiData(url) {
    fetch(url)
    .then(function(response) {
      return response.json()
    })
    .then(function(data) {
    })
    .catch(error => console.warn(error));
  }


async function search(input) {
  var url = `${API_BASE}pokemon/${input}`;
  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json()
    } else {
      alert('Nothing found');
      return;
    }
  })
  .then(function(data) {
      var moves_html = "";
      var move_all = "";
      NAME_PLACEHOLDER.innerHTML = data.name;
      IMAGE_PLACEHOLDER.setAttribute('src',data.sprites.front_default);
      var moves = data.moves;
      moves.forEach((power,i) => {
        if(i < 4) {
          moves_html = `${moves_html}<li class="list-none capitalize px-4 py-2 bg-white text-gray-700 my-2">${power.move.name}</li>`;
        }
      });

      MOVES_PLACEHOLDER.innerHTML = moves_html;
      getSpecies(`${API_BASE}pokemon-species/${data.id}`);
  })
}

async function getSpecies(url) {
  fetch(url)
  .then(response => {
      return response.json()
  })
  .then(function(data) {
    evolutionChain(data.evolution_chain.url);
  })
}

async function evolutionChain(url) {
  fetch(url)
  .then(response => {
      return response.json()
  })

  .then(function(data) {
    all_evolution = '';
      all_evolution = `${all_evolution}<li>${data.chain.species.name}</li>`;
      data.chain.evolves_to.forEach((item, i) => {
        all_evolution = `${all_evolution}<li>${item.species.name}</li>`;

        item.evolves_to.forEach((item1, i) => {

          all_evolution = `${all_evolution}<li>${item1.species.name}</li>`;

        });

      });

      EVOLUTIONS_PLACEHOLDER.innerHTML = all_evolution;

  })


}


SEARCH_BUTTON.addEventListener('click', function() {
  search(SEARCH_INPUT.value);
})

})();
