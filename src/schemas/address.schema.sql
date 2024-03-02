CREATE TABLE address (
    address_id SERIAL PRIMARY KEY,
    user_id SERIAL, -- FOREIGN KEY
    country VARCHAR(100),
    city VARCHAR(100),
    address VARCHAR(150),
    state VARCHAR(100),
    zip_code INT
);
-- address Foraneign Keys
ALTER TABLE address
ADD CONSTRAINT "fk_user"
FOREIGN KEY (user_id)
REFERENCES users(user_id)
ON UPDATE CASCADE
ON DELETE CASCADE; 
