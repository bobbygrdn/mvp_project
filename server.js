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

app.get("/api/workout", async (req,res) => {
    try {
        const data = await pool.query('SELECT * FROM workout;')
        res.send(data.rows);
    } catch (err) {
        console.error(err.message)
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

app.get("/api/workout_plans", async (req,res) => {
    try {
        const data = await pool.query('SELECT * FROM workout_plans;')
        res.send(data.rows);
    } catch (err) {
        console.error(err.message)
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

app.listen(port, () => {
    console.log(`Running on ${port}`)
})