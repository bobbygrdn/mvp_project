DROP TABLE IF EXISTS workout_plans;
DROP TABLE IF EXISTS calendar;
DROP TABLE IF EXISTS workout;
DROP TABLE IF EXISTS exercise_list;
DROP TABLE IF EXISTS exercise;

CREATE TABLE workout (
    workout_id INT NOT NULL UNIQUE,
    exercise_name VARCHAR(50),
    sets INT,
    reps/time TEXT,
    rest_cycle TEXT
);

CREATE TABLE calendar (
    calendar_id INT NOT NULL UNIQUE,
    month INT NOT NULL,
    day INT NOT NULL,
    year INT NOT NULL
);

CREATE TABLE exercise (
    exercise_id INT NOT NULL UNIQUE,
    type_of VARCHAR(20) NOT NULL,
    muscle_group TEXT NOT NULL,
    reps_time_interval TEXT,
    instructions TEXT NOT NULL,
    equipment_needed TEXT NOT NULL,
    exercise_history TEXT,
    set_goal TEXT,
    CONSTRAINT fk_exercise_list FOREIGN KEY(list_id) REFERENCES exercise_list(list_id)
);

CREATE TABLE workout_plans (
    plan_id INT NOT NULL UNIQUE,
    plan_name TEXT NOT NULL,
    type_of_plan TEXT,
    length_of_plan TEXT NOT NULL,
    CONSTRAINT fk_workout FOREIGN KEY(workout_id) REFERENCES workout(workout_id)
);

CREATE TABLE exercise_list (
    list_id INT NOT NULL UNIQUE,
    exercise_name VARCHAR(50),
    CONSTRAINT fk_exercise FOREIGN KEY(exercise_id) REFERENCES exercise(exercise_id)
);