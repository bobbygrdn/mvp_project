-- ALTER TABLE exercise ADD CONSTRAINT fk_exercise_list FOREIGN KEY(list_id) REFERENCES exercise_list(list_id);
-- ALTER TABLE workout_plans ADD CONSTRAINT fk_workout FOREIGN KEY(workout_id) REFERENCES workout(workout_id);
-- ALTER TABLE exercise_list ADD CONSTRAINT fk_exercise FOREIGN KEY(exercise_id) REFERENCES exercise(exercise_id);

INSERT INTO calendar(month, day, year) VALUES('05', '23', '2022');
INSERT INTO calendar(month, day, year) VALUES('05', '24', '2022');
INSERT INTO calendar(month, day, year) VALUES('05', '25', '2022');

INSERT INTO exercise(exercise_name, type_of, muscle_group, reps_time_interval, instructions, equipment_needed) VALUES('Barbell Benchpress', 'Strength', 'Chest', 'Reps', 'Bench press is a great exercise for building a powerful chest.', 'Barbell, Benchpress');