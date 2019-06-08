//Start of IIFE
var pokemonRepository = (function () {

    var repository = [];
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
    var $Li = $('.btn-group-vertical');
   
    function add(item) {
        repository.push(item)
    }
    
    function getAll() {
        return repository;
    }
    

    // Loading Data from an external api
    function loadList() {
        return $.ajax(apiUrl)
        .then(function(response) {
            console.log('apiGet', response);
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
            $.ajax(url).then(function(response) {
                pokemon.imageUrl = response.sprites.front_default;
                pokemon.height = response.height;
                pokemon.weight = response.weight;
                add(pokemon);
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

    function createModal() {
        var $modal = $(`<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
		  <div class="modal-content">
			<div class="modal-header">
			  <h5 class="modal-title" id="exampleModalLabel"></h5>
			  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			  </button>
			</div>
			<div class="modal-body">
			</div>
			<div class="modal-footer">
			  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
			  <button type="button" class="btn btn-primary">Save changes</button>
			</div>
		  </div>
		</div>
		</div>`);

    $Li.append($modal);
    }

    function updateModal(pokemon) {
        console.log('TCL: updateModal -> pokemon', pokemon);

        $Li.find('.modal-title').text(pokemon.name);
        $Li.find('.modal-body').html(`<div>
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
        createModal: createModal,
        updateModal: updateModal,
        
    };
  

     
      
})(); //End of IIFE

pokemonRepository.loadList().then(function(pokeArray) {
    //Create modal ONCE
    pokemonRepository.createModal();
    pokemonRepository.loadListDetails(pokeArray);

    $('html').click(function(event) {
        console.log('TCL: addListItem -> event', event.target.innerText);
        var findPokemon = pokeArray.find(function(p) {
            return p.name === event.target.innerText;
        });
        console.log('TCL: findPokemon', findPokemon);
        if (findPokemon) {
            console.log('clicked');
            pokemonRepository.updateModal(findPokemon);
        }
    });
});



   




