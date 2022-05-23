const express = require('express');
const app = express();

const { Pool } = require('pg');

const port = process.env.PORT || 4000;

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'marine',
    database: mvp_project
})

app.use(express.json());

app.listen(port, () => {
    console.log(`Running on ${port}`)
})