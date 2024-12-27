-- Create the database (only if it doesn't exist already)
CREATE DATABASE IF NOT EXISTS fitness-tracker;

-- Connect to the newly created database (this command is for interactive sessions)
\c fitness-tracker;

-- Table: users
CREATE TABLE IF NOT EXISTS public.users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: goals
CREATE TABLE IF NOT EXISTS public.goals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    targetdate DATE
);

-- Table: exercises
CREATE TABLE IF NOT EXISTS public.exercises (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: exercise_sessions
CREATE TABLE IF NOT EXISTS public.exercise_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES public.users(id) ON DELETE CASCADE,
    exercise_id INTEGER REFERENCES public.exercises(id) ON DELETE CASCADE,
    sets INTEGER,
    repetitions INTEGER,
    duration INTEGER,
    session_date DATE,
    goal_id INTEGER REFERENCES public.goals(id),
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
