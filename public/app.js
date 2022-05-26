//Buttons
const calendar = document.querySelector('.calendar');
const list = document.querySelector('.list');
const profile = document.querySelector('.profile');
const addExercise = document.querySelector('#addExercise');
const dropExercise = document.querySelector('#dropExercise')
const addDate = document.querySelector('#addDate');
const dropDate = document.querySelector('#dropDate');

//Forms
const historyInput = document.querySelector('#history_input');
const exerciseInput = document.querySelector('#exercise_input');
const workoutInput = document.querySelector('#workout_input');
const deleteWorkout = document.querySelector('#drop_input');
const dropHistory = document.querySelector('#drop_history');

//Containers
const history = document.querySelector('.history');
const exercises = document.querySelector('.exercises');
const currentplan = document.querySelector('.currentplan');
const workouts = document.querySelector('.workouts');
const user = document.querySelector('.user');

const startUp = () => {
    startData();
    log();
    buttonDev();
}

const startData = () => {
    plan();
    workout();
}

const buttonDev = () => {

    calendar.addEventListener('click', () => {
        currentplan.style.display = 'none';
        workouts.style.display = 'none';
        user.style.display = 'none';
        exercises.style.display = 'none';
        history.style.display = 'block';
    })

    list.addEventListener('click', () => {
        currentplan.style.display = 'none';
        workouts.style.display = 'none';
        user.style.display = 'none';
        history.style.display = 'none';
        exercises.style.display = 'block';
    })

    profile.addEventListener('click', () => {
        currentplan.style.display = 'block';
        workouts.style.display = 'block';
        user.style.display = 'block';
        history.style.display = 'none';
        exercises.style.display = 'none';
    })

    addExercise.addEventListener('click', () => {
        addExercise.style.display = 'none';
        dropExercise.style.display = 'none';
        workoutInput.style.display = 'block';
    })

    dropExercise.addEventListener('click', () => {
        addExercise.style.display = 'none';
        deleteWorkout.style.display = 'block';
    })

    addDate.addEventListener('click', () => {
        addDate.style.display = 'none';
        dropDate.style.display = 'none';
        historyInput.style.display = 'block';
    })

    dropDate.addEventListener('click', () => {
        addDate.style.display = 'none';
        dropDate.style.display = 'none';

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
const deleteW = (form) => {
    let workout_id = form.exercise_name.value;
    const dropurl = `https://desolate-reef-75349.herokuapp.com/api/workout/${workout_id}`

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

//Calendar Creation
const log = async () => {
    const data = await fetch('https://desolate-reef-75349.herokuapp.com/api/calendar')
    const result = await data.json()
    createLog(result);
}

const createLog = (arr) => {
    arr.forEach((elem) => [
        createLogItem(elem)
    ]);
};

const createLogItem = (elem) => {
    const div = document.createElement('div');
    div.id = elem.calendar_id;
    div.className = 'dates'
    div.innerHTML = `
    <h2>${elem.calendar_id}</h2>
    <h3>${elem.month} ${elem.month} ${elem.year}
    `; 
    history.appendChild(div)
};
  
startUp();