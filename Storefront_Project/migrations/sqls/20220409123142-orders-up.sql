CREATE TABLE orders (
    id SERIAL PRIMARY KEY, 
    user_id bigint REFERENCES users(id), 
    orderstatus VARCHAR(64)
    );