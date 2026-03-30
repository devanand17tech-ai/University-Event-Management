# 🏛️ University Event Management System

[![Developed by Devanand](https://img.shields.io/badge/Developed%20by-Devanand-blue.svg)](#)
[![Java](https://img.shields.io/badge/Java-17-darkblue.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.1.4-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC.svg)](https://tailwindcss.com/)

---

## 🌟 Overview

The **University Event Management System** is a sophisticated, full-stack application designed by **Devanand** to streamline campus activities. It provides a seamless experience for students to discover and register for events while empowering administrators with robust management tools and attendee analytics.

Featuring a **Modern Glassmorphism UI**, **Strict Role-Based Access Control (RBAC)**, and a **Synchronized Many-to-Many Database Architecture**, this system ensures data integrity and a premium user experience.

---

## 🚀 Key Features

### 👨‍🎓 For Students
- **Dynamic Event Discovery**: Browse all upcoming campus events with a sleek, card-based interface.
- **Instant Registration**: One-click registration/unregistration with real-time capacity checks.
- **Personal Dashboard**: "My Events" section to track all participating activities.
- **Live Notifications**: Instant feedback via tailored toast notifications.

### 🔐 For Administrators
- **Full CRUD Management**: Create, update, and delete events with a dedicated management suite.
- **Attendee Analytics**: Real-time "View Students" feature to see exactly who has registered for any specific event.
- **Role-Locked Controls**: Higher-privileged actions (Editing/Deleting) are strictly reserved for the Admin dashboard.

---

## 🛠️ Technology Stack

### Backend (Spring Boot)
- **Spring Data JPA**: Efficient many-to-many relationship management.
- **H2 Database**: High-performance in-memory persistence for rapid development.
- **Hibernate**: Transactional safety for concurrent registrations.
- **Validation API**: Strict server-side validation for student profiles.

### Frontend (React)
- **Vite**: Ultra-fast build tool and dev server.
- **Tailwind CSS**: Modern, utility-first styling with custom glassmorphism effects.
- **Lucide React**: Premium iconography.
- **Axios**: Centralized API service with async/await patterns.
- **React Router**: Secure, role-based navigation guarding.

---

## 🏗️ Architecture: Many-to-Many Mapping

The system utilizes a sophisticated **Many-to-Many** relationship between `Student` and `Event`.
> [!IMPORTANT]
> To ensure robust administration, the `Event` entity is defined as the **owning side** of the relationship. This allows for seamless attendee tracking and event-centric data management.

- **Recursion Prevention**: Uses `@JsonIgnoreProperties` to allow bi-directional data flow (Events ↔ Students) without circular serialization errors.
- **Transactional Integrity**: All registration operations use `@Transactional` to ensure both sides of the database relationship are updated simultaneously.

---

## 🚦 Getting Started

### 1. Backend Setup
```bash
git clone <repository-url>
cd University-Event-Management/backend
mvn spring-boot:run
```
*Backend runs on: `http://localhost:8081`*

### 2. Frontend Setup
```bash
cd University-Event-Management/frontend
npm install
npm run dev
```
*Frontend runs on: `http://localhost:5173`*

---

## 📡 API Endpoints Summary

### Events
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/events` | List all available events |
| `POST` | `/events` | Create a new event (Admin) |
| `GET` | `/events/{id}/students` | List all students registered for an event |
| `POST` | `/events/register/{eId}/{sId}`| Register a student to an event |

### Students
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/students` | Register a new student profile |
| `GET` | `/students/{id}/events` | Get all events joined by a specific student |

---

## 📄 License
This project is licensed under the [BSD 3-Clause License](LICENSE).

## 🤝 Acknowledgments
- **Spring Boot & React Communities** for providing the core technologies.
- **Devanand** for the architecture and implementation of this full-stack portal.

## ✉️ Contact
**Devanand** - [GitHub](https://github.com/) | [Email](mailto:business.amitswain@gmail.com)

---
<p align="center">Made with ❤️ by Devanand</p>
