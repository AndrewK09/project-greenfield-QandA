DROP TABLE IF EXISTS questions;
CREATE TABLE questions
(
    question_id serial,
    product_id integer NOT NULL,
    question_body varchar(1000) NOT NULL,
    question_date date DEFAULT CURRENT_DATE,
    asker_name varchar(60) NOT NULL,
    asker_email varchar(60) NOT NULL,
    reported integer DEFAULT 0,
    question_helpfulness integer DEFAULT 0,
    CONSTRAINT "Questions_pkey" PRIMARY KEY (question_id)
);
-- ===========================   ANSWERS    ==============================

DROP TABLE IF EXISTS answers;
CREATE TABLE answers
(
    answer_id serial,
    question_id integer,
    body varchar(1000) NOT NULL,
    date date DEFAULT CURRENT_DATE,
    answerer_name varchar(60) NOT NULL,   
    answerer_email varchar(60) NOT NULL,
    report integer DEFAULT 0,
    helpfulness integer DEFAULT 0,
    photos jsonb[] DEFAULT '{}'::jsonb[],
    CONSTRAINT "Answers_pkey" PRIMARY KEY (answer_id)
);
-- ===========================   PHOTOS    ==============================
DROP TABLE IF EXISTS photos;
CREATE TABLE photos
(
    id serial,
    answer_id integer NOT NULL,
    url text,
    CONSTRAINT photos_pkey PRIMARY KEY (id)
);

-- ===========================   OTHER CONFIG   ==============================

/* Seed database */
\COPY questions FROM './docker-entrypoint-initdb.d/csv/questions.csv' DELIMITER ',' CSV HEADER;
\COPY answers FROM './docker-entrypoint-initdb.d/csv/new_answers.csv' DELIMITER ',' CSV HEADER;
\COPY photos from './docker-entrypoint-initdb.d/csv/answers_photos.csv' DELIMITER ',' CSV HEADER;

/* Update */
SELECT setval('questions_question_id_seq', (SELECT count(*) from questions), true); 
SELECT setval('answers_answer_id_seq', (SELECT count(*) from answers), true); 
SELECT setval('photos_id_seq', (SELECT count(*) from photos), true); 

/* Index */
CREATE INDEX on questions (product_id)
CREATE INDEX on answers (question_id)