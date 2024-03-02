DROP DATABASE IF EXISTS casitadepapel;
CREATE DATABASE casitadepapel;

\l

\c casitadepapel;

-- Create tables



INSERT INTO users (user_id, name, lastName, email, password, role)
VALUES (100, 'justin', 'castro p', 'justincastro2505@gmail.com', 'superAdmin', 'masterAdmin');


-- INSERT INTO users (name, email)
--     VALUES ('joe', 'joe@ibm.com'),
--     ('ryan', 'ryan@faztweb.com');

-- select * from users;