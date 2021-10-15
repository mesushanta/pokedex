(function() {
  const API_BASE = "https://pokeapi.co/api/v2/";
  const SEARCH_BUTTON = document.getElementById('run_search');
  const SEARCH_INPUT = document.getElementById('search');
  const NAME_PLACEHOLDER = document.getElementById('name');
  const IMAGE_PLACEHOLDER = document.getElementById('image')

  // const make_url = (route) => {
  //   return API_BASE + route;
  // }
  //
  // var new_id = 2;
  // var new_url = make_url(`pokemon/${new_id}`);


  async function getApiData(url) {
    fetch(url)
    .then(function(response) {
      return response.json()
    })
    .then(function(data) {
      console.log(data)
      // return data;
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
      console.log(data.id)
      NAME_PLACEHOLDER.innerHTML = data.name;
      IMAGE_PLACEHOLDER.setAttribute('src',data.sprites.front_default);
      var moves = data.moves;
      getSpecies(`${API_BASE}pokemon-species/${data.id}`);
  })
}

function getSpecies(url) {
  fetch(url)
  .then(response => {
      return response.json()
  })
  .then(function(data) {
    evolutionChain(data.evolution_chain.url);
  })
}

function evolutionChain(url) {
  fetch(url)
  .then(response => {
      return response.json()
  })
  .then(function(data) {
      console.log(data.chain.species.name);
  })
}

function load_Moves(moves) {
  console.log('moves');
}

function load_evolutions(evolutions) {
  console.log('evolutions');
}

SEARCH_BUTTON.addEventListener('click', function() {
  search(SEARCH_INPUT.value);
})
})();
