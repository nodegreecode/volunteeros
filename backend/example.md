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
- Organization application events
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
           └── Google Gemini API
```

---

# 💻 Local Development

## Prerequisites

- Java 21
- Maven
- Docker
- PostgreSQL
- Redis

---

## Start PostgreSQL

```bash
docker run --name volunteeros-postgres \
-e POSTGRES_DB=volunteeros_db_dev \
-e POSTGRES_USER=volunteer \
-e POSTGRES_PASSWORD=volunteer_password \
-p 5432:5432 \
-d postgres:16
```

---

## Start Redis

```bash
docker run --name volunteeros-redis \
-p 6379:6379 \
-d redis:7
```

---

## Run Application

```bash
./mvnw spring-boot:run
```

Application starts at:

```text
http://localhost:8080
```

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

# 🧪 Quality

The backend is tested through:

- REST Assured API automation
- Postman collections
- Newman regression runs
- JMeter performance testing
- Database verification queries

---

# 📜 License

Educational project developed as part of the VolunteerOS platform.
