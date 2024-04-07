CREATE TABLE products_categories (
    category_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    img_url TEXT,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);