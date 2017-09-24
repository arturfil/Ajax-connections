$(document).ready(() => {
  $('.fetch-mewtwo').click(() => {
    getPokemonInfo(380);
  });
  $('.pokemon-search').submit((myEvent) => {
    myEvent.preventDefault();

    const idFromInput = $('#poke-id').val();
    getPokemonInfo(idFromInput);
  });
});

function getPokemonInfo (pokemonId) {
  $('.pokemon-details').html('<p> Loading... </p>');

  //$.ajax() is a jQuery function
  $.ajax(
    // 1 argument -> settings object
    {
      url: 'http://pokeapi.co/api/v2/pokemon/' + pokemonId + '/',
      method: 'GET',

      // what to do when everything works (we get the data)
      success: (infoFromApi) => {
        // start by displaying the variable you got from the API
        console.log("Pokemon fetch Succes!");
        console.log(infoFromApi);

        var secondTypeOrNot ="";

        if(infoFromApi.types.length === 2);
          secondTypeOrNot =
            `<p> Type #2: $(infoFromApi.types[1].type.name) </p>`

        $('.pokemon-details').html(`
            <h2> ${infoFromApi.name} </h2>
            <img src='${infoFromApi.sprites.front_default}'>
            <p> Type #1: ${infoFromApi.types[0].type.name} </p>
            ${secondTypeOrNot}
        `)
      },
      error: (errorInfo) => {
        console.log("Pokemon Fetch Error");
        console.log(errorInfo);
      }
    }
  );
}
