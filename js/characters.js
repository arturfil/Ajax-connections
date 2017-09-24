$(document).ready(() => {
  $('.post-wall-e').click(() => {
    const wallEInfo = {
      name: 'WALL-E',
      occupation: 'Waste Allocation Robot',
      weapon: 'Head Laser'
    };
    postCharacter( wallEInfo);
  });
  $('.new-char-form').submit((myEvent) => {
    myEvent.preventDefault();
    const newCharacterInfo = {
      name: $('#char-name-input').val(),
      occupation: $('#char-occupation-input').val(),
      weapon: $('#char-weapon-input').val()
    }
    postCharacter(newCharacterInfo);
  });

  $('.update-char-form').submit((myEvent) => {
    myEvent.preventDefault();
    const updateInfo = {
      name: $('#update-name-input').val(),
      occupation: $('#update-occupation-input').val(),
      weapon: $('#update-weapon-input').val()
    };
    const characterId = $('#update-char-id').val();

    $.ajax({
      url: 'https://ih-api.herokuapp.com/characters/' + characterId,
      method: 'PATCH',
      data: updateInfo,
      success: (updateFromApi) => {
        console.log('update succesful');
        console.log(updateFromApi);
      },
      error: (errorInfo) => {
        console.log('Update ERROR');
        console.log(errorInfo);
      }
    });
  });
});

function postCharacter (characterSubmission) {

  $.ajax({
    url: 'https://ih-api.herokuapp.com/characters',
    method: 'POST',
    data: characterSubmission,

    success: (postResult) => {
      console.log('POST WALL-E success');
      console.log(postResult);

      $('.character-list').append(
        `<li>
          <h3> ${postResult.name} </h3>
          <p> ID: ${postResult.id} </p>
          <p> Occupation: ${postResult.occupation} </p>
          <p> Weapon: ${postResult.weapon} </p>
          <p> Debt: ${postResult.debt} </p>
      `
      )
    },

    error: (errorInfo) => {
      console.log('POST WALL-E failure');
      console.log(errorInfo);
    }
  });

}
