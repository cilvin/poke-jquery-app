//Start of IIFE
/* global $ */
/*eslint no-console: ["error", { allow: ["error"] }] */
var pokemonRepository = (function() {
  var repository = [];
  var apiUrl = "https://pokeapi.co/api/v2/pokemon/";
  var $Li = $(".btn-group-vertical");

  function add(item) {
    repository.push(item);
  }

  function getAll() {
    return repository;
  }

  // Loading Data from an external api
  function loadList() {
    return $.ajax(apiUrl)
      .then(function(response) {
        response.results.forEach(function(item) {
          var pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });

        return getAll();
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  function loadListDetails(pokeArray) {
    pokeArray.forEach(function(pokemon) {
      var url = pokemon.detailsUrl;
      $.ajax(url)
        .then(function(response) {
          pokemon.imageUrl = response.sprites.front_default;
          pokemon.height = response.height;
          pokemon.weight = response.weight;
          addListItem(pokemon);
        })
        .catch(function(e) {
          console.error(e);
        });
    });

    return getAll();
  }

  function addListItem(pokemon) {
    var $button = $(`<button
        id="boom"
        type="button"
        data-toggle="modal"
        data-target="#exampleModal"
        class="btn btn-primary"
        >${pokemon.name}</button>`);

    $Li.append($button);
  }

  function updateModal(pokemon) {
    $Li.find(".modal-title").text(pokemon.name);
    $Li.find(".modal-body").html(`<div>
                                        <img src =${pokemon.imageUrl} />
                                        <br>
                                        height: ${pokemon.height}
                                        <br>
                                        weight: ${pokemon.weight}
                                    <div>`);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadListDetails: loadListDetails,
    updateModal: updateModal
  };
})(); //End of IIFE

pokemonRepository.loadList().then(function(pokeArray) {
  //Create modal ONCE
  pokemonRepository.loadListDetails(pokeArray);

  $("#boom").click(function(event) {
    pokemonRepository.updateModal(event);
  });
});
