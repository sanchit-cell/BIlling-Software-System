# Project Setup and Usage Instructions

## Prerequisites

- Ensure you have `git`, `Node.js`, `npm`, and `docker` installed on your machine.

## Setup Instructions

### 1. Clone the Repository

First, clone the Git repository:

```bash
git clone <your-repo-url>
cd <your-repo-directory>
```

### 2. Install Dependencies

#### Frontend

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

#### Backend

Navigate to the backend directory and install dependencies:

```bash
cd ../backend
npm install
```

### 3. Seed the Database

first make sure the NODE_ENV in backend is set to deployment,then
In the backend directory, seed the database:

```bash
cd ../backend
node migration.js
node seed.js
```

### 4. Start the Backend Server

Start the backend server:

```bash
npm start
```

The server will start and listen on `http://localhost:8000`.

### 5. Start the Frontend Server

Navigate to the frontend directory and start the frontend server:

```bash
cd ../frontend
npm run dev
```

Open your browser and navigate to `http://localhost:5173` to see the application.

## Running the Project Using Makefile

You can also run the project using the `Makefile` for building and running Docker containers.

### Build the Docker Images

To build the Docker images, run:

```bash
make build
```

This command will:

- Build the backend Docker image.
- Build the frontend Docker image.

### Run the Docker Containers

To start the application using Docker Compose, run:

```bash
make run
```

This command will:

- Start all the Docker containers defined in `docker-compose.yml`.

## Usage

1. **Register a Consumer:**
   - Navigate to the `Users` page.
   - Register a new consumer.

2. **Add an Order:**
   - Navigate to the `Orders` page.
   - Add an order and associate it with a registered consumer.
   - Add items to the order.

3. **Process Payment:**
   - Click on the `Checkout` button on the order card.
   - This will generate a bill and proceed with payment processing.

4. **Manage Inventory:**
   - Navigate to the `Inventory` page.
   - Add, update, or search for items in your inventory.

5. **View and Manage Orders:**
   - On the `Orders` page, you can view, add, update, or delete orders.

## Troubleshooting

- If you encounter issues with database connection, ensure your `migration.js` and `seed.js` files are correctly configured.
- For frontend issues, check the console for errors and ensure all dependencies are installed correctly.
