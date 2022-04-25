# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints
### Products
- Index [using GET request http://localhost:8000/products]
- Show  [using GET request show item with id http://localhost:8000/products/:id] (e.g. http://localhost:8000/products/1)]
- Create [using POST request http://localhost:8000/products]
- Delete [using DELETE request delete item with id http://localhost:8000/products/:id] (e.g. http://localhost:8000/products/1)]

### Users
- Index [token required] [using GET request with token in authorization as bearer http://localhost:8000/users]
- Show [token required] [using GET request with token in authorization as bearer http://localhost:8000/users/:id]
- Create N[token required] [using POST request with userinfo sent as json http://localhost:8000/users]

### Orders
- Current Order by user (args: user id)[token required] [using GET request http://localhost:8000/orders/:id]

# Database Schema
## Tables:
- products
- users
- orders
- order_products

## Columns with ther types
### Product
- id as string
- name as string
- price as string
- category as string

### User
- id as number
- firstName as string
- lastName as string
- email as string
- password as string

### Orders
- id as string
- user_id as string
- status as string

### Order_products
- id as SERIAL PRIMARY KEY
- quantity as string
- order_id as bigint REFERENCES orders(id)
- product_id as bigint REFERENCES products(id)