CREATE TABLE address (
    address_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL, -- FOREIGN KEY

    country VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    street_address VARCHAR(200) NOT NULL,
    state VARCHAR(100),
    zip_code VARCHAR(20),

    -- address Foraneign Keys
    CONSTRAINT fk_address_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);
