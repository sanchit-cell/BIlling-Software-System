
# Deployed Application
The application is deployed on a cloud platform and can be accessed at the following link:
[Deployed Site](https://billing-software-0owd.onrender.com/)

## Docker Configuration for Local Development

### Prerequisites
- Ensure Docker and Docker Compose are installed on your system.

### Steps

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```

2. **Set the environment variable:**
   Ensure the `NODE_ENV` in your backend is set to `development`.

3. **Build Docker images:**
   You can build both the backend and frontend images using a single command in the project directory:
   ```bash
   make build
   ```

   Alternatively, you can build them individually by navigating to the specific directory and running:
   ```bash
   cd backend
   make build
   cd ../frontend
   make build
   ```

4. **Run Docker containers:**
   After building the images, run the following command to start the containers:
   ```bash
   make run
   ```

