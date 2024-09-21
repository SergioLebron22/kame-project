CREATE DATABASE kame;

\c kame -- connect to database and for listing \l

CREATE TABLE icd10 (
    code VARCHAR(50) PRIMARY KEY,
    description TEXT
);
