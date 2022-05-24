ALTER TABLE exercise ADD CONSTRAINT fk_exercise_list FOREIGN KEY(list_id) REFERENCES exercise_list(list_id);
ALTER TABLE workout_plans ADD CONSTRAINT fk_workout FOREIGN KEY(workout_id) REFERENCES workout(workout_id);
ALTER TABLE exercise_list ADD CONSTRAINT fk_exercise FOREIGN KEY(exercise_id) REFERENCES exercise(exercise_id);

INSERT INTO calendar(month, day, year) VALUES('05', '23', '2022');
INSERT INTO calendar(month, day, year) VALUES('05', '24', '2022');
INSERT INTO calendar(month, day, year) VALUES('05', '25', '2022');

INSERT INTO exercise(exercise_name, type_of, muscle_group, reps_time_interval, instructions, equipment_needed) VALUES('Barbell Benchpress', 'Strength', 'Chest', 'Reps', 'Bench press is a great exercise for building a powerful chest.', 'Barbell, Benchpress');
INSERT INTO exercise(exercise_name, type_of, muscle_group, reps_time_interval, instructions, equipment_needed) VALUES ('Seated Shoulder Press', 'Strength', 'Shoulders', 'Reps', 'The dumbbell shoulder press is a variation of the standard military press that puts more focus on the trap muscles and deltoid muscles', 'Dumbbells, Bench');
INSERT INTO exercise(exercise_name, type_of, muscle_group, reps_time_interval, instructions, equipment_needed) VALUES ('Leg Raise', 'Strength', 'Core', 'Reps', 'The leg raise exercise helps work and strengthen your lower abs which typically is a hard muscle to target', 'Body Only');

INSERT INTO exercise_list(exercise_name, exercise_id) VALUES ('Barbell Benchpress', '1');
INSERT INTO exercise_list(exercise_name,exercise_id) VALUES ('Seated Shoulder Press', '2');
INSERT INTO exercise_list(exercise_name,exercise_id) VALUES ('Leg Raise', '3');

INSERT INTO workout(exercise_name, sets, reps_time, rest_cycle) VALUES('Barbell Bench Press', '3', '10', '60 Seconds');
INSERT INTO workout(exercise_name, sets, reps_time, rest_cycle) VALUES('Seated Shoulder Press', '3', '12', '60 Seconds');
INSERT INTO workout(exercise_name, sets, reps_time, rest_cycle) VALUES('Leg Raise', '4', '12', '30 Seconds');

INSERT INTO workout_plans(plan_name, type_of_plan, length_of_plan) VALUES ('Strength Trainng', 'Strength', '5 Days')
