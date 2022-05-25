//Buttons
const calendar = document.querySelector('.calendar');
const list = document.querySelector('.list');
const profile = document.querySelector('.profile');

//Forms
const historyInput = document.querySelector('#history_input');
const exerciseInput = document.querySelector('#exercise_input');
const workoutInput = document.querySelector('#workout_input');

//Containers
const history = document.querySelector('.history');
const exercises = document.querySelector('.exercises');
const currentplan = document.querySelector('.currentplan');
const workouts = document.querySelector('.workouts');

const startUp = () => {
    startData();
    buttonDev();
}

const startData = () => {

}

//Form Helper Functions
const historyForm = () => {
    historyInput.style.display = 'none'
}

const exerciseForm = () => {
    exerciseInput.style.display = 'none'
}

const workoutForm = () => [
    workoutInput.style.display = 'none'
]

startUp();