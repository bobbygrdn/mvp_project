DROP TABLE IF EXISTS workout_plans;
DROP TABLE IF EXISTS calendar;
DROP TABLE IF EXISTS workout;
DROP TABLE IF EXISTS exercise_list;
DROP TABLE IF EXISTS exercise;

CREATE TABLE workout (
    workout_id SERIAL PRIMARY KEY,
    exercise_name VARCHAR(50),
    sets INT,
    reps_time TEXT,
    rest_cycle TEXT
);

CREATE TABLE calendar (
    calendar_id SERIAL PRIMARY KEY,
    month INT NOT NULL,
    day INT NOT NULL,
    year INT NOT NULL
);

CREATE TABLE exercise (
    exercise_id SERIAL PRIMARY KEY,
    exercise_name VARCHAR(50) NOT NULL,
    type_of VARCHAR(50) NOT NULL,
    muscle_group TEXT NOT NULL,
    reps_time_interval TEXT,
    instructions TEXT NOT NULL,
    equipment_needed TEXT NOT NULL,
    exercise_history TEXT,
    set_goal TEXT,
    list_id INT
);

CREATE TABLE workout_plans (
    plan_id SERIAL PRIMARY KEY,
    plan_name TEXT NOT NULL,
    type_of_plan TEXT,
    length_of_plan TEXT NOT NULL,
    workout_id INT
);

CREATE TABLE exercise_list (
    list_id SERIAL PRIMARY KEY,
    exercise_name VARCHAR(50),
    exercise_id INT
);