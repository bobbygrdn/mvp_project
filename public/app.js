//Buttons
const calendar = document.querySelector('.calendar');
const list = document.querySelector('.list');
const profile = document.querySelector('.profile');
const addExercise = document.querySelector('#addExercise');

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
    addExercise.addEventListener('click', () => {
        console.log('Working!')
        workoutInput.style.diplay = '';
    })
}

//Start Data Helper Functions
const plan = async () => {
    const data = await fetch('https://desolate-reef-75349.herokuapp.com/api/workout_plans')
    const result = await data.json()
    
}

const workout = async () => {
    const data = await fetch('https://desolate-reef-75349.herokuapp.com/api/workout')
    const result = await data.json()
    createList(result);
}

const createList = (arr) => {
    arr.forEach((elem) => [
        createListItem(elem)
    ]);
};

const createListItem = (elem) => {
    const div = document.createElement('div');
    div.id = elem.workout_id;
    div.className = 'exercises'
    div.innerHTML = `
    <h2>${elem.workout_id}</h2>
    <h3>Name: ${elem.exercise_name} Sets: ${elem.sets} X Reps: ${elem.reps_time} Rest Cycle: ${elem.rest_cycle}.</h3>
    `; 
    workouts.appendChild(div)
};

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