
-- primary tables: user, project, ensemble, date, piece

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    bio TEXT,
    "location" TEXT,
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

CREATE TABLE ensemble (
    id SERIAL PRIMARY KEY,
    director TEXT,
    about TEXT,
    website TEXT,
    logo_path TEXT
);

CREATE TABLE project (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    ensemble_id INTEGER REFERENCES ensemble,
    owner_id INTEGER references "user",
    about TEXT
);

-- all events (rehearsals and performances)
CREATE TABLE "event" (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES project,
    "location" TEXT,
    "date" DATE NOT NULL,
    "time" TIME NOT NULL,
    rehearsal BOOLEAN
);

CREATE TABLE piece (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    composer_first TEXT,
    composer_last TEXT,
    arranger_first TEXT,
    arranger_last TEXT,
    "year" INTEGER,
    project_id INTEGER REFERENCES project,
    notes TEXT
);

-- junction tables: collaboration (user/user), user_project, user_ensemble(?)

CREATE TABLE collaboration (
    id SERIAL PRIMARY KEY,
    "user1_id" INTEGER REFERENCES "user",
    "user2_id" INTEGER REFERENCES "user"
);

CREATE TABLE user_project (
    id SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user",
    project_id INTEGER REFERENCES project
);

CREATE TABLE project_piece (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES project,
    piece_id INTEGER REFERENCES piece
);

CREATE TABLE user_ensemble (
    id SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user",
    ensemble_id INTEGER REFERENCES ensemble
);