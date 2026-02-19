# 📋 Task List API - Full-Stack Integration Demo

A robust RESTful API designed to manage an IT team's task list. This project demonstrates a **Full-Stack Integration** workflow, combining a typed Node.js backend with a relational database, fully containerized using Docker, and documented with OpenAPI.

## 🚀 Key Features

*   **Production-Ready Architecture**: Built with **TypeScript** using the **MVC pattern** (Models, Views/JSON, Controllers) for clean separation of concerns.
*   **Database Integration**: Uses **PostgreSQL** with raw SQL queries (parameterized for security) to demonstrate deep understanding of database interactions.
*   **Containerization**: Fully Dockerized (API + Database) with `docker-compose` for one-command setup.
*   **Security First**:
    *   **API Key Authentication** (Custom Middleware).
    *   **Helmet** for secure HTTP headers.
    *   **CORS** configuration.
    *   **SQL Injection Protection** via parameterized queries.
*   **Documentation**: Interactive API documentation using **OpenAPI (Swagger UI)**.
*   **Quality Assurance**: Integration tests implemented with **Jest** and **Supertest**.

## 🛠️ Tech Stack

*   **Runtime**: Node.js
*   **Language**: TypeScript
*   **Framework**: Express.js
*   **Database**: PostgreSQL (pg driver)
*   **DevOps**: Docker, Docker Compose
*   **Testing**: Jest, Supertest
*   **Docs**: OpenAPI 3.0, Swagger UI
*   **Utils**: Dotenv, Nodemon, Helmet

## ⚙️ Prerequisites

*   **Docker Desktop** (installed and running)
*   **Node.js** (optional, for local development without Docker)

## 🏃‍♂️ How to Run

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd TaskAPI
```

### 2. Environment Setup
The project comes with a default configuration. Create a `.env` file (or use the existing one) with the following content:

```env
PORT=3000
# Note: In Docker, we use the service name 'db' as the hostname
DATABASE_URL=postgres://user:password@db:5432/taskdb
API_KEY=moj-tajny-klucz-api-123
```

### 3. Run with Docker Compose
This command will build the API image, start the Postgres database, and launch the application.

```bash
docker-compose up --build
```

The API will be available at `http://localhost:3000`.

---

## 📖 API Documentation

Once the server is running, you can access the interactive **Swagger UI** documentation at:

👉 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

*Note: Use the "Authorize" button in Swagger and enter your `API_KEY` to test secured endpoints.*

### Example Endpoints:

| Method | Endpoint      | Description           | Auth Required |
|:-------|:--------------|:----------------------|:-------------:|
| `GET`  | `/api-docs`   | Swagger Documentation | ❌ No |
| `GET`  | `/db-test`    | Database Connection Check | ❌ No |
| `GET`  | `/tasks`      | Get all tasks         | ✅ Yes |
| `POST` | `/tasks`      | Create a new task     | ✅ Yes |
| `PUT`  | `/tasks/:id`  | Update task details   | ✅ Yes |
| `DELETE`| `/tasks/:id` | Remove a task         | ✅ Yes |

---

## 🧪 Running Tests

Integration tests cover the main user flows (Create, Read, Delete, Auth checks).
To run them locally (requires Node.js installed):

```bash
# 1. Install dependencies
npm install

# 2. Run tests
npm test
```

*Note: Tests connect to the database via port 5433 (mapped in docker-compose) to avoid conflicts with local Postgres instances.*

---

## 📂 Project Structure

```text
src/
├── controllers/    # Request handling logic (input validation, response formatting)
├── middleware/     # Custom middlewares (Authentication, Error handling)
├── models/         # Database interaction (SQL queries)
├── routes/         # Route definitions maps URLs to Controllers
├── tests/          # Integration tests (Jest + Supertest)
├── types.ts        # TypeScript interfaces
├── db.ts           # Database connection pool setup
├── app.ts          # Express app configuration
└── index.ts        # Server entry point
```
