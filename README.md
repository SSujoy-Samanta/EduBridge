## EduBridge_Project
A paltfrom where freshers and alumni can connect to each other

## TurboRepo Project with Docker

This project consists of a monorepo managed with TurboRepo, which contains three applications (Next.js and two Node.js apps) and a shared PostgreSQL database using Prisma. The project is partitioned into different Docker containers, and the services can be managed using Docker Compose.

## Project Structure

    .
    ├── apps
    │   ├── nextjs-app        # Next.js application
    │   ├── nodejs-app-1      # First Node.js application
    │   ├── nodejs-app-2      # Second Node.js application
    ├── packages
    │   └── db                # Prisma PostgreSQL database logic
    ├── docker-compose.yml    # Docker Compose file to run all apps
    └── ...

## Apps

Next.js App: A frontend web application.
Node.js App 1 & 2: Backend services.
Packages/db: Contains the Prisma database schema and logic shared by the applications.

## Requirements
Docker & Docker Compose installed on your machine
Node.js (if running locally)

## Setup

# Clone the Repository:
```bash
git clone https://github.com/SSujoy-Samanta/EduBridge.git
cd EduBridge
```

# Install Dependencies:
```bash
npm install
```
# Set Up Environment Variables:

# Example .env in the Root Folder (./.env):

    DATABASE_URL=postgres://user:password@db:5432/mydb
    NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Build Docker Images:

Each app has its own Dockerfile, and you can use Docker Compose to build them all together.
docker-compose build

# Run the Applications:

To start all services (Next.js, Node.js, and PostgreSQL), use:
docker-compose up

The apps will be available at the following locations:

    1.Next.js: http://localhost:3000
    2.Node.js App 1: http://localhost:8080
    3.Node.js App 2: http://localhost:3001

# Stopping the Services:

To stop all running containers, use:
```bash
docker-compose down
```

## Database
This project uses Prisma as an ORM to interact with the PostgreSQL database. The packages/db folder contains the Prisma schema and related database logic.

Running Migrations
If you need to run database migrations, use Prisma:
```bash
npx prisma migrate dev
```

You can also generate the Prisma Client with:

```bash
npx prisma generate
```

## Docker Details
Each app has a corresponding Dockerfile, and Docker Compose is used to manage the containers. Here’s how Docker is set up:

    Next.js App: Runs on port 3000
    Node.js App 1: Runs on port 4000
    Node.js App 2: Runs on port 5000
    PostgreSQL: A Dockerized PostgreSQL instance

# Commands Summary
    Build images: docker-compose build
    Start apps: docker-compose up
    Stop apps: docker-compose down
    Run Prisma migrations: npx prisma migrate dev
    Generate Prisma client: npx prisma generate
## License
This project is licensed under the MIT License.

    This version is cleaner and more organized, making it easier to follow and more professional. Let me know if you need further modifications!
