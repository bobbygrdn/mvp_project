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
const changeWorkout = document.querySelector('#change_workout_input');
const changeExercise = document.querySelector('#change_exercise');

//Containers
const history = document.querySelector('.history');
const exerciseItems = document.querySelector('.exerciseItems');
const currentplan = document.querySelector('.currentplan');
const workouts = document.querySelector('.workouts');
const user = document.querySelector('.user');
const exercise = document.querySelector('.exercise');

//Helper variables
let currentId = 0;

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
        createExercise.style.display = 'inline-block';
        deleteExercise.style.display = 'inline-block';
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
        workoutInput.style.display = 'block';
    })

    dropExercise.addEventListener('click', () => {
        deleteWorkout.style.display = 'block';
    })

    addDate.addEventListener('click', () => {
        historyInput.style.display = 'block';
    })

    dropDate.addEventListener('click', () => {
        dropHistory.style.display = 'block';
    })

    createExercise.addEventListener('click', () => {
        exerciseInput.style.display = 'block';
    })

    deleteExercise.addEventListener('click', () => {
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
    <h3>${elem.exercise_name} Sets: ${elem.sets} X Reps: ${elem.reps_time} Rest Cycle: ${elem.rest_cycle}.</h3>
    `; 
    div.className = 'workout_items'
    div.style.cursor = 'pointer'
    div.addEventListener('click', (e) => {
        currentId = e.currentTarget.id;
        changeWorkout.style.display = 'block'
});
    exercise.appendChild(div)
};

//Form Helper Functions

//User Profile Edit Exercises Form

const changeWorkoutForm = (form) => {
    changeWorkout.style.display = 'none';
    let exercise_id = currentId;
    let exerciseName = form.exercise_name.value; 
    let sets = form.sets.value;
    let reps = form.reps.value;
    let rest = form.rest.value;

    form.exercise_name.value = '';
    form.sets.value = '';
    form.reps.value = '';
    form.rest.value = '';

    const workouturl = `https://desolate-reef-75349.herokuapp.com/api/workout/${exercise_id}`;

    let data = {
        exercise_name: `${exerciseName}`,
        sets: `${sets}`,
        reps_time: `${reps}`,
        rest_cycle: `${rest}`
    }

    let fetchData = {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }

    fetch(workouturl, fetchData)
    .then(() => {
        console.log('Changed Exercise')
    })
    exercise.innerHTML = '';
    workout();
};

const changeExerciseInput = (form) => {
    changeExercise.style.display = 'none';
    let exercise_id = currentId;
    let exerciseName = form.exercise_name.value; 
    let type_of = form.type_of.value;
    let muscle_group = form.muscle_group.value;
    let reps_time_interval = form.reps_time_interval.value;
    let equipment_needed = form.equipment_needed.value;

    form.exercise_name.value = '';
    form.type_of.value = '';
    form.muscle_group.value = '';
    form.reps_time_interval.value = '';
    form.equipment_needed.value = '';

    const workouturl = `https://desolate-reef-75349.herokuapp.com/api/exercise/${exercise_id}`;

    let data = {
        exercise_name: `${exerciseName}`,
        type_of: `${type_of}`,
        muscle_group: `${muscle_group}`,
        reps_time_interval: `${reps_time_interval}`,
        equipment_needed: `${equipment_needed}`
    }

    let fetchData = {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }

    fetch(workouturl, fetchData)
    .then(() => {
        console.log('Exercise Changed!');
    })
    exerciseItems.innerHTML = '';
    exerciseList();
};

//Calendar Create Date Form
const historyForm = (form) => {
    historyInput.style.display = 'none'
    let month = form.month.value;
    let day = form.day.value;
    let year = form.year.value;

    form.month.value = '';
    form.day.value = '';
    form.year.value = '';

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
        console.log('Date Added!');
    })
    addDate.style.display = 'inline-block';
    dropDate.style.display = 'inline-block';
    history.innerHTML = '';
    log();
};

//Calendar Delete Day Form
const deleteDay = (form) => {
    let calendar_id = form.history_date.value;
    const dropurl = `https://desolate-reef-75349.herokuapp.com/api/calendar/${calendar_id}`
    
    form.history_date.value = '';

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
        console.log('Date Dropped!');
    })
    
    addDate.style.display = 'inline-block';
    dropDate.style.display = 'inline-block';
    dropHistory.style.display = 'none';
    history.innerHTML = '';
    log();
};

//Exercise List Add Exercise Form
const exerciseForm = (form) => {
    exerciseInput.style.display = 'none'
    let exercise_name = form.exercise_name.value;
    let type_of = form.type_of.value;
    let muscle_group = form.muscle_group.value;
    let reps_time_interval = form.reps_time_interval.value;
    let equipment_needed = form.equipment_needed.value;

    form.exercise_name.value = '';
    form.type_of.value = '';
    form.muscle_group.value = '';
    form.reps_time_interval.value = '';
    form.equipment_needed.value = '';

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
        console.log('Exercise Added!');
    })
    createExercise.style.display = 'inline-block';
    deleteExercise.style.display= 'inline-block';
    exerciseItems.innerHTML = '';
    exerciseList();
}

//Exercise List Delete Exercise Form
const deleteEx = (form) => {
    let exercise_id = form.exercise_id.value;
    const dropurl = `https://desolate-reef-75349.herokuapp.com/api/exercise/${exercise_id}`

    form.exercise_id.value = '';

    let data = {
        exercise_id: `${exercise_id}`
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
        console.log('Exercise Dropped!');
    })

    createExercise.style.display = 'inline-block';
    deleteExercise.style.display = 'inline-block';
    deleteE.style.display = 'none';
    exerciseItems.innerHTML = '';
    exerciseList();
}

//User Profile Create Exercise
const workoutForm = (form) => {
    workoutInput.style.display = 'none';
    let exerciseName = form.exercise_name.value; 
    let sets = form.sets.value;
    let reps = form.reps.value;
    let rest = form.rest.value;
    
    form.exercise_name.value = ''; 
    form.sets.value = '';
    form.reps.value = '';
    form.rest.value = '';

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
            console.log('Created Exercise');
        })
        addExercise.style.display = 'inline-block';
        dropExercise.style.display = 'inline-block';
        exercise.innerHTML = '';
        workout();
};

//User Profile Drop Exercise
const deleteW = (form) => {
    dropExercise.style.display = 'none';
    let exercise_name = form.exercise_name.value;
    const dropurl = `https://desolate-reef-75349.herokuapp.com/api/workout/${exercise_name}`

    form.exercise_name.value = '';

    let data = {
        exercise_name: `${exercise_name}`
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
        console.log('Dropped Exercise');
    })

    addExercise.style.display = 'inline-block';
    dropExercise.style.display = 'inline-block';
    deleteWorkout.style.display = 'none';
    exercise.innerHTML = '';
    workout();
};

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
     div.className = 'exercise_items'
     div.style.cursor = 'pointer'
     div.addEventListener('click', (e) => {
         currentId = e.currentTarget.id;
         changeExercise.style.display = 'block';
    })
    exerciseItems.appendChild(div)
}
  
startUp();