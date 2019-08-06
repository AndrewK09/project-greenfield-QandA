FROM postgres:11.1-alpine

COPY schema.sql /docker-entrypoint.initdb.d/

ENV POSTGRES_USER=root
ENV POSTGRES_PASSWORD=test
ENV POSTGRES_DB=question_answers

ENV PGDATA=/data