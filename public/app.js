const calendar = document.querySelector('.calendar');
const list = document.querySelector('.list');
const plans = document.querySelector('.plans');
const profile = document.querySelector('.profile');

const user = document.querySelector('.user');
const currentplan = document.querySelector('.currentplan');
const workouts = document.querySelector('.workouts');

const startUp = () => {
    buttonDev();
    getData();
}

const buttonDev = () => {
    calendar.addEventListener('click', (e) => {
        user.style.display = "none";
        currentplan.style.display = "none";
        workouts.style.display= "none";
        profile.style.display= "block";
        calendar.style.display= "none";
    })
}

const getData = () => {
    const url = '';
    let html = '';
    fetch(url)
    .then(response => {
        console.log(response)
        // `<div class="current">`
    })
    .catch(error => {
        console.error(error);
    })
}

startUp();