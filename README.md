# 🌍 VolunteerOS

> A full-stack platform that connects volunteers with organizations and supports onboarding, project management, participation, profiles, skills, and moderation.

![Java 21](https://img.shields.io/badge/Java-21-E76F00?logo=openjdk&logoColor=white)
![Spring Boot 4.1](https://img.shields.io/badge/Spring_Boot-4.1-6DB33F?logo=springboot&logoColor=white)
![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
[![Redux](https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=white)](https://redux.js.org/)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?logo=reactquery&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?logo=googlegemini&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![QA automation](https://img.shields.io/badge/QA-automated-7B61FF)

**[Open the application](https://euphonious-cajeta-428baa.netlify.app)** · **[Login](https://euphonious-cajeta-428baa.netlify.app/auth/login)** · **[QA hub](qa/README.md)** · **[Test summary](qa/docs/TEST_SUMMARY.md)** · **[API reference](#api-reference)**

## 🎯 Project at a glance

| Product | Backend | Quality engineering |
| --- | --- | --- |
| 3 role-based user journeys | 37 REST/SSE routes | Postman smoke and regression |
| 5 implemented MVP modules | JWT in secure HttpOnly cookies | REST Assured API automation |
| Organization and project moderation | PostgreSQL, Liquibase, Redis | Selenium GUI smoke |
| Deployed React frontend | Gemini moderation integration | JMeter baseline and SQL checks |

## 🧭 Contents

- [Product scope](#product-scope)
- [Technology stack](#technology-stack)
- [Architecture](#architecture)
- [Quality engineering](#quality-engineering)
- [Repository structure](#repository-structure)
- [Local setup](#local-setup)
- [API reference](#api-reference)
- [Security notes](#security-notes)

## 🧩 Product scope

The current MVP supports three roles:

- `ROLE_VOLUNTEER` — browse active projects, apply or withdraw, and manage profile and skills
- `ROLE_ORGANIZATION` — submit an onboarding application, manage an approved organization and its projects, and review applicants
- `ROLE_ADMIN` — review organization applications, moderate project content, and manage project status

Implemented MVP modules:

- 100 — Identity and Access
- 200 — Organization Onboarding
- 300 — Organization Project Management
- 400 — Volunteer Participation
- 500 — Administration and Moderation

Task Coordination (module 600) is not included in the current version.

### Main business flows

- registration, login, token refresh, logout, and role-based access
- viewing and editing the current user profile
- volunteer skills creation, editing, listing, and removal
- organization onboarding application and administrator review
- organization and project creation and editing
- project activation, completion, cancellation, and removal
- volunteer application and withdrawal
- organization review of project applicants
- administrator organization and content moderation

### Current frontend areas

- public landing page
- login and signup
- protected dashboard and profile
- volunteer project browser, own projects, and skills
- organization page, project creation, and participants
- administrator organizations, projects, and moderation

## 🛠️ Technology stack

### Backend

- Java 21
- Spring Boot 4.1
- Spring Security and JWT stored in HttpOnly cookies
- Spring Data JPA and Hibernate
- PostgreSQL and Liquibase
- Redis
- Spring AI with Google Gemini
- Maven
- OpenAPI/Swagger

### Frontend

- React 19 and TypeScript
- Vite
- React Router
- Redux Toolkit
- TanStack Query
- Material UI
- Formik and Yup

## 🏗️ Architecture

```text
React + Vite Frontend
(Netlify)
        │
        │ HTTPS
        ▼
Nginx Reverse Proxy
(Hetzner VPS, Docker)
        │
        ▼
Spring Boot REST API
        ├── PostgreSQL + Liquibase
        ├── Redis
        └── Google Gemini Moderation Integration
```

Core persisted entities include Account/User, UserProfile, UserRole, Organization, OrganizationApplication, OrganizationMember, Project, ProjectParticipation, Skill, ContentItem, and ModerationCase.

### Engineering highlights

| Area | Implementation |
| --- | --- |
| Authentication | JWT access and refresh tokens in secure HttpOnly cookies |
| Authorization | Role-based access for Volunteer, Organization, and Admin |
| Data management | PostgreSQL schema versioned with Liquibase migrations |
| Moderation | Organization onboarding, project review, moderation cases, and admin SSE notifications |
| External integration | Spring AI integration with Google Gemini for moderation |
| Delivery | Netlify frontend, GitHub Actions API gate, and Jenkins parameterized regression |

## 🧪 Quality engineering

| Layer | Coverage and tooling | Repository evidence |
| --- | --- | --- |
| Requirements and manual testing | User stories, requirements, checklists, test cases, test data, and coverage matrix | Shared Google Sheets |
| API smoke gate | Short Postman/Newman collection executed by GitHub Actions | [Workflow](.github/workflows/api-smoke.yml) · [Smoke collection](postman/MARS_VolunteerOS_API_Smoke.postman_collection.json) |
| API regression and E2E | Parameterized Postman scenarios executed with selectable scope in Jenkins | [Jenkinsfile](Jenkinsfile) · [Regression collection](postman/MARS_VolunteerOS_Regression.postman_collection.json) |
| API automation | REST Assured, JUnit 5, Maven, and Allure | [`qa/API`](qa/API) |
| Browser smoke | Five Selenium WebDriver checks | [`qa/GUI`](qa/GUI) |
| Performance baseline | Authenticated JMeter scenario at 5, 25, 100, 250, and 500 virtual users | [Performance report](qa/performance/PERFORMANCE_TEST_REPORT.md) |
| Database checks | PostgreSQL queries run in Beekeeper Studio | [Database checks](qa/database/db_checks.sql) |
| Reports and defects | Allure reports and GitHub Issues | [Issues](https://github.com/upteam-edu/67-mars/issues) · [Test summary](qa/docs/TEST_SUMMARY.md) |

Run instructions and documentation links are available in the [QA README](qa/README.md). Test results are recorded in the [Test Summary](qa/docs/TEST_SUMMARY.md).

## 📁 Repository structure

```text
volunteeros/
├── backend/volunteeros/     Spring Boot application
├── frontend/volunteeros/    React application
├── LICENSE
└── README.md
```

## ⚙️ Local setup

### Prerequisites

- Java 21
- Docker Desktop
- Git

### 1. Start PostgreSQL and Redis

Create the containers once:

```bash
docker run --name volunteeros-postgres \
  -e POSTGRES_DB=volunteeros_db_dev \
  -e POSTGRES_USER=volunteer \
  -e POSTGRES_PASSWORD=volunteer_password \
  -p 5432:5432 \
  -d postgres:16

docker run --name volunteeros-redis \
  -p 6379:6379 \
  -d redis:7
```

For later runs, start the existing containers:

```bash
docker start volunteeros-postgres volunteeros-redis
```

### 2. Start the backend

From the repository root:

```bash
cd backend/volunteeros

export SPRING_PROFILES_ACTIVE=dev
export DB_PASSWORD=volunteer_password
export JWT_ACCESS_SECRET="$(openssl rand -base64 48)"
export JWT_REFRESH_SECRET="$(openssl rand -base64 48)"
export ACCESS_EXPIRATION=900000
export REFRESH_EXPIRATION=604800000
export AI_API=local-test-placeholder

chmod +x mvnw
./mvnw spring-boot:run
```

The backend starts on `http://localhost:8080`. Liquibase applies the database migrations automatically.

Swagger UI is available at:

```text
http://localhost:8080/swagger-ui/index.html
```

A valid `AI_API` key is required for AI moderation.

### 3. Start the frontend

In a second terminal:

```bash
cd frontend/volunteeros
npm ci
npm run dev
```

Vite normally starts the frontend at `http://localhost:5173`.

Create a production frontend build with:

```bash
npm run build
```

## 📡 API reference

The API contains 37 routes.

### Authentication — 4 routes

| Method | Endpoint             | Access        | Purpose                                           |
|--------|----------------------|---------------|---------------------------------------------------|
| `POST` | `/api/auth/register` | Public        | Register a user                                   |
| `POST` | `/api/auth/login`    | Public        | Log in and receive access and refresh cookies     |
| `POST` | `/api/auth/logout`   | Authenticated | Log out and clear authentication                  |
| `POST` | `/api/auth/refresh`  | Public        | Refresh the access token using the refresh cookie |

### User — 2 routes

| Method   | Endpoint                   | Access                  | Purpose                                         |
|----------|----------------------------|-------------------------|-------------------------------------------------|
| `GET`    | `/api/users/profile`       | Authenticated           | Get the current user's profile                  |
| `PATCH`  | `/api/users/profile`       | Authenticated           | Update the current user's profile               |

### Organization application — 6 routes

| Method  | Endpoint                                   | Access       | Purpose                                         |
|---------|--------------------------------------------|--------------|-------------------------------------------------|
| `GET`   | `/api/applications`                        | Organization | Get the current user's organization application |
| `POST`  | `/api/applications`                        | Organization | Apply for organziation                          |
| `PATCH` | `/api/applications/{applicationId}/reject` | Admin        | Reject application                              |
| `PATCH` | `/api/applications/{applicationId}/approve`| Admin        | Approve application                             |
| `GET`   | `/api/applications/{userId}`               | Admin        | Get all organization applications by user       |
| `GET`   | `/api/applications/all`                    | Admin        | Get all organization applications               |

### Organizations — 3 routes

| Method  | Endpoint                                   | Access       | Purpose                         |
|---------|--------------------------------------------|--------------|---------------------------------|
| `PATCH` | `/api/organizations/{organizationId}`      | Organization | Update an organization          |
| `GET`   | `/api/organizations`                       | Organization | Get current user's organization |
| `GET`   | `/api/organizations/all`                   | Admin        | Get all organizations           |


### Projects and participation — 18 routes

| Method   | Endpoint                                                | Access                 | Purpose                                 |
|----------|---------------------------------------------------------|------------------------|-----------------------------------------|
| `PUT`    | `/api/projects/{projectId}/image`                       | Organization           | Edit project's picture                  | 
| `POST`   | `/api/projects/{projectId}/image`                       | Organization           | Add project's picture                   | 
| `POST`   | `/api/projects/{projectId}/participants`                | Volunteer              | Apply to participate in a project       |
| `POST`   | `/api/projects/{organizationId}`                        | Organization           | Create project                          |
| `PATCH`  | `/api/projects/{projectId}`                             | Organization           | Edit project                            |
| `PATCH`  | `/api/projects/{projectId}/complete`                    | Organization           | Complete project                        |
| `PATCH`  | `/api/projects/{projectId}/cancel`                      | Volunteer              | Gancel projects                         |
| `PATCH`  | `/api/projects/{projectId}/active`                      | Admin                  | Activate project                        |
| `PATCH`  | `/api/projects/participants/{participationId}/withdraw` | Organization           | Withdraw participation                  |
| `PATCH`  | `/api/projects/participants/{participationId}/status`   | Organization           | Set project's status                    |
| `GET`    | `/api/projects`                                         | Organization, Volunteer | Current user's projects                 |
| `GET`    | `/api/projects/search`                                  | Volunteer              | Search projects by title                |
| `GET`    | `/api/projects/pending-moderation`                      | Admin                  | Get all pending moderation projects     |
| `GET`    | `/api/projects/participants/volunteer`                  | Volunteer              | Volunteer's participations applications |
| `GET`    | `/api/projects/participants/organization`               | Organization           | Project participants applications       |
| `GET`    | `/api/projects/all`                                     | Admin                  | All projects                            |
| `GET`    | `/api/projects/active`                                  | Volunteer              | All active project                      |
| `DELETE` | `/api/projects/{projectId}/remove`                      | Organization           | Remove a project                        |

### Skill — 4 routes

| Method   | Endpoint               | Access    | Purpose        |
|----------|------------------------|-----------|----------------|
| `GET`    | `/api/skills/skills`   | Volunteer | Get all skills |
| `POST`   | `/api/skills/skills`   | Volunteer | Add skill      |
| `DELETE` | `/api/skills/skills`   | Volunteer | Delete skill   |
| `PATCH`  | `/api/skills/skills`   | Volunteer | Edit skill     |  

### Administrator notifications — 1 routes

| Method  | Endpoint                                 | Access | Purpose                                                                            |
|---------|------------------------------------------|--------|------------------------------------------------------------------------------------|
| `GET`   | `/api/admin/monitoring/database`         | Admin  | Subscribe to the administrator SSE database state notification stream              | 

### Moderation and administrator notifications — 2 routes

| Method  | Endpoint                                 | Access | Purpose                                                                            |
|---------|------------------------------------------|--------|------------------------------------------------------------------------------------|
| `GET`   | `/api/moderations/cases`                 | Admin  | Get moderation cases                                                               |
| `PATCH` | `/api/moderations/cases/{caseId}/status` | Admin  | Update a moderation case status                                                    |

Request and response models are available in Swagger at `http://localhost:8080/swagger-ui/index.html`.

## 🔐 Security notes

- Do not commit credentials, JWT secrets, cookies, API keys, or database dumps.
- Store CI credentials in GitHub Actions Secrets or Jenkins Credentials.
- Run load tests only in an approved test environment.
