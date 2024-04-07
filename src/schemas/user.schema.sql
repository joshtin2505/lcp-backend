CREATE TABLE usuario (
    user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    last_name VARCHAR(60),
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,    
    phone INT,
    phone_prefix INT,
    role VARCHAR(20) DEFAULT 'client' NOT NULL CHECK (role IN ('masterAdmin', 'admin', 'client')),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);