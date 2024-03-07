DROP DATABASE IF EXISTS casitadepapel;
CREATE DATABASE casitadepapel;

\l

\c casitadepapel;

-- Create tables

INSERT INTO users (user_id, name, last_name, email, password, role)
VALUES (1, 'justin', 'castro p', 'justincastro2505@gmail.com', 'superAdmin', 'masterAdmin');
