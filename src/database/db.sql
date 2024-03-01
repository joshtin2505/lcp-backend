DROP DATABASE IF EXISTS casitadepapel;
CREATE DATABASE casitadepapel;

\l

\c casitadepapel;

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

CREATE TABLE address (
    address_id SERIAL PRIMARY KEY,
    user_id SERIAL, -- FOREIGN KEY
    country VARCHAR(100),
    city VARCHAR(100),
    address VARCHAR(150),
    state VARCHAR(100),
    zip_code INT
);

CREATE TABLE products_categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    img_url TEXT,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    category_id SERIAL, -- FOREIGN KEY
    price DECIMAL(10, 2),
    stock INT,
    img_url TEXT
);

CREATE TABLE cart (
    cart_id SERIAL PRIMARY KEY,
    user_id SERIAL, -- FOREIGN KEY
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE productsInCart (
    cart_item_id SERIAL PRIMARY KEY,
    cart_id SERIAL, -- FOREIGN KEY
    product_id SERIAL, -- FOREIGN KEY 
    quantity INT
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY, 
    user_id INT, -- FOREIGN KEY
    paymethod_id SERIAL, -- FOREIGN KEY
    products JSON,
    total DECIMAL(10, 2),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE productsInOrder (
    order_item_id SERIAL PRIMARY KEY,
    order_id SERIAL, -- FOREIGN KEY
    product_id SERIAL, -- FOREIGN KEY
    purchase_price DECIMAL(10, 2),
    quantity INT
);
CREATE TABLE paymethod (
    paymethod_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    user_id SERIAL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- address Foraneign Keys
ALTER TABLE address
ADD CONSTRAINT "fk_user"
FOREIGN KEY (user_id)
REFERENCES users(user_id)
ON UPDATE CASCADE
ON DELETE CASCADE; 
-- Cart Foraneign Keys
ALTER TABLE cart
ADD CONSTRAINT "fk_user"
FOREIGN KEY (user_id)
REFERENCES users(user_id)
ON UPDATE CASCADE
ON DELETE CASCADE;

-- productsInCart Foraneign Keys
ALTER TABLE productsInCart
ADD CONSTRAINT "fk_cart"
FOREIGN KEY (cart_id) 
REFERENCES cart(cart_id)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE productsInCart
ADD CONSTRAINT "fk_product"
FOREIGN KEY (product_id) 
REFERENCES products(product_id)
ON UPDATE CASCADE
ON DELETE CASCADE;

-- Orders Foraneign Keys
ALTER TABLE orders
ADD CONSTRAINT "fk_user"
FOREIGN KEY (user_id)
REFERENCES users(user_id)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE orders
ADD CONSTRAINT "fk_paymethod"
FOREIGN KEY (paymethod_id)
REFERENCES paymethod(paymethod_id)
ON UPDATE CASCADE
ON DELETE CASCADE;

-- productsInOrder Foraneign Keys
ALTER TABLE productsInOrder
ADD CONSTRAINT "fk_order"
FOREIGN KEY (order_id)
REFERENCES orders(order_id)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE productsInOrder
ADD CONSTRAINT "fk_product"
FOREIGN KEY (product_id)
REFERENCES products(product_id)
ON UPDATE CASCADE
ON DELETE CASCADE;

-- Paymethod Foraneign Keys
ALTER TABLE paymethod
ADD CONSTRAINT "fk_user"
FOREIGN KEY (user_id)
REFERENCES users(user_id)
ON UPDATE CASCADE
ON DELETE CASCADE;


INSERT INTO users (user_id, name, lastName, email, password, role)
VALUES (100, 'justin', 'castro p', 'justincastro2505@gmail.com', 'superAdmin', 'masterAdmin');


-- INSERT INTO users (name, email)
--     VALUES ('joe', 'joe@ibm.com'),
--     ('ryan', 'ryan@faztweb.com');

-- select * from users;