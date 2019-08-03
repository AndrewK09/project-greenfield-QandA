
DROP TABLE IF EXISTS "questions";
CREATE TABLE questions
(
    question_id SERIAL,
    product_id integer NOT NULL,
    question_body character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    question_date date DEFAULT CURRENT_DATE,
    asker_name character varying(60) COLLATE pg_catalog."default" NOT NULL,
    asker_email character varying(60) COLLATE pg_catalog."default" NOT NULL,
    reported integer DEFAULT 0,
    question_helpfulness integer DEFAULT 0,
    CONSTRAINT "Questions_pkey" PRIMARY KEY (question_id)
)
WITH (
    OIDS = FALSE
);

\COPY questions FROM 'csv/questions.csv' DELIMITER ',' CSV HEADER;
SELECT setval('questions_question_id_seq', (SELECT count(*) from questions), true); 

CREATE INDEX on questions (product_id) WHERE reported = 0;
-- ===========================   ANSWERS    ==============================

DROP TABLE IF EXISTS answers;
CREATE TABLE answers
(
    answer_id serial,
    question_id integer,
    body character varying(1000) COLLATE pg_catalog."default",
    date date DEFAULT CURRENT_DATE,
    answerer_name character varying(60) COLLATE pg_catalog."default",   
    answerer_email character varying(60) COLLATE pg_catalog."default",
    report integer DEFAULT 0,
    helpfulness integer DEFAULT 0,
    CONSTRAINT "Answers_pkey" PRIMARY KEY (answer_id)
)
WITH (
    OIDS = FALSE
);

\COPY  answers FROM 'csv/answers.csv' DELIMITER ',' CSV HEADER;
SELECT setval('answers_answer_id_seq', (SELECT count(*) from answers), true); 

ALTER TABLE answers
ADD COLUMN photos jsonb[] DEFAULT '{}'::jsonb[];

CREATE INDEX on answers (question_id) WHERE report = 0;
-- ===========================   PHOTOS    ==============================
/* DROP TABLE IF EXISTS photos;
CREATE TABLE photos
(
    id serial,
    answer_id integer NOT NULL,
    url text COLLATE pg_catalog."default",
    CONSTRAINT photos_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);

\COPY photos from 'csv/answers_photos.csv' DELIMITER ',' CSV HEADER;

SELECT setval('photos_id_seq', (SELECT count(*) from photos), true);  */
