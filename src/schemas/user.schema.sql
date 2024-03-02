CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    lastName VARCHAR(60),
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,    
    phone INT,
    phonePrefix INT,
    role VARCHAR(20) DEFAULT 'user' NOT NULL CHECK (role IN ('masterAdmin', 'admin', 'user')),
    preferens JSON DEFAULT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);