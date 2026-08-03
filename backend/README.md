# VolunteerOS Backend

> Spring Boot backend powering the VolunteerOS platform.

The backend provides authentication, authorization, organization onboarding, project management, volunteer participation workflows, moderation, notifications, caching, and AI-powered content moderation.

---

## 🚀 Overview

VolunteerOS is a role-based platform connecting volunteers with organizations.

The backend exposes a secured REST API consumed by the React frontend and is responsible for:

- User authentication and authorization
- Profile management
- Organization onboarding
- Project management
- Volunteer participation
- Administrative moderation
- Real-time notifications
- AI content moderation
- Database persistence
- Caching

---

## 🛠️ Technology Stack

![Java](https://img.shields.io/badge/Java-21-E76F00?logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.1-6DB33F?logo=springboot&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?logo=springsecurity&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Liquibase](https://img.shields.io/badge/Liquibase-2962FF?logo=liquibase&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?logo=googlegemini&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)

### Core Technologies

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- PostgreSQL
- Liquibase
- Redis
- Elasticsearch
- Spring AI
- Google Gemini
- Maven
- OpenAPI / Swagger

---

# 🏗️ Architecture

```text
Client
   │
   ▼
Spring Security
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Repositories
   │
   ▼
PostgreSQL
```

Additional infrastructure:

```text
Services
│
├── Redis Cache
├── Google Gemini Moderation
├── SSE Notifications
└── Domain Events
```

---

# 📂 Project Structure

```text
src/main/java/de/upteams/volunteeros

├── admin/            Admin monitoring and SSE notifications
├── config/           Spring configuration
├── controller/       REST controllers
├── domain/           JPA entities
├── dto/              Request and response DTOs
├── event/            Domain events
├── exceptions/       Custom exceptions and handlers
├── listener/         Event listeners
├── logging/          Logging utilities
├── repository/       Spring Data repositories
├── security/         Authentication and authorization
├── service/          Business logic
├── utils/            Utils
└── VolunteerosApplication
```

Resources:

```text
src/main/resources

├── db.changelog/      Liquibase migrations
├── application.yaml
└── application-dev.yaml
```

---

# 🎯 Architectural Principles

The backend follows a layered architecture.

## Controller Layer

Responsibilities:

- HTTP request handling
- Request validation
- Response generation
- Route definitions

Example:

```text
POST /api/auth/login
GET /api/projects/active
PATCH /api/projects/{id}
```

Controllers remain thin and delegate business logic to services.

---

## Service Layer

Contains application business logic.

Responsibilities:

- Workflow orchestration
- Validation
- Authorization decisions
- Event publishing
- Integration with external systems

Examples:

- User registration
- Project moderation
- Participation approval
- Organization onboarding

---

## Repository Layer

Uses Spring Data JPA.

Responsibilities:

- Database access
- Query execution
- Entity persistence

Benefits:

- Reduced boilerplate
- Automatic CRUD operations
- Transaction support

---

## Domain Layer

Contains the application's business entities.

Examples:

```text
User
UserProfile
Organization
OrganizationApplication
Project
Participation
Skill
ModerationCase
```

Entities are mapped using JPA/Hibernate.

---

# 🔐 Security

Authentication and authorization are implemented with Spring Security.

Features:

- JWT Access Tokens
- JWT Refresh Tokens
- HttpOnly Cookies
- Role-based authorization
- Protected endpoints

Supported roles:

```text
ROLE_VOLUNTEER
ROLE_ORGANIZATION
ROLE_ADMIN
```

---

# 🗄️ Database

## PostgreSQL

Primary persistence layer.

Stores:

- Users
- Profiles
- Organizations
- Projects
- Participations
- Skills
- Moderation data

---

## Liquibase

Database schema changes are version-controlled.

Benefits:

- Reproducible deployments
- Database version tracking
- Safe schema evolution

Migration files:

```text
src/main/resources/db.changelog
```

---

# ⚡ Redis

Redis is used as a high-speed in-memory datastore.

Typical use cases:

- Caching
- Temporary application state
- Performance optimization

Benefits:

- Faster response times
- Reduced database load
- Improved scalability

---

# 🤖 AI Moderation

The platform integrates Google Gemini through Spring AI.

Purpose:

- Content moderation
- Organization application review support
- Project moderation workflows

Flow:

```text
User Content
      │
      ▼
Spring AI
      │
      ▼
Google Gemini
      │
      ▼
Moderation Decision
```

Benefits:

- Automated moderation assistance
- Consistent content review
- Reduced administrative workload

---

# 📡 Server-Sent Events (SSE)

The platform supports real-time administrative notifications.

Use cases:

- Moderation updates
- Monitoring events

Flow:

```text
Backend Event
      │
      ▼
SSE Publisher
      │
      ▼
Connected Admin Clients
```

---

# 📖 API Documentation

Swagger UI:

```text
http://localhost:8080/swagger-ui/index.html
```

OpenAPI documentation is generated automatically from controllers and DTOs.

---

# ⚙️ Configuration

Main configuration files:

```text
application.yaml
application-dev.yaml
```

Typical configuration includes:

- Database settings
- Redis settings
- JWT settings
- Gemini API configuration
- Logging settings

---

# 🐳 Deployment Architecture

Production deployment:

```text
React Frontend (Netlify)
           │
           ▼
Nginx Reverse Proxy
(Hetzner VPS)
           │
           ▼
Spring Boot Container
           │
           ├── PostgreSQL
           ├── Redis
           ├── Elasticsearch
           └── Google Gemini API
```

---

# 💻 Local Development

## Prerequisites

Before running the application, ensure you have the following installed:

* Java 21
* Maven
* Docker (Docker Desktop or Docker Engine)

> **Note:** This project uses Spring Boot's Docker Compose integration. PostgreSQL, Redis, and Elasticsearch are automatically started using the project's `docker-compose.yml`. No manual database or infrastructure setup is required.

---

## Getting Started

1. Clone the repository.

2. Start the application:

```bash
./mvnw spring-boot:run
```

On startup, Spring Boot automatically detects the `docker-compose.yml` file and starts the required infrastructure services:

* PostgreSQL 17
* Redis 8
* Elasticsearch 9

The application will be available at:

```text
http://localhost:8080
```

---

## Notes

* Docker must be running before starting the application.
* If the required containers are not already running, Spring Boot will create and start them automatically.
* Persistent Docker volumes are used for PostgreSQL, Redis, and Elasticsearch, so data is preserved between restarts.
* When the application stops, Spring Boot also manages the lifecycle of the Docker Compose services it started.

---

# 📈 Key Features

### Authentication

- Registration
- Login
- Logout
- Token refresh

### Volunteer

- Profile management
- Skills management
- Project participation

### Organization

- Onboarding
- Project creation
- Applicant management

### Administrator

- Organization review
- Project moderation
- Moderation cases
- Notifications

---

# 🧪 Testing

Automated tests are planned as part of the project's ongoing development.

The testing strategy will include:

* Unit tests
* Integration tests

Additional testing (such as performance and end-to-end testing) may be introduced as the project evolves.

---

# 📜 License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.

