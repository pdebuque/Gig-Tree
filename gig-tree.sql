-- primary tables: user, project, ensemble, date, piece

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    bio TEXT,
    "location" TEXT,
    first_name TEXT,
    last_name TEXT,
    join_date DATE,
    available TEXT,
    instrument_1 TEXT,
    instrument_2 TEXT,
    instrument_3 TEXT,
    job_1 TEXT,
    job_1_location TEXT,
    job_2 TEXT,
    job_2_location TEXT,
    prof_pic_path TEXT,
    cover_pic_path TEXT
);

CREATE TABLE project (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    ensemble_name TEXT,
    owner_id INTEGER REFERENCES "user" ON DELETE CASCADE,
    description TEXT,
    backgroundcolor TEXT DEFAULT '#ffffff',
    color TEXT DEFAULT '#fb8500'
);

-- all events (rehearsals and performances)
CREATE TABLE "date" (
    id SERIAL PRIMARY KEY,
    "name" TEXT,
    project_id INTEGER REFERENCES project ON DELETE CASCADE,
    "location" TEXT,
    "date" TEXT NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "type" TEXT,
    notes TEXT
);

CREATE TABLE piece (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    composer TEXT,
    project_id INTEGER REFERENCES project ON DELETE CASCADE
);

-- junction tables: collaboration (user/user), user_project, user_ensemble(?)

CREATE TABLE starred (
    id SERIAL PRIMARY KEY,
    "user1_id" INTEGER REFERENCES "user" ON DELETE CASCADE,
    "user2_id" INTEGER REFERENCES "user" ON DELETE CASCADE
);

CREATE TABLE user_project (
    id SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user" ON DELETE CASCADE,
    project_id INTEGER REFERENCES project ON DELETE CASCADE,
    project_accepted BOOLEAN DEFAULT FALSE,
    starred BOOLEAN DEFAULT FALSE
);