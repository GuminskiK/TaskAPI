# 📋 Task List API - Full-Stack Integration Demo

A robust RESTful API designed to manage an IT team's task list. This project demonstrates a **Full-Stack Integration** workflow, combining a typed Node.js backend with a relational database, fully containerized using Docker, and orchestrated with **Kubernetes**.

## 🚀 Key Features

* **Production-Ready Architecture**: Built with **TypeScript** using the **MVC pattern** for clean separation of concerns.
* **Database Integration**: Uses **PostgreSQL** with raw SQL queries to demonstrate deep understanding of database interactions.
* **Orchestration & DevOps**:
    * **Kubernetes (K8s)**: Advanced manifests featuring **Init Containers** for dependency management and **Liveness Probes** for self-healing.
    * **Docker Compose**: Streamlined setup for local development.
* **Security First**:
    * **API Key Authentication** (Custom Middleware).
    * **Helmet** for secure HTTP headers.
    * **SQL Injection Protection** via parameterized queries.
* **Documentation**: Interactive API documentation using **OpenAPI (Swagger UI)**.

## 🛠️ Tech Stack

* **Runtime/Language**: Node.js, TypeScript
* **Framework**: Express.js
* **Database**: PostgreSQL (pg driver)
* **DevOps**: Kubernetes, Docker, WSL 2
* **Testing**: Jest, Supertest
* **Docs**: OpenAPI 3.0, Swagger UI

## ⚙️ Prerequisites

* **Docker Desktop** with **Kubernetes** enabled.
* **kubectl** CLI.
* **Node.js** (optional, for running tests locally).

## 🏃‍♂️ How to Run

### Option A: Kubernetes (Cloud-Native Way)
This method uses an **Init Container** to ensure the API only starts after the database is fully ready to accept connections.

1. **Build the local image**:
   docker build -t taskapi:latest .

2. **Apply manifests**:
   kubectl apply -f k8s.yaml

3. **Check deployment status**:
   kubectl get pods

4. **Access the API**:
   Find the assigned NodePort:
   kubectl get service task-api-service
   The API will be available at http://localhost:<NODE_PORT>.

### Option B: Docker Compose (Quick Start)
docker-compose up --build
The API will be available at http://localhost:3000.

---

## ☸️ Kubernetes Deep Dive

The k8s.yaml manifest implements professional DevOps patterns:
* **StatefulSet**: Used for PostgreSQL to ensure data persistence and stable network identity.
* **Init Container**: A busybox script that "pings" the database port before the main application starts, preventing ECONNREFUSED errors.
* **Liveness Probe**: Monitors the application's health and automatically restarts the container if the process hangs.
* **Secrets Management**: Decouples sensitive database credentials from the deployment configuration.

---

## 📖 API Documentation

Once the server is running, access the interactive **Swagger UI** at:

👉 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

*Note: Use the "Authorize" button and enter your API_KEY (default: moj-tajny-klucz-api-123) to test secured endpoints.*

### Endpoints:

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

npm install
npm test

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
