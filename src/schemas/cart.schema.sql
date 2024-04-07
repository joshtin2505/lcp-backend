CREATE TABLE cart (
    cart_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID, -- FOREIGN KEY
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cart_items (
    cart_item_id SERIAL PRIMARY KEY,
    cart_id UUID, -- FOREIGN KEY
    product_id UUID, -- FOREIGN KEY 
    quantity INT
);

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
