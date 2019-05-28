const weatherForm = document.querySelector('form');
const searchText = document.querySelector('input');
const messageOne = document.querySelector('#message1');
const messageTwo = document.querySelector('#message2');
const messageThree = document.querySelector('#message3');

weatherForm.addEventListener('submit', event => {
  event.preventDefault();
  const location = searchText.value;
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  fetch(`/weather?address=${location}`)
  .then(res => res.json())
  .then(data => {
    if(data.error) {
      return messageOne.textContent = data.error;
    }
    messageOne.textContent = data.location;
    messageTwo.textContent = data.forecast;
    messageThree.textContent = data.address;
  })
})