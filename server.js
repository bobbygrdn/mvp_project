require("dotenv").config();
const express = require('express');
const app = express();
const db = require("./db/conn")

app.use(express.json());
app.use(express.static("public"));

app.get("/api/calendar", async (req,res) => {
    try {
        const data = await db.query('SELECT * FROM calendar;')
        res.send(data.rows);
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/api/calendar/:id", async (req,res) => {
    let id = req.params.id;
    try {
        const data = await db.query('SELECT * FROM calendar;')
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
            const data = await db.query(`INSERT INTO calendar (month, day, year) VALUES('${obj.month}', '${obj.day}', '${obj.year}');`)
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
            const data = await db.query(`UPDATE calendar SET month = '${obj.month}' WHERE calendar_id = '${id}';`)
            res.send("Updated Month");
        } catch (err) {
            console.error(err.message)
        }
    } else if(obj.day) {
        try {
            const data = await db.query(`UPDATE calendar SET day = '${obj.day}' WHERE calendar_id = '${id}';`)
            res.send("Updated Day");
        } catch (err) {
            console.error(err.message)
        }
    } else if(obj.year) {
        try {
            const data = await db.query(`UPDATE calendar SET year = '${obj.year}' WHERE calendar_id = '${id}';`)
            res.send("Updated Year");
        } catch (err) {
            console.error(err.message)
        }
    }
})

app.delete("/api/calendar/:id", async (req,res) => {
    let id = req.params.id;
    try {
        const data = await db.query(`DELETE FROM calendar WHERE calendar_id = '${id}'`)
        res.send("Deleted Date")
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/api/workout", async (req,res) => {
    try {
        const data = await db.query('SELECT * FROM workout;')
        res.send(data.rows);
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/api/workout/:id", async (req,res) => {
    let id = req.params.id;
    try {
        const data = await db.query('SELECT * FROM workout;')
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
            const data = await db.query(`INSERT INTO workout (exercise_name, sets, reps_time, rest_cycle) VALUES('${obj.exercise_name}', '${obj.sets}', '${obj.reps_time}', '${obj.rest_cycle}');`)
            res.send('Exercise Created!');
        } catch (err) {
            console.error(err.message);
        }
    }
})

app.patch("/api/workout/:id", async (req,res) => {
    let id = req.params.id;
    let obj = req.body;

    if(obj.exercise_name) {
        try {
            const data = await db.query(`UPDATE workout SET exercise_name = '${obj.exercise_name}' WHERE workout_id = '${id}';`)
            res.send("Updated Name");
        } catch (err) {
            console.error(err.message)
        }
    } else if(obj.sets) {
        try {
            const data = await db.query(`UPDATE workout SET sets = '${obj.sets}' WHERE workout_id = '${id}';`)
            res.send("Updated Sets");
        } catch (err) {
            console.error(err.message)
        }
    } else if(obj.reps_time) {
        try {
            const data = await db.query(`UPDATE workout SET reps_time = '${obj.reps_time}' WHERE workout_id = '${id}';`)
            res.send("Updated Reps/Time");
        } catch (err) {
            console.error(err.message)
        }
    } else if(obj.rest_cycle) {
        try {
            const data = await db.query(`UPDATE workout SET rest_cycle = '${obj.rest_cycle}' WHERE workout_id = '${id}';`)
            res.send("Updated Rest Cycle");
        } catch (err) {
            console.error(err.message)
        }
    }
})

app.delete("/api/workout/:exercise_name", async (req,res) => {
    let name = req.params.exercise_name;
    try {
        const data = await db.query(`DELETE FROM workout WHERE exercise_name = '${name}'`)
        res.send("Deleted Exercise")
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/api/exercise", async (req,res) => {
    try {
        const data = await db.query('SELECT * FROM exercise;')
        res.send(data.rows);
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/api/exercise/:id", async (req,res) => {
    let id = req.params.id;
    try {
        const data = await db.query('SELECT * FROM exercise;')
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
    if(obj.exercise_name === '' || obj.type_of === '' || obj.muscle_group === '' || obj.reps_time_interval === '' || obj.equipment_needed === '') {
        res.statusCode = 404;
        res.header('Content-Type', 'text/plain');
        res.end("Please insert Name, Sets, Reps, Rest Cycle, Equipment Needed")
    } else {
        try {
            const data = await db.query(`INSERT INTO exercise (exercise_name, type_of, muscle_group,reps_time_interval, equipment_needed) VALUES('${obj.exercise_name}', '${obj.type_of}', '${obj.muscle_group}', '${obj.reps_time_interval}', '${obj.equipment_needed}');`)
            res.send('Exercise Created!');
        } catch (err) {
            console.error(err.message);
        }
    }
})

app.patch("/api/exercise/:id", async (req,res) => {
    let id = req.params.id;
    let obj = req.body;

    if(obj.exercise_name) {
        try {
            const data = await db.query(`UPDATE exercise SET exercise_name = '${obj.exercise_name}' WHERE exercise_id = '${id}';`)
            res.send("Updated Name");
        } catch (err) {
            console.error(err.message)
        }
    } else if(obj.type_of) {
        try {
            const data = await db.query(`UPDATE exercise SET type_of = '${obj.type_of}' WHERE exercise_id = '${id}';`)
            res.send("Updated Type");
        } catch (err) {
            console.error(err.message)
        }
    } else if(obj.muscle_group) {
        try {
            const data = await db.query(`UPDATE exercise SET muscle_group = '${obj.muscle_group}' WHERE exercise_id = '${id}';`)
            res.send("Updated Muscle Group");
        } catch (err) {
            console.error(err.message)
        }
    } else if(obj.reps_time_interval) {
        try {
            const data = await db.query(`UPDATE exercise SET reps_time_interval = '${obj.reps_time_interval}' WHERE exercise_id = '${id}';`)
            res.send("Updated Reps/Time/interval");
        } catch (err) {
            console.error(err.message)
        }
    }  else if(obj.equipment_needed) {
        try {
            const data = await db.query(`UPDATE exercise SET equipment_needed = '${obj.equipment_needed}' WHERE exercise_id = '${id}';`)
            res.send("Updated Equipment");
        } catch (err) {
            console.error(err.message)
        }
    } else if(obj.set_goal) {
        try {
            const data = await db.query(`UPDATE exercise SET set_goal = '${obj.set_goal}' WHERE exercise_id = '${id}';`)
            res.send("Updated Goal");
        } catch (err) {
            console.error(err.message)
        }
    } 
})

app.delete("/api/exercise/:exercise_name", async (req,res) => {
    let name = req.params.exercise_name;
    try {
        const data = await db.query(`DELETE FROM exercise WHERE exercise_name = '${name}'`)
        res.send("Deleted Exercise")
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/api/workout_plans", async (req,res) => {
    try {
        const data = await db.query('SELECT * FROM workout_plans;')
        res.send(data.rows);
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/api/workout_plans/:id", async (req,res) => {
    let id = req.params.id;
    try {
        const data = await db.query('SELECT * FROM workout_plans;')
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
            const data = await db.query(`INSERT INTO workout_plans (plan_name, type_of_plan, length_of_plan) VALUES('${obj.plan_name}', '${obj.type_of_plan}', '${obj.length_of_plan}');`)
            res.send('Plan Created!');
        } catch (err) {
            console.error(err.message);
        }
    }

})

app.patch("/api/workout_plans/:id", async (req,res) => {
    let id = req.params.id;
    let obj = req.body;

    if(obj.plan_name) {
        try {
            const data = await db.query(`UPDATE workout_plans SET plan_name = '${obj.plan_name}' WHERE plan_id = '${id}';`)
            res.send("Updated Name");
        } catch (err) {
            console.error(err.message)
        }
    } else if(obj.type_of_plan) {
        try {
            const data = await db.query(`UPDATE workout_plans SET type_of_plan = '${obj.type_of_plan}' WHERE plan_id = '${id}';`)
            res.send("Updated Type");
        } catch (err) {
            console.error(err.message)
        }
    } else if(obj.length_of_plan) {
        try {
            const data = await db.query(`UPDATE workout_plans SET length_of_plan = '${obj.length_of_plan}' WHERE plan_id = '${id}';`)
            res.send("Updated Length");
        } catch (err) {
            console.error(err.message)
        }
    } 
})

app.delete("/api/workout_plans/:id", async (req,res) => {
    let id = req.params.id;
    try {
        const data = await db.query(`DELETE FROM workout_plans WHERE plan_id = '${id}'`)
        res.send("Deleted Plan")
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/api/exercise_list", async (req,res) => {
    try {
        const data = await db.query('SELECT * FROM exercise_list;')
        res.send(data.rows);
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/api/exercise_list/:id", async (req,res) => {
    let id = req.params.id;
    try {
        const data = await db.query('SELECT * FROM exercise_list;')
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
            const data = await db.query(`INSERT INTO exercise_list (exercise_name) VALUES('${obj.exercise_name}');`)
            res.send('Exercise Created!');
        } catch (err) {
            console.error(err.message);
        }
    }
})

app.patch("/api/exercise_list/:id", async (req,res) => {
    let id = req.params.id;
    let obj = req.body;

    if(obj.exercise_name) {
        try {
            const data = await db.query(`UPDATE exercise_list SET exercise_name = '${obj.exercise_name}' WHERE list_id = '${id}';`)
            res.send("Updated Name");
        } catch (err) {
            console.error(err.message)
        }
    } 
})

app.delete("/api/exercise_list/:id", async (req,res) => {
    let id = req.params.id;
    try {
        const data = await db.query(`DELETE FROM exercise_list WHERE list_id = '${id}'`)
        res.send("Deleted Exercise")
    } catch (err) {
        console.error(err.message)
    }
})

app.use((req,res,next) => {
    res.status(500).send("Internal Server Error")
})

app.listen(process.env.PORT, () => {
    console.log(`Running on ${process.env.PORT}`)
})