const calendar = document.querySelector('.calendar');
const list = document.querySelector('.list');
const plans = document.querySelector('.plans');
const profile = document.querySelector('.profile');
const history = document.querySelector('.history');

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
        history.style.display="block";

        const calendarurl = 'https://desolate-reef-75349.herokuapp.com/api/calendar/';
        let calendarhtml = '';

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

    profile.addEventListener('click', () => {
        user.style.display = "block";
        currentplan.style.display = "block";
        workouts.style.display= "block";
        history.style.display="none";
    })
};

const getData = () => {
    const planurl = 'https://desolate-reef-75349.herokuapp.com/api/workout_plans/0';
    let planhtml = '';
    fetch(planurl)
    .then(response => response.json())
    .then(data => {
        let htmlSegment = `
            <div class='current'>
            <h2>${data.plan_name}</h2>
            <h3>${data.type_of_plan}</h3>
            <h3>${data.length_of_plan}</h3>`;

        planhtml+=htmlSegment;
        currentplan.innerHTML += planhtml;
    });

    const workouturl = 'https://desolate-reef-75349.herokuapp.com/api/workout/';
    let workouthtml = '';
    fetch(workouturl)
    .then(response => response.json())
    .then(data => {
        data.forEach(data => {
            let htmlSegment = `
            <div class='first'>
            <h2>${data.workout_id}</h2>
            <h3>${data.exercise_name}</h3>
            <h3>Sets:${data.sets} X Reps:${data.reps_time}</h3>
            <h3>Rest:${data.rest_cycle}</h3>
            `;

            workouthtml += htmlSegment;
        })
        workouts.innerHTML += workouthtml;
    });

}

startUp();