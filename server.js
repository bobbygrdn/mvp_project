const express = require('express');
const app = express();

const { Pool } = require('pg');

const port = process.env.PORT || 4000;

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'marine',
    database: 'mvp_project'
})

app.use(express.json());

app.get("/api/calendar", async (req,res) => {
    try {
        const data = await pool.query('SELECT * FROM calendar;')
        res.send(data.rows);
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/api/calendar/:id", async (req,res) => {
    let id = req.params.id;
    try {
        const data = await pool.query('SELECT * FROM calendar;')
        if(id >= data.rows.length) {
            res.statusCode = 404;
            res.header('Content-Type', 'text/plain');
            res.end("Could Not Find Date")
        }
        res.send(data.rows[id]);
    } catch (err) {
        console.error(err.message)
    }
    })

app.post("/api/calendar", async (req,res) => {
    let obj = req.body;
    if(obj.month === '' || obj.day === '' || obj.year === '') {
        res.statusCode = 404;
        res.header('Content-Type', 'text/plain');
        res.end("Please insert Month, Day, Year")
    } else {
        try {
            const data = await pool.query(`INSERT INTO calendar (month, day, year) VALUES('${obj.month}', '${obj.day}', '${obj.year}');`)
            res.send('Date Created!');
        } catch (err) {
            console.error(err.message);
        }
    }
})

app.patch("/api/calendar/:id", async (req,res) => {
    let id = req.params.id;
    let obj = req.body;

    if(obj.month) {
        try {
            
        } catch (err) {
            console.error(err.message)
        }
    }
})

app.get("/api/workout", async (req,res) => {
    try {
        const data = await pool.query('SELECT * FROM workout;')
        res.send(data.rows);
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/api/workout/:id", async (req,res) => {
    let id = req.params.id;
    try {
        const data = await pool.query('SELECT * FROM workout;')
        if(id >= data.rows.length) {
            res.statusCode = 404;
            res.header('Content-Type', 'text/plain');
            res.end("Could Not Find workout")
        }
        res.send(data.rows[id]);
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/api/workout", async (req,res) => {
    let obj = req.body;
    if(obj.exercise_name === '' || obj.sets === '' || obj.reps_time === '' || obj.rest_cycle === '') {
        res.statusCode = 404;
        res.header('Content-Type', 'text/plain');
        res.end("Please insert Name, Sets, Reps, Rest Cycle")
    } else {
        try {
            const data = await pool.query(`INSERT INTO workout (exercise_name, sets, reps_time, rest_cycle) VALUES('${obj.exercise_name}', '${obj.sets}', '${obj.reps_time}', '${obj.reps_cycle}');`)
            res.send('Exercise Created!');
        } catch (err) {
            console.error(err.message);
        }
    }
})

app.get("/api/exercise", async (req,res) => {
    try {
        const data = await pool.query('SELECT * FROM exercise;')
        res.send(data.rows);
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/api/exercise/:id", async (req,res) => {
    let id = req.params.id;
    try {
        const data = await pool.query('SELECT * FROM exercise;')
        if(id >= data.rows.length) {
            res.statusCode = 404;
            res.header('Content-Type', 'text/plain');
            res.end("Could Not Find exercise")
        }
        res.send(data.rows[id]);
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/api/exercise", async (req,res) => {
    let obj = req.body;
    if(obj.exercise_name === '' || obj.type_of === '' || obj.muscle_group === '' || obj.reps_time_interval === '' || obj.instructions === '' || obj.equipment_needed === '') {
        res.statusCode = 404;
        res.header('Content-Type', 'text/plain');
        res.end("Please insert Name, Sets, Reps, Rest Cycle, Instructions, Equipment Needed")
    } else {
        try {
            const data = await pool.query(`INSERT INTO exercise (exercise_name, type_of, muscle_group,reps_time_interval, instructions, equipment_needed) VALUES('${obj.exercise_name}', '${obj.type_of}', '${obj.muscle_group}', '${obj.reps_time_interval}', '${obj.instructions}', '${obj.equipment_needed}');`)
            res.send('Exercise Created!');
        } catch (err) {
            console.error(err.message);
        }
    }
})

app.get("/api/workout_plans", async (req,res) => {
    try {
        const data = await pool.query('SELECT * FROM workout_plans;')
        res.send(data.rows);
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/api/workout_plans/:id", async (req,res) => {
    let id = req.params.id;
    try {
        const data = await pool.query('SELECT * FROM workout_plans;')
        if(id >= data.rows.length) {
            res.statusCode = 404;
            res.header('Content-Type', 'text/plain');
            res.end("Could Not Find Plan")
        }
        res.send(data.rows[id]);
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/api/workout_plans", async (req,res) => {
    let obj = req.body;
    if(obj.plan_name === '' || obj.type_of_plan === '' || obj.length_of_plan === '') {
        res.statusCode = 404;
        res.header('Content-Type', 'text/plain');
        res.end("Please insert Name, Type, Length")
    } else {
        try {
            const data = await pool.query(`INSERT INTO workout_plans (plan_name, type_of_plan, length_of_plan) VALUES('${obj.plan_name}', '${obj.type_of_plan}', '${obj.length_of_plan}');`)
            res.send('Plan Created!');
        } catch (err) {
            console.error(err.message);
        }
    }

})

app.get("/api/exercise_list", async (req,res) => {
    try {
        const data = await pool.query('SELECT * FROM exercise_list;')
        res.send(data.rows);
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/api/exercise_list/:id", async (req,res) => {
    let id = req.params.id;
    try {
        const data = await pool.query('SELECT * FROM exercise_list;')
        if(id >= data.rows.length) {
            res.statusCode = 404;
            res.header('Content-Type', 'text/plain');
            res.end("Could Not Find Exercise")
        }
        res.send(data.rows[id]);
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/api/exercise_list", async (req,res) => {
    let obj = req.body;
    if(obj.exercise_name === '') {
        res.statusCode = 404;
        res.header('Content-Type', 'text/plain');
        res.end("Please insert Name")
    } else {
        try {
            const data = await pool.query(`INSERT INTO exercise_list (exercise_name) VALUES('${obj.exercise_name}');`)
            res.send('Exercise Created!');
        } catch (err) {
            console.error(err.message);
        }
    }
})

app.listen(port, () => {
    console.log(`Running on ${port}`)
})