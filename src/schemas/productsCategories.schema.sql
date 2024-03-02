CREATE TABLE products_categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    img_url TEXT,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);