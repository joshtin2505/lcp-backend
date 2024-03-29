CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    last_name VARCHAR(60),
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,    
    phone INT,
    phone_prefix INT,
    role VARCHAR(20) DEFAULT 'user' NOT NULL CHECK (role IN ('masterAdmin', 'admin', 'user')),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);