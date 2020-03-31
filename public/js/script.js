// console.log(`Hello to JS in front end`);


// fetch('http://puzzle.mead.io/puzzle')
// .then(response=>{
//     return response.json()
// })
// .then(data=>{
//     console.log(data)
// })





const weatherForm = document.querySelector('#weatherForm');
const search = document.querySelector('#location');
const msgOne = document.querySelector('#msg1');
const msgTwo = document.querySelector('#msg2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    msgOne.textContent = 'Loading ...';
    msgTwo.textContent = '';
    
    fetch('http://localhost:3000/weather?address='+location)
        .then(response => {
            console.log(response)
            return response.json()
        })
        .then(data => {
            console.log(data)
            if (data.error) {
                msgOne.textContent =data.error
            } else {
                console.log(data.location)
                console.log(data.forecast)
                msgOne.textContent = "Location : "+data.location
                msgTwo.textContent = "Forecast : "+data.forecast

            }
        })
        .catch(err => {
            console.log(err)
        });
})