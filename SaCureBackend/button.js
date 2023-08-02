//recording the button clicks

const button = document.getElementById('myButton');
button.addEventListener('click', function(e) {
  console.log('emergency button was clicked');

  fetch('/clicked', {method: 'POST'})//use clicked as the end point
    .then(function(response) {
      if(response.ok) {
        console.log('click was recorded');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
});
//RETRIEVES THE CLICKS DATA AND DISPLAYS ON THE UI
setInterval(function() {
  fetch('/clicks', {method: 'GET'})
    .then(function(response) {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(function(data) {
      document.getElementById('counter').innerHTML = `Emergency button clicked ${data.length} times`;
    })
    .catch(function(error) {
      console.log(error);
    });
}, 1000);