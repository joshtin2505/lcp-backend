CREATE DATABASE casitadepapel;

\l

\c casitadepapel;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    lastName VARCHAR(60),
    email TEXT,
    password TEXT,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    direccion TEXT Not Null,
    telefono TEXT,
    rol ENUM('admin', 'user') DEFAULT 'user',
    preferencias JSON,
    cart_id SERIAL, -- FOREIGN KEY
    orders_id SERIAL -- FOREIGN KEY
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    tags TEXT[],
    price DECIMAL(10, 2),
    stock INT,
    img_url TEXT,
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
    user_id SERIAL -- FOREIGN KEY,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Users Foraneign Keys
ALTER TABLE users
ADD CONSTRAINT fk_cart
FOREIGN KEY (cart_id)
REFERENCES cart(cart_id);

ALTER TABLE users
ADD CONSTRAINT fk_orders
FOREIGN KEY (orders_id)
REFERENCES orders(order_id);

-- Cart Foraneign Keys
ALTER TABLE cart
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id)
REFERENCES users(user_id);

-- productsInCart Foraneign Keys
ALTER TABLE productsInCart
ADD CONSTRAINT fk_cart
FOREIGN KEY (cart_id) 
REFERENCES cart(cart_id);

ALTER TABLE productsInCart
ADD CONSTRAINT fk_product
FOREIGN KEY (product_id) 
REFERENCES products(product_id);

-- Orders Foraneign Keys
ALTER TABLE orders
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id)
REFERENCES users(user_id);

ALTER TABLE orders
ADD CONSTRAINT fk_paymethod
FOREIGN KEY (paymethod_id)
REFERENCES paymethod(paymethod_id);

-- productsInOrder Foraneign Keys
ALTER TABLE productsInOrder
ADD CONSTRAINT fk_order
FOREIGN KEY (order_id)
REFERENCES orders(order_id);

ALTER TABLE productsInOrder
ADD CONSTRAINT fk_product
FOREIGN KEY (product_id)
REFERENCES products(product_id);

-- Paymethod Foraneign Keys
ALTER TABLE paymethod
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id)
REFERENCES users(user_id);


-- INSERT INTO users (name, email, password, rol)

-- INSERT INTO users (name, email)
--     VALUES ('joe', 'joe@ibm.com'),
--     ('ryan', 'ryan@faztweb.com');

-- select * from users;