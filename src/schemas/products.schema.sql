CREATE TABLE products (
    product_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    category_id UUID, -- FOREIGN KEY
    price DECIMAL(10, 2),
    stock INT,
    img_url TEXT
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    created_by VARCHAR(30)
);

-- products Foraneign Keys
ALTER TABLE products
ADD CONSTRAINT "fk_category"
FOREIGN KEY (category_id)
REFERENCES products_categories(category_id)
ON UPDATE CASCADE
ON DELETE CASCADE;