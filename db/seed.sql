ALTER TABLE exercise ADD CONSTRAINT fk_exercise_list FOREIGN KEY(list_id) REFERENCES exercise_list(list_id);
ALTER TABLE workout_plans ADD CONSTRAINT fk_workout FOREIGN KEY(workout_id) REFERENCES workout(workout_id);
ALTER TABLE exercise_list ADD CONSTRAINT fk_exercise FOREIGN KEY(exercise_id) REFERENCES exercise(exercise_id);
