DROP DATABASE IF EXISTS casitadepapel;
CREATE DATABASE casitadepapel;

\l

\c casitadepapel;

-- Create tables

INSERT INTO usuario (name, last_name, email, password, role)
VALUES ('justin', 'castro p', 'justincastro2505@gmail.com', 'joshtin2505', 'masterAdmin');
