### Updated API Documentation for Billing Software MERN Application

#### Base URL: `/api/v1`

### Authentication Routes

#### Register User
- **Endpoint**: `/auth/register`
- **Method**: `POST`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string",
    "name": "string",
    "token": "string"
  }
  ```
- **Response**:
  ```json
  {
    "msg": "User Register Successfully",
    "token": "string"
  }
  ```

#### Login User
- **Endpoint**: `/auth/login`
- **Method**: `POST`
- **Description**: Logs in a user.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string",
    "token": "string"
  }
  ```
- **Response**:
  ```json
  {
    "msg": "User Login Successfully",
    "token": "string"
  }
  ```

#### User Profile
- **Endpoint**: `/auth/profile`
- **Method**: `GET`
- **Description**: Retrieves the logged-in user's profile.
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "msg": "Data fetched",
    "user": {
      "name": "string",
      "email": "string"
    }
  }
  ```

### Consumer Routes

#### Get All Consumers
- **Endpoint**: `/consumer/get-all`
- **Method**: `GET`
- **Description**: Retrieves all consumers with pagination.
- **Headers**: `Authorization: Bearer <token>`
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `query`: Search query (default: "")
- **Response**:
  ```json
  {
    "users": [
      {
        "name": "string",
        "email": "string",
        "mobile": "string"
      }
    ],
    "more": "boolean"
  }
  ```

#### Search Consumers
- **Endpoint**: `/consumer/get-search`
- **Method**: `GET`
- **Description**: Searches for consumers.
- **Headers**: `Authorization: Bearer <token>`
- **Response**: List of consumers matching search criteria.

#### Register Consumer
- **Endpoint**: `/consumer/register`
- **Method**: `POST`
- **Description**: Registers a new consumer.
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "mobile": "string",
    "dob": "string",
    "address": "string"
  }
  ```
- **Response**:
  ```json
  {
    "msg": "Consumer Added :)"
  }
  ```

#### Delete Consumer
- **Endpoint**: `/consumer/delete/:id`
- **Method**: `DELETE`
- **Description**: Deletes a consumer by ID.
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "msg": "Consumer Deleted :)"
  }
  ```

#### Consumer Dashboard
- **Endpoint**: `/consumer/dashboard`
- **Method**: `GET`
- **Description**: Retrieves consumer dashboard data.
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "consumers": "number",
    "orders": "number",
    "sell": "number"
  }
  ```

#### Get Consumer by ID
- **Endpoint**: `/consumer/get/:id`
- **Method**: `GET`
- **Description**: Retrieves a consumer by ID.
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "user": {
      "name": "string",
      "email": "string",
      "mobile": "string",
      "dob": "string",
      "address": "string"
    }
  }
  ```

#### Update Consumer by ID
- **Endpoint**: `/consumer/update/:id`
- **Method**: `PATCH`
- **Description**: Updates a consumer by ID.
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "mobile": "string",
    "dob": "string",
    "address": "string"
  }
  ```
- **Response**:
  ```json
  {
    "msg": "Consumer Updated :)"
  }
  ```

### Orders Routes

#### Create Order
- **Endpoint**: `/orders/create-order`
- **Method**: `POST`
- **Description**: Creates a new order.
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "consumerId": "string",
    "items": [
      {
        "itemId": "string",
        "quantity": "number"
      }
    ]
  }
  ```
- **Response**:
  ```json
  {
    "msg": "Order Created Successfully"
  }
  ```

#### Get All Orders
- **Endpoint**: `/orders/get-orders`
- **Method**: `GET`
- **Description**: Retrieves all orders.
- **Headers**: `Authorization: Bearer <token>`
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `query`: Search query (default: "")
- **Response**:
  ```json
  {
    "data": [
      {
        "consumer": {
          "name": "string",
          "email": "string"
        },
        "items": [
          {
            "item_name": "string",
            "quantity": "number"
          }
        ],
        "createdAt": "date"
      }
    ],
    "hasMore": "boolean"
  }
  ```

#### Get Invoice by ID
- **Endpoint**: `/orders/get-invoice/:id`
- **Method**: `GET`
- **Description**: Retrieves invoice details by order ID.
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "consumer": {
      "name": "string",
      "email": "string",
      "address": "string"
    },
    "user": {
      "name": "string"
    },
    "items": [
      {
        "item_name": "string",
        "quantity": "number",
        "price": "number"
      }
    ],
    "createdAt": "date"
  }
  ```

#### Delete Order by ID
- **Endpoint**: `/orders/delete/:id`
- **Method**: `DELETE`
- **Description**: Deletes an order by ID.
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "msg": "Order Deleted Successfully"
  }
  ```

### Items Routes

#### Create Item
- **Endpoint**: `/items/create-item`
- **Method**: `POST`
- **Description**: Creates a new item.
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "item_name": "string",
    "quantity": "number",
    "about": "string",
    "inStock": "boolean",
    "price": "number"
  }
  ```
- **Response**:
  ```json
  {
    "msg": "Item Created Successfully"
  }
  ```

#### Get All Items
- **Endpoint**: `/items/get-items`
- **Method**: `GET`
- **Description**: Retrieves all items.
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "items": [
      {
        "item_name": "string",
        "price": "number"
      }
    ]
  }
  ```

#### Get Item by ID
- **Endpoint**: `/items/get/:id`
- **Method**: `GET`
- **Description**: Retrieves an item by ID.
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "item": {
      "item_name": "string",
      "quantity": "number",
      "about": "string",
      "inStock": "boolean",
      "price": "number"
    }
  }
  ```

#### Update Item by ID
- **Endpoint**: `/items/update/:id`
- **Method**: `PATCH`
- **Description**: Updates an item by ID.
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "item_name": "string",
    "price": "number"
  }
  ```
- **Response**:
  ```json
  {
    "msg": "Item Updated :)"
  }
  ```

### Payment Routes

#### Create Checkout Session
- **Endpoint**: `/pay/create-checkout-session`
- **Method**: `POST`
- **Description**: Creates a new checkout session.
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "products": [
      {
        "item_name": "string",
        "price": "

number",
        "quantity": "number"
      }
    ],
    "orderId": "string"
  }
  ```
- **Response**:
  ```json
  {
    "url": "string"
  }
  ```

#### Update Payment Status
- **Endpoint**: `/pay/update-payment`
- **Method**: `POST`
- **Description**: Updates the payment status for an order.
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "orderId": "string",
    "status": "string"
  }
  ```
- **Response**:
  ```json
  {
    "msg": "Payment status updated"
  }
  ```
## Payment Status and Transaction Records

In our billing software, we handle payment status updates and transaction records using Stripe webhooks. When a payment is successfully processed, Stripe sends a webhook notification to our server. We use this webhook to update the payment status and store transaction details in our database.

1. **Webhook Endpoint**:
   - **Path**: `/webhook`
   - **Method**: POST
   - **Content-Type**: `application/json`
   - **Purpose**: To receive webhook events from Stripe.

2. **Handling the Webhook**:
   - The `stripe.webhooks.constructEvent` function verifies the authenticity of the webhook request using the endpoint secret.
   - If the verification is successful, we handle the `checkout.session.completed` event type.
   - The `createOrder` function is invoked to:
     - Create a new transaction record in the database.
     - Update the associated order with the payment status and transaction ID.

3. **Transaction Model**:
   - Stores information about the payment including user ID, session ID, amount, currency, and payment status.

4. **Order Model**:
   - Updates the order with a completed payment status and associates it with the transaction record.

### Additional Information

- **Authentication**: Most endpoints require a Bearer token in the headers for authorization.
- **Error Handling**: Standard error response includes a message and status code.
- **Pagination**: Common for list endpoints to support pagination via query parameters.

