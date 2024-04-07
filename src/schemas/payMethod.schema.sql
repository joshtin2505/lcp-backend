CREATE TABLE paymethod (
    paymethod_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    method_name VARCHAR(100),
    user_id UUID, -- FOREIGN KEY
    cart_number VARCHAR(16),
    expiration_date DATE,
    cvv INT,
    cart_type VARCHAR(20),
    issuing_bank VARCHAR(100),
    issuing_country VARCHAR(100),
    cart_status VARCHAR(20),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Paymethod Foraneign Keys
ALTER TABLE paymethod
ADD CONSTRAINT "fk_user"
FOREIGN KEY (user_id)
REFERENCES users(user_id)
ON UPDATE CASCADE
ON DELETE CASCADE;
