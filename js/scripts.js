//Start of IIFE
var pokemonRepository = (function () {

    var repository = [];
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
    var $container = $('#modal-container');

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
        var $Ul = $('<ul class= "ul-container"></ul>');
        var $Li = $('<li type="button"></li>');
        var $button = $('<button type="button">' + pokemon.name + '</button>');

        $Li.append($button);
        $Ul.append($Li);

        $button.on('click', function (e) {
            console.log('showDetails', e)
            showDetails(pokemon);
           
          
        });
       
     }

     function showDetails(item) {
         console.log('shw', item)
         pokemonRepository.loadDetails(item).then(function () {
            showModal(item);
         });
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

     //creating modal content
     function showModal(item) {
         console.log('shwModal',item)
      
         var $container = $('#modal-container');

         $container.empty();

         var $modal = $('<div class="modal"></div>');
         

         var $closeButton = ('<button class="modal-close">Close</div>');

         $('button').on('click', hideModal);

         var $name = $('<h1>' + item.name + '</h1>');

         var $img = $('<img class="modal-img" src=' + item.imageUrl +  '</img>');

         var $height = $('<p> height: ' + item.height + '</p>');

         var $weight = ('<p> weight: ' + item.weight + '</p>');

         $modal.append($closeButton);
         $modal.append($name);
         $modal.append($img);
         $modal.append($height);
         $modal.append($weight);
         $container.append($modal);

         $container.addClass('is-visible');
        
         
     }

    function hideModal(bye) {
    
        
        $container.removeClass('is-visible');
    }

        window.addEventListener('keydown', (e) => { 
        

        if (
            e.key === 'Escape' && $container.hasClass('is-visible')) {
                hideModal();
            }
        
    });

    
        $container.on('click', e => {
            var target = e.target;
            if (target === $container) {
            hideModal();
        }
    });

   
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal
    
};

     
      
})(); //End of IIFE


pokemonRepository.loadList().then(function() {
    // Get all pokemon and loop through each one
      pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });




