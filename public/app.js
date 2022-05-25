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
    plan();
    workout();

}

const buttonDev = () => {
    calendar.addEventListener('click', () => {
        console.log('Calendar!')
    })
    list.addEventListener('click', () => [
        console.log('List!')
    ])
    profile.addEventListener('click', () => {
        console.log('Profile!')
    })
}

//Start Data Helper Functions
const plan = async () => {
    const data = await fetch('https://desolate-reef-75349.herokuapp.com/api/workout')
    const result = await data.json()
    console.log(result)
}

const workout = async () => {
    const data = await fetch('https://desolate-reef-75349.herokuapp.com/api/workout_plans')
    const result = await data.json()
    createList(result);
}

const createList = (result) => {
    result.forEach((elem) => {
        createExercise(elem);
    })
}

const createExercise = (elem) => {
    const div = document.createElement('div');
    div.id = elem.id;
    div.className = 'exercises'
    div.textContent = elem.exercise_name; 
    workouts.appendChild(div)
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