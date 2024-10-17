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

