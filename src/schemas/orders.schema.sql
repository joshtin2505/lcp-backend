
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
