const calendar = document.querySelector('.calendar');
const list = document.querySelector('.list');
const plans = document.querySelector('.plans');
const profile = document.querySelector('.profile');
const history = document.querySelector('.history');
const exercises = document.querySelector('.exercises');

const user = document.querySelector('.user');
const currentplan = document.querySelector('.currentplan');
const workouts = document.querySelector('.workouts');

const startUp = () => {
    buttonDev();
    getData();
}

const buttonDev = () => {
    calendar.addEventListener('click', () => {
        user.style.display = "none";
        currentplan.style.display = "none";
        workouts.style.display= "none";
        exercises.style.display="none";
        history.style.display="block";


        const calendarurl = 'https://desolate-reef-75349.herokuapp.com/api/calendar/';
        let calendarhtml = `<button class="button" type="submit">Add Date</button>`;

        fetch(calendarurl)
        .then(response => response.json())
        .then(data => {
            data.forEach(data => {
                let htmlSegment = `
                <div class='current'>
                <h2>${data.calendar_id}</h2>
                <h3 class="date">${data.month}</h3>
                <h3 class="date">${data.day}</h3>
                <h3 class="date">${data.year}</h3>
                `;

                calendarhtml += htmlSegment;
            });
            history.innerHTML = calendarhtml;
        });
    });

    list.addEventListener('click', () => {
        user.style.display = "none";
        currentplan.style.display = "none";
        workouts.style.display= "none";
        history.style.display="none";
        exercises.style.display="block";

        const listurl = 'https://desolate-reef-75349.herokuapp.com/api/exercise';
        let listhtml = '<button class="button" type="submit">Add Exercise</button>';
        
        fetch(listurl)
        .then(response => response.json())
        .then(data => {
            data.forEach(data => {
                let htmlSegment = `
                <div class='current'>
                <h2>${data.exercise_id}</h2>
                <h3>Name: ${data.exercise_name}</h3>
                <h3>Type of Exercise: ${data.type_of}</h3>
                <h3>Muscle Group(s): ${data.muscle_group}</h3>
                <h3>Reps/Time/Interval: ${data.reps_time_interval}</h3>
                <h3>Equipment you will need: ${data.equipment_needed}</h3>
                `;
    
                listhtml += htmlSegment;
            })
            exercises.innerHTML = listhtml;
        });
    })
    

    profile.addEventListener('click', () => {
        user.style.display = "block";
        currentplan.style.display = "block";
        workouts.style.display= "block";
        history.style.display="none";
        exercises.style.display="none";
    })
};

const getData = () => {
    const planurl = 'https://desolate-reef-75349.herokuapp.com/api/workout_plans/0';
    let planhtml = '';
    fetch(planurl)
    .then(response => response.json())
    .then(data => {
        let htmlSegment = `
            <div class='today'>
            <h2>${data.plan_name}</h2>
            <h3>${data.type_of_plan}</h3>
            <h3>${data.length_of_plan}</h3>`;

        planhtml+=htmlSegment;
        currentplan.innerHTML += planhtml;
    });

    const workouturl = 'https://desolate-reef-75349.herokuapp.com/api/workout/';
    let workouthtml = '<button id="workout" class="button" type="submit">Add Exercise</button>';
    
    fetch(workouturl)
    .then(response => response.json())
    .then(data => {
        data.forEach(data => {
            let htmlSegment = `
            <div class='current'>
            <h2>${data.workout_id}</h2>
            <h3>${data.exercise_name} Sets: ${data.sets} X Reps: ${data.reps_time} Rest: ${data.rest_cycle}</h3>
            `;
            workouthtml += htmlSegment;
        })
        workouts.innerHTML += workouthtml;
    });

    const input = querySelector('#workout');
    input.addEventListener('click', () => {
        let name = window.prompt("Please enter an exercise name");
        console.log(name.value)
        let sets = window.prompt("Please enter the number of sets");
        console.log(sets.value)
        let reps_time = window.prompt("Please enter the number of reps/time");
        console.log(reps_time.value)
        let rest = window.prompt("Please enter the rest period");
        console.log(rest.value)
    })

}

startUp();