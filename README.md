# 📚 ExamPortal
### Online Examination Management System

![Angular](https://img.shields.io/badge/Angular-17-red?style=flat-square&logo=angular)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3-green?style=flat-square&logo=springboot)
![MySQL](https://img.shields.io/badge/MySQL-8-blue?style=flat-square&logo=mysql)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-purple?style=flat-square)

> A full-stack online examination platform where admins can create quizzes and evaluate students in real time.

---

## 🖥️ Screenshots

> Add screenshots after running the project

| Login | Admin Dashboard | Quiz Attempt |
|-------|----------------|--------------|
| ![login](screenshots/login.png) | ![admin](screenshots/admin.png) | ![quiz](screenshots/quiz.png) |

---

## ✨ Features

### 👨‍💼 Admin Panel
- 🔐 JWT-based login with role-based route guards
- 📂 Manage quiz **categories** — create, edit, delete
- 📝 Create and manage **quizzes** with title, description, marks, time limit
- ❓ Add **MCQ questions** using CKEditor rich text editor
- 👁️ View all questions per quiz with correct answer highlighting
- 👨‍🎓 View all **registered students** with search and delete
- 📊 View **quiz attempt history** — marks, correct answers, score % per student

### 🎓 Student Dashboard
- 📋 Browse quizzes by category from sidebar
- 📄 Quiz instructions page before starting
- ⏱️ Real-time quiz engine with **countdown timer** and auto-submit
- 🔘 Large A/B/C/D clickable option cards
- 📈 Live progress sidebar showing answered vs skipped
- 🏆 Result screen with marks, correct answers, and attempted count

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | Angular 17, TypeScript, Angular Material, CKEditor 5 |
| **Backend** | Spring Boot 3, Spring Security, JWT |
| **Database** | MySQL 8, Spring Data JPA, Hibernate |
| **Tools** | SweetAlert2, BCrypt, REST API |

---

## 📁 Project Structure

```
ExamPortal/
├── examfront/                  # Angular Frontend
│   └── src/app/
│       ├── pages/
│       │   ├── admin/          # Admin components
│       │   │   ├── dashboard/
│       │   │   ├── view-categories/
│       │   │   ├── view-quizzes/
│       │   │   ├── view-quiz-questions/
│       │   │   ├── add-question/
│       │   │   ├── admin-students/
│       │   │   └── quiz-attempts/
│       │   ├── user/           # Student components
│       │   │   ├── user-dashboard/
│       │   │   ├── load-quiz/
│       │   │   ├── instructions/
│       │   │   └── start/
│       │   ├── login/
│       │   ├── signup/
│       │   └── profile/
│       └── services/           # API services
│
└── examserver/                 # Spring Boot Backend
    └── src/main/java/com/exam/
        ├── controller/         # REST Controllers
        ├── model/exam/         # Quiz, Question, Result entities
        ├── service/            # Service interfaces + impls
        ├── repo/               # JPA Repositories
        └── config/             # JWT + Security config
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Java 17+
- MySQL 8+
- Angular CLI: `npm install -g @angular/cli`

### Backend Setup
```bash
# 1. Create MySQL database
CREATE DATABASE exam;

# 2. Update application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/exam
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update

# 3. Run backend
cd examserver
mvn spring-boot:run
# Runs on http://localhost:8080
```

### Frontend Setup
```bash
# 1. Install dependencies
cd examfront
npm install

# 2. Run frontend
ng serve
# Open http://localhost:4200
```

---

## 🔑 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/generate-token` | Login and get JWT |
| POST | `/user/` | Register new student |

### Categories
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/category/` | Get all categories |
| POST | `/category/` | Create category |
| DELETE | `/category/{cid}` | Delete category |

### Quiz Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/quiz/` | Get all quizzes |
| POST | `/quiz/` | Create quiz |
| PUT | `/quiz/` | Update quiz |
| DELETE | `/quiz/{qid}` | Delete quiz |

### Questions & Evaluation
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/question/quiz/{qid}` | Get questions for student |
| GET | `/question/quiz/all/{qid}` | Get questions for admin |
| POST | `/question/` | Add question |
| POST | `/question/eval-quiz` | Submit and evaluate quiz |
| GET | `/question/attempts/{qid}` | Get all attempts for a quiz |

### Students
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/user/all` | Get all students |
| DELETE | `/user/{id}` | Delete student |

---

## 🗄️ Database Schema

Key tables:
- `user` — student and admin accounts
- `role` — ADMIN / NORMAL roles
- `category` — quiz categories
- `quiz` — quiz details
- `question` — MCQ questions
- `quiz_results` — stores every quiz attempt with marks and score

---

## 👤 Default Roles

| Role | Access |
|------|--------|
| ADMIN | Full access to admin panel |
| NORMAL | Student dashboard and quiz attempts |

---

## 📝 Resume Description

**ExamPortal — Full-Stack Online Examination System**
`Angular 17 · Spring Boot · MySQL · JWT · REST API`

- Built a full-stack exam portal with role-based access (Admin & Student) using Angular 17 and Spring Boot
- Implemented JWT-based authentication with route guards for secure admin and student dashboards
- Designed admin panel to manage quiz categories, create/update quizzes, and add MCQ questions with CKEditor
- Built real-time quiz engine with countdown timer, auto-submit, and live progress tracking
- Developed result evaluation system that calculates marks and saves attempt history to MySQL database
- Created student management dashboard with search, status tracking, and attempt analytics per quiz

---

## 🔗 Links

- **GitHub:** [github.com/imvishalgpt/ExamPortal](https://github.com/imvishalgpt/ExamPortal)
- **Live Demo:** Coming soon

---

*Built with ❤️ using Angular + Spring Boot*
