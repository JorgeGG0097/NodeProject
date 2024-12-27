-- Insert data into users table (2 records)
INSERT INTO public.users (name, email, password) 
VALUES 
    ('John Doe', 'john.doe@example.com', 'password123'),
    ('Jane Smith', 'jane.smith@example.com', 'password456');

-- Insert data into goals table (10 records)
INSERT INTO public.goals (name, description, targetdate) 
VALUES 
    ('Lose Weight', 'Lose 5kg in 2 months', '2025-02-25'),
    ('Build Muscle', 'Increase muscle mass by 10kg in 3 months', '2025-03-25'),
    ('Run a Marathon', 'Complete a full marathon', '2025-05-15'),
    ('Improve Flexibility', 'Increase flexibility by 20%', '2025-06-10'),
    ('Strength Training', 'Improve upper body strength', '2025-07-20'),
    ('Increase Endurance', 'Run 10km without stopping', '2025-08-05'),
    ('Improve Posture', 'Correct posture and back alignment', '2025-09-01'),
    ('Yoga Mastery', 'Master intermediate yoga poses', '2025-10-10'),
    ('HIIT Challenge', 'Complete 30 days of high-intensity interval training', '2025-11-15'),
    ('Lose Belly Fat', 'Reduce abdominal fat by 10%', '2025-12-20');

-- Insert data into exercises table (10 records)
INSERT INTO public.exercises (name, description, category) 
VALUES 
    ('Push-up', 'A basic upper body exercise targeting chest, arms, and core.', 'Strength'),
    ('Squat', 'A lower body exercise that strengthens the legs and glutes.', 'Strength'),
    ('Running', 'A cardio exercise that improves cardiovascular health and endurance.', 'Cardio'),
    ('Bench Press', 'A strength exercise that targets the chest, shoulders, and triceps.', 'Strength'),
    ('Lunges', 'A lower body exercise that focuses on legs and glutes.', 'Strength'),
    ('Jump Rope', 'A cardio exercise that improves coordination and cardiovascular health.', 'Cardio'),
    ('Deadlift', 'A strength exercise that targets the back, glutes, and legs.', 'Strength'),
    ('Plank', 'A core strengthening exercise to improve stability and endurance.', 'Strength'),
    ('Burpees', 'A full-body workout that combines squats, push-ups, and jumps.', 'HIIT'),
    ('Mountain Climbers', 'A full-body exercise focusing on the core, arms, and legs.', 'HIIT');

-- Insert data into exercise_sessions table (10 records)
INSERT INTO public.exercise_sessions (user_id, exercise_id, sets, repetitions, duration, session_date, goal_id) 
VALUES 
    (1, 1, 3, 15, 30, '2024-12-25', 1),
    (2, 2, 4, 20, 45, '2024-12-25', 2),
    (1, 3, 3, 30, 60, '2024-12-26', 3),
    (2, 4, 3, 12, 40, '2024-12-27', 4),
    (1, 5, 4, 15, 35, '2024-12-28', 5),
    (1, 6, 3, 25, 20, '2024-12-29', 6),
    (2, 7, 5, 10, 50, '2024-12-30', 7),
    (2, 8, 4, 15, 30, '2024-12-31', 8),
    (1, 9, 3, 10, 25, '2025-01-01', 9),
    (2, 10, 4, 20, 30, '2025-01-02', 10);
