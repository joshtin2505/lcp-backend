CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    category_id SERIAL, -- FOREIGN KEY
    price DECIMAL(10, 2),
    stock INT,
    img_url TEXT
);