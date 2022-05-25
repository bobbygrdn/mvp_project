//Buttons
const calendar = document.querySelector('.calendar');
const list = document.querySelector('.list');
const profile = document.querySelector('.profile');
const addExercise = document.querySelector('#addExercise');
const dropExercise = document.querySelector('#dropExercise')

//Forms
const historyInput = document.querySelector('#history_input');
const exerciseInput = document.querySelector('#exercise_input');
const workoutInput = document.querySelector('#workout_input');
const dropInput = document.querySelector('#drop_input');

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
        addExercise.style.display = 'none'
        workoutInput.style.display = 'block';
    })

    dropExercise.addEventListener('click', () => {
        addExercise.style.display = 'none';
        dropInput.style.display = 'block';
    })
}

//Start Data Helper Functions
const plan = async () => {
    const data = await fetch('https://desolate-reef-75349.herokuapp.com/api/workout_plans')
    const result = await data.json()

    let html = `
    <h2>${result[0].plan_name}</h2>
    <h3>${result[0].type_of_plan}</h3>
    <h3>${result[0].length_of_plan}</h3>
    `
    currentplan.innerHTML += html;
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


//User Profile Create Exercise
const workoutForm = (form) => {
    workoutInput.style.display = 'none';
    let exerciseName = form.exercise_name.value; 
    let sets = form.sets.value;
    let reps = form.reps.value;
    let rest = form.rest.value;
    
    const workouturl = 'https://desolate-reef-75349.herokuapp.com/api/workout'

    let data = {
        exercise_name: `${exerciseName}`,
        sets: `${sets}`,
        reps_time: `${reps}`,
        rest_cycle: `${rest}`
    }

    let fetchData = {
        method: 'Post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }

    fetch(workouturl, fetchData)
        .then(() => {
            alert('Exercise Added!');
        })
        addExercise.style.display = 'block'
}

//User Profile Drop Exercise
const dropForm = (form) => {
    let workout_id = form.exercise_name.value;
    const dropurl = 'https://desolate-reef-75349.herokuapp.com/api/workout'

    let data = {
        workout_id: `${workout_id}`
    }

    let fetchData = {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }

    fetch(dropurl, fetchData)
    .then(() => {
        alert('Exercise Dropped!');
    })

    addExercise.style.display = 'block'
}

startUp();