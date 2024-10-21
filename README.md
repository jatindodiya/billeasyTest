# billeasyTest

Test 1: Building a Customer API

    Objective: Implement an API endpoint that retrieves customer data based on specific filters (e.g., customer ID, date range, location).
    Requirements:
        The API should use Node.js and TypeScript.
        The candidate must implement middleware to validate the input (e.g., check if customer ID is a valid UUID format).
        Connect to a PostgreSQL database and write a query that efficiently retrieves and filters the data.
        Return a paginated response to manage performance.

Test Scenario 2: Middleware Implementation for JWT Authentication

    Objective: Create a middleware function that validates JWTs for user authentication before allowing access to certain API routes.
    Requirements:
        The middleware should extract the JWT from the Authorization header and validate it using a secret key.
        If the JWT is invalid or missing, the middleware should return a 401 status code with an appropriate error me


# API CURLs

User Register:

    curl --location 'http://localhost:3000/api/users/register' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "mobile": "1234567898",
        "email": "Test@gmail.com",
        "password": "password",
        "role": "admin"
    }'

User Login: 

    curl --location 'http://localhost:3000/api/users/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "test@gmail.com",
        "password": "password"
    }'

Add Customer:

    curl --location 'http://localhost:3000/api/data/addCustomer' \
    --header 'authorization: Bearer JWT-TOKEN-FROM-LOGIN' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "name": "Test customer",
        "mobile": "8956457812",
        "email": "rtest@test.com",
        "location": "Mumbai"
    }'

Get Data: 

    curl --location 'http://localhost:3000/api/data/getData?location=mumbai' \
    --header 'authorization: Bearer Token'

    curl --location 'http://localhost:3000/api/data/getData?customer_id='a8098c1a-f86e-11da-bd1a-00112444be1e' \
    --header 'authorization: Bearer Token'
