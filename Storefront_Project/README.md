# Storefront Backend Project
## Getting Started
### This project contains a basic Node and Express app that interact with backend database for a storefront

## Used Technologies
Postgres for the database
Node/Express for the application logic
dotenv from npm for managing environment variables
db-migrate from npm for migrations
jsonwebtoken from npm for working with JWTs
jasmine from npm for testing

# Guidance
## To start the project:
1. Install Node at your machine
2. Check package.json and install all the libraries needed using nmp or yarn
3. Install psql postgres and connect to the database using cmd line \c DATABASE_NAME
4. Project is running on port 8000, to start the server run npm run start or npm run watch
5. Data port is running on 5432

    # Tips for creating a database using PSQL POSTGRES:
    1.	To login using default username (postgres) in cmd type  and use the password created at the installation.
    2.	Create data base using the command CREATE DATABASE database_name; it can be found in the pgadmin application which you login using the same password. It can be deleted or created or accessed from the app itself as well.

    3.	Use the command \l List databases
    4.	Use the command \c Connect to a database
    5.	Use the command \dt Display Tables in a database
    6.	Use the command \q Quit out of psql to normal terminal

    7.	Creating table using CREATE TABLE table_name (id SERIAL PRIMARY KEY, name VARCHAR(100), description test, individuals integer, sighting_date date);

    8.	CREATE INSERT INTO table_name (columns) VALUES (value in the columns); order of columns match the order of values
    9.	READ SELECT* FROM table_name;
    10.	UPDATE UPDATE table_name SET sighting_date = '2021-01-10' WHERE id='1';
    11.	DELETE DELETE FROM table_name WHERE id='1';

    12. SELECT * FROM table_name LIMIT 5; returns maximum 5 responses (as rows) even if table has 100 rows.
    13. SELECT name FROM table_name WHERE sighting_date BETWEEN '2021-01-01' AND '2021-01-31'; will return the names between these two dates 
    14. SELECT name, description FROM table_name WHERE name LIKE '%LION%'; return name, description of the content that has LION word in name;
    15. SELECT name, id FROM table_name WHERE sighting_date IS NULL; return the name, id of the values if null sighting_date OR you can use IS NOT NULL.