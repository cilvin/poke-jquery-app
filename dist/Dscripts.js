var pokemonRepository=function(){var t=[],n="https://pokeapi.co/api/v2/pokemon/",o=$(".btn-group-vertical");function e(n){t.push(n)}function a(){return t}function i(t){var n=$(`<button\n        id="boom"\n        type="button"\n        data-toggle="modal"\n        data-target="#exampleModal"\n        class="btn btn-primary"\n        >${t.name}</button>`);o.append(n)}return{getAll:a,add:e,addListItem:i,loadList:function(){return $.ajax(n).then(function(t){return console.log("apiGet",t),t.results.forEach(function(t){e({name:t.name,detailsUrl:t.url})}),a()}).catch(function(t){console.error(t)})},loadListDetails:function(t){return t.forEach(function(t){var n=t.detailsUrl;$.ajax(n).then(function(n){t.imageUrl=n.sprites.front_default,t.height=n.height,t.weight=n.weight,e(t),i(t)}).catch(function(t){console.error(t)})}),a()},createModal:function(){var t=$('<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\n\t\t<div class="modal-dialog" role="document">\n\t\t  <div class="modal-content">\n\t\t\t<div class="modal-header">\n\t\t\t  <h5 class="modal-title" id="exampleModalLabel"></h5>\n\t\t\t  <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n\t\t\t\t<span aria-hidden="true">&times;</span>\n\t\t\t  </button>\n\t\t\t</div>\n\t\t\t<div class="modal-body">\n\t\t\t</div>\n\t\t\t<div class="modal-footer">\n\t\t\t  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\n\t\t\t  <button type="button" class="btn btn-primary">Save changes</button>\n\t\t\t</div>\n\t\t  </div>\n\t\t</div>\n\t\t</div>');o.append(t)},updateModal:function(t){console.log("TCL: updateModal -> pokemon",t),o.find(".modal-title").text(t.name),o.find(".modal-body").html(`<div>\n                                        <img src =${t.imageUrl} />\n                                        <br>\n                                        height: ${t.height}\n                                        <br>\n                                        weight: ${t.weight}\n                                    <div>`)}}}();pokemonRepository.loadList().then(function(t){pokemonRepository.createModal(),pokemonRepository.loadListDetails(t),$("html").click(function(n){console.log("TCL: addListItem -> event",n.target.innerText);var o=t.find(function(t){return t.name===n.target.innerText});console.log("TCL: findPokemon",o),o&&(console.log("clicked"),pokemonRepository.updateModal(o))})});