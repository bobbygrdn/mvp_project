//Buttons
const calendar = document.querySelector('.calendar');
const list = document.querySelector('.list');
const profile = document.querySelector('.profile');
const addExercise = document.querySelector('#addExercise');
const dropExercise = document.querySelector('#dropExercise')
const addDate = document.querySelector('#addDate');
const dropDate = document.querySelector('#dropDate');
const createExercise = document.querySelector('#createExercise');
const deleteExercise = document.querySelector('#deleteExercise');

//Forms
const historyInput = document.querySelector('#history_input');
const exerciseInput = document.querySelector('#exercise_input');
const workoutInput = document.querySelector('#workout_input');
const deleteWorkout = document.querySelector('#drop_input');
const dropHistory = document.querySelector('#drop_history');
const deleteE = document.querySelector('#drop_exercise');

//Containers
const history = document.querySelector('.history');
const exerciseItems = document.querySelector('.exerciseItems');
const currentplan = document.querySelector('.currentplan');
const workouts = document.querySelector('.workouts');
const user = document.querySelector('.user');

const startUp = () => {
    startData();
    log();
    exerciseList();
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
        exerciseItems.style.display = 'none';
        history.style.display = 'block';
    })

    list.addEventListener('click', () => {
        currentplan.style.display = 'none';
        workouts.style.display = 'none';
        user.style.display = 'none';
        history.style.display = 'none';
        createExercise.style.display = 'block';
        deleteExercise.style.display = 'block';
        exerciseItems.style.display = 'block';
    })

    profile.addEventListener('click', () => {
        currentplan.style.display = 'block';
        workouts.style.display = 'block';
        user.style.display = 'block';
        history.style.display = 'none';
        exerciseItems.style.display = 'none';
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
        dropHistory.style.display = 'block';
    })

    createExercise.addEventListener('click', () => {
        createExercise.style.display = 'none';
        deleteExercise.style.display = 'none';
        exerciseInput.style.display = 'block';
    })

    deleteExercise.addEventListener('click', () => {
        createExercise.style.display = 'none';
        deleteExercise.style.display = 'none';
        deleteE.style.display = 'block';
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
    div.innerHTML = `
    <h2>${elem.workout_id}</h2>
    <h3>Name: ${elem.exercise_name} Sets: ${elem.sets} X Reps: ${elem.reps_time} Rest Cycle: ${elem.rest_cycle}.</h3>
    `; 
    workouts.appendChild(div)
};

//Form Helper Functions

//Calendar Create Date Form
const historyForm = (form) => {
    historyInput.style.display = 'none'
    let month = form.month.value;
    let day = form.day.value;
    let year = form.year.value;

    const calendarurl = 'https://desolate-reef-75349.herokuapp.com/api/calendar'

    let data = {
        month: `${month}`,
        day: `${day}`,
        year: `${year}`
    }

    let fetchData = {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }

    fetch(calendarurl, fetchData)
    .then(() => {
        alert('Date Added!');
    })
    addDate.style.display = 'block';

    //Calendar Delete Day Form
    const deleteDay = (form) => {
        let calendar_id = form.calendar_id.value;
        const dropurl = `https://desolate-reef-75349.herokuapp.com/api/calendar/${calendar_id}`
    
        let data = {
            calendar_id: `${calendar_id}`
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
            alert('Date Dropped!');
        })
    
        addDate.style.display = 'block';
        dropDate.style.display = 'block';
    }
}

const exerciseForm = (form) => {
    exerciseInput.style.display = 'none'
    let exercise_name = form.exercise_name.value;
    let type_of = form.type_of.value;
    let muscle_group = form.muscle_group.value;
    let reps_time_interval = form.reps_time_interval.value;
    let equipment_needed = form.equipment_needed.value;

    const exerciseurl = 'https://desolate-reef-75349.herokuapp.com/api/exercise'

    let data = {
        exercise_name: `${exercise_name}`,
        type_of: `${type_of}`,
        muscle_group: `${muscle_group}`,
        reps_time_interval: `${reps_time_interval}`,
        equipment_needed: `${equipment_needed}`,
    }

    let fetchData = {
        method: 'Post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }

    fetch(exerciseurl, fetchData)
    .then(() => {
        alert('Exercise Added!');
    })
    createExercise.style.display = 'block'
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
    let workout_id = form.workout_id.value;
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
    div.innerHTML = `
    <h2>${elem.calendar_id}</h2>
    <h3>${elem.month} ${elem.day} ${elem.year}
    `; 
    history.appendChild(div)
};

//Exercise List Creation
const exerciseList = async () => {
    const data = await fetch('https://desolate-reef-75349.herokuapp.com/api/exercise')
    const result = await data.json()
    createExerciseList(result);
}

const createExerciseList = (arr) => {
    arr.forEach((elem) => {
        createExerciseListItem(elem)
    })
}

const createExerciseListItem = (elem) => {
    const div = document.createElement('div');
    div.id = elem.exercise_id;
    div.innerHTML = `
    <h2>${elem.exercise_id}</h2>
    <h3>Exercise Name: ${elem.exercise_name}</h3>
    <h3>Exercise Type: ${elem.type_of}</h3>
    <h3>Muscle Group(s): ${elem.muscle_group}</h3>
    <h3>Reps/Time/interval: ${elem.reps_time_interval}</h3>
    <h3>Equipment Needed: ${elem.equipment_needed}</h3>
     `; 
    exerciseItems.appendChild(div)
}
  
startUp();