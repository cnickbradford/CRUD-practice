DROP TABLE IF EXISTS task;

CREATE TABLE task (
    id serial,
    name varchar(60),
    priority varchar(15),
    completed boolean default false
);
