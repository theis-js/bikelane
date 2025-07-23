# Bikelane

Bikelane is a full-stack web application for managing users and administration tasks for a bike lane system. It features a React-based admin panel, a user-facing frontend, and an Express.js backend with a MySQL database.

## Project Structure

```
. ├── backend/ # Express.js backend API
├── frontend_admin/ # React admin panel (Vite + Tailwind CSS)
├── frontend_user/ # React user frontend (Vite + Tailwind CSS)
├── scheme.sql # MySQL database schema and mock data
├── docker-compose.yml # Multi-container orchestration
└── README.md
```

## Features

- **Admin Panel:** Manage users, edit user data, and perform admin tasks.
- **User Frontend:** User-facing interface (work in progress).
- **Authentication:** JWT-based login for admins and users.
- **Theming:** Light/dark theme toggle in admin panel.
- **Dockerized:** Easy setup with Docker and Docker Compose.
- **MySQL Database:** User data storage and management.

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/) (for local development)

### Quick Start with Docker

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd bikelane
   ```
2. **Start all services:**
   ```sh
   docker-compose up --build
   ```
   Backend: http://localhost:5002
   Admin Frontend: http://localhost:5001
   User Frontend: http://localhost:5003
   MySQL: localhost:3307
3. **Database:**
    The schema and mock data are in scheme.sql.
    MySQL root password and DB credentials are set in docker-compose.yml and .env.

# Local Development
### Backend
1. **Navigate to the backend directory:**
   ```sh
    cd backend
    npm install
    npm start
   ```
   **Backend will run on http://localhost:5002**

### Admin Frontend
1. **Navigate to the admin frontend directory:**
   ```sh
   cd frontend_admin
   npm install
   npm run dev
   ```
   **Admin Frontend will run on http://localhost:5001**

### User Frontend
1. **Navigate to the user frontend directory:**
   ```sh
   cd frontend_user
   npm install
   npm run dev
   ```
   **User Frontend will run on http://localhost:5003**

## Usage
- **Admin Login:** Use credentials from the mock data in scheme.sql (e.g., username: test1, password: 1test).
- **User Management:** Add, edit, or delete users from the admin panel.
- **Theme Switch:** Toggle between light and dark mode in the admin panel.

## Technologies
- **Frontend:** React, Vite, Tailwind CSS, TypeScript
- **Backend:** Express.js, MySQL, JWT (jose)
- **DevOps:** Docker, Docker Compose

## Contributing
Contributions are welcome! Please fork the repo and submit a pull request.

## License
This project is licensed under the MIT License.

Repository: https://git.the1s.de/theis.gaedigk/bikelane