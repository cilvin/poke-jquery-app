//Start of IIFE
var pokemonRepository = (function () {

    var repository = [];
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
   
    

    // Loading Data from an external api
    function loadList() {
        return $.ajax(apiUrl).then(function (response) {
             console.log('apiGet', response)                        
            response.results.forEach(function (item) {
                var pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                }
                add(pokemon)
                console.log('add', pokemon)
            })
        }).catch(function (e) {
            console.error(e)
        })        
     }
     

     function addListItem(pokemon) {
         console.log('addListItem', pokemon)
        
        
        var $Li = $('.btn-group-vertical');
        

        var $button = $(`<button
                         type="button"
                         data-toggle="modal"
                         data-target="#exampleModal"
                         class="btn btn-primary"
                         >${pokemon.name}</button>`);

                                

        var $modal = $(`<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">${pokemon.name}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                ${pokemon.height}
                ${pokemon.weight}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>`);
       
        
        $Li.append($button);

        $Li.append($modal);

          $('#exampleModal').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget) // Button that triggered the modal
            var recipient = button.data('whatever') // Extract info from data-* attributes
            // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
            // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
            var modal = $(this)
            modal.find('.modal-title').text('New message to ' + recipient)
            modal.find('.modal-body input').val(recipient)
                          })    
        
       
       
     }

     function showDetails(item) {
         console.log('shw', item)
         pokemonRepository.loadDetails(item);
         
     }

     function add(item) {
        repository.push(item)
    }
    
    function getAll() {
        return repository;
    }
    
     function loadDetails(item) {
         var url = item.detailsUrl;
         return $.ajax(url).then(function (response) {
             console.log('loadD', response)
             item.imageUrl = response.sprites.front_default;
             item.height = response.height;
             item.weight = response.weight;
             
         }).catch(function (e) {
             console.error(e);
         });
     }

     
   
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    
    
    
};

     
      
})(); //End of IIFE


pokemonRepository.loadList().then(function() {
    // Get all pokemon and loop through each one
      pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });




