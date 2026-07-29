# VolunteerOS Frontend

> React 19 + TypeScript frontend for the VolunteerOS platform.

The application provides dedicated experiences for Volunteers, Organizations, and Administrators, allowing users to manage profiles, projects, participation, onboarding workflows, and moderation processes through a modern single-page application.

---

## 🚀 Live Application

**Production:** https://euphonious-cajeta-428baa.netlify.app

---

## 🛠️ Technology Stack

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?logo=reactquery&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=reactrouter&logoColor=white)
![Material UI](https://img.shields.io/badge/MUI-007FFF?logo=mui&logoColor=white)

### Core Technologies

- React 19
- TypeScript
- Vite
- Redux Toolkit
- TanStack Query
- React Router
- Material UI
- Formik
- Yup

---

# 📖 Overview

VolunteerOS is a role-based platform that connects volunteers with organizations.

The frontend is responsible for:

- Authentication and authorization flows
- Volunteer profile management
- Volunteer skills management
- Organization onboarding
- Organization project management
- Volunteer participation workflows
- Administrative moderation
- Real-time notifications and updates

The application consumes a secured Spring Boot REST API using JWT authentication stored in secure HttpOnly cookies.

---

# 🏗️ Frontend Architecture

```text
Netlify
    │
    ▼
React + Vite SPA
    │
    ├── React Router
    ├── Redux Toolkit
    ├── TanStack Query
    ├── Material UI
    │
    ▼
Spring Boot REST API
```

---

# 📂 Project Structure

```text
src/
├── api/            API client configuration
├── app/            Store configuration and app setup
├── assets/         Images, icons, static resources
├── components/     Shared reusable UI components
├── features/       Feature-specific business logic
├── layouts/        Application layouts
├── pages/          Route pages
├── routes/         Route configuration and guards
├── shared/         Shared types and constants
├── theme/          Material UI theme configuration
├── utils/          Utility functions
└── main.tsx        Application entry point
```

---

# 🧠 State Management Strategy

The application intentionally uses both:

- Redux Toolkit
- TanStack Query

Each solves a different problem.

---

## Redux Toolkit

Redux manages **client-side application state**.

Examples:

- Current authenticated user
- UI preferences
- Global notifications
- Application settings
- Modal states
- Role information

### Why Redux?

Redux provides:

- Predictable global state management
- Centralized state updates
- Easy debugging
- Clear separation of concerns
- Consistent access across the application

Example:

```text
User logs in
    │
    ▼
Redux stores:
- user profile
- user role
- auth status
```

Without Redux, this information would need to be passed through multiple component layers.

---

## TanStack Query

TanStack Query manages **server state**.

Examples:

- Projects list
- Organization data
- Volunteer skills
- Participants
- Moderation cases
- User profile data fetched from API

### Why TanStack Query?

Server data has different requirements than UI state.

TanStack Query provides:

- Request caching
- Automatic background refetching
- Request deduplication
- Loading states
- Error states
- Retry mechanisms
- Cache invalidation

Example:

```text
GET /projects/active
```

Instead of manually:

- storing loading state
- storing error state
- storing fetched data
- refreshing stale data

TanStack Query handles this automatically.

---

## Why Not Use Redux for Everything?

Redux can store API responses, but it becomes:

- repetitive
- harder to maintain
- harder to cache
- harder to invalidate

TanStack Query was built specifically for server state.

### Separation of Responsibilities

```text
Redux
│
├── Auth state
├── User role
├── UI state
└── Global application state

TanStack Query
│
├── Projects
├── Organizations
├── Skills
├── Participations
└── Moderation data
```

This approach follows modern React best practices.

---

# 🔐 Authentication

Authentication is implemented using:

- JWT Access Tokens
- JWT Refresh Tokens
- Secure HttpOnly Cookies

Frontend responsibilities:

- Login requests
- Logout requests
- Protected routes
- Session validation
- Automatic token refresh handling

Benefits:

- Tokens are not accessible through JavaScript
- Reduced XSS attack surface
- Secure session management

---

# 🛣️ Routing

Routing is implemented using React Router.

Typical route groups include:

```text
/
├── auth
├── dashboard
├── profile
├── projects
├── organization
└── admin
```

Protected routes restrict access based on:

- Authentication status
- User role

Supported roles:

- Volunteer
- Organization
- Administrator

---

# 🎨 UI System

The application uses Material UI for:

- Responsive layouts
- Form controls
- Data tables
- Navigation
- Dialogs
- Theming

Custom theme configuration is located in:

```text
src/theme
```

---

# 📡 API Communication

API-related logic is located in:

```text
src/api
```

Responsibilities:

- Axios/fetch configuration
- Base URL management
- Request interceptors
- Error handling
- Authentication integration

Example flow:

```text
User Action
    │
    ▼
TanStack Query
    │
    ▼
API Layer
    │
    ▼
Spring Boot Backend
```

---

# ⚙️ Environment Variables

Example:

```env
VITE_API_URL=http://localhost:8080
```

Production values are configured through Netlify.

---

# 💻 Local Development

## Prerequisites

- Node.js 20+
- npm

---

## Install Dependencies

```bash
npm install
```

---

## Start Development Server

```bash
npm run dev
```

Default:

```text
http://localhost:5173
```

---

## Create Production Build

```bash
npm run build
```

Build output:

```text
dist/
```

---

## Preview Production Build

```bash
npm run preview
```

---

# 🚢 Deployment

The frontend is deployed on Netlify.

Deployment workflow:

```text
GitHub
   │
   ▼
Netlify Build
   │
   ▼
React Production Bundle
   │
   ▼
Live Application
```

---

# 📈 Key Frontend Features

### Volunteer

- Browse active projects
- Apply for projects
- Withdraw participation
- Manage profile
- Manage skills

### Organization

- Submit onboarding applications
- Manage organization details
- Create projects
- Review applicants

### Administrator

- Review onboarding requests
- Moderate projects
- Review moderation cases
- Monitor platform activity

---

# 📜 Available Scripts

```bash
npm run dev
```

Start development server.

```bash
npm run build
```

Create production build.

```bash
npm run preview
```

Preview production build.

```bash
npm run lint
```

Run ESLint.

---

# 👥 Related Documentation

- Root project README
- Backend README
- API Swagger Documentation
- QA Documentation

---

# License

Educational project developed as part of the VolunteerOS platform.