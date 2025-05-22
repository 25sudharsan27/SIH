
# 🧑‍💻 Frontend Documentation – Interactive Job & Internship Platform

# Indexing

```

├── 1 . Project Setup 
│   ├── a) Prerequisites
│   ├── b) Installation
│   └── c) Run the app
├── 2 . Project Architecture
├── 3 . Environment Variables
├── 4 . Available Scripts
├── 5 . Learn More
└── 6 . Features Implemented

```

## 1. 📦 Project Setup

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To run the project locally:

### 1.a ✅ Prerequisites

- Node.js (v16 or higher recommended)
- npm (v8 or higher) or yarn

### 1.b 🔧 Installation

```bash
git clone https://github.com/your-repo-name
cd frontend
npm install
```

### 1.c 🚀 Run the app

```bash
npm start
```

The app will be accessible at [http://localhost:3000](http://localhost:3000)

---

## 2. 🧱 Project Architecture

```
frontend/
│
├── node_modules/
├── public/
│   └── index.html
├── src/
│   ├── components/          # Reusable UI components (Navbar, Cards, Modals, etc.)
│   ├── context/             # React Context Providers (CreateContext export)
│   ├── images/              # Static images and assets
│   ├── pages/               # Route-based page components 
|   |   |── UserPages
|   |   └── OrganizationPages 
│   ├── store/               # Global state management (Redux or custom)
│   ├── utils/               # Utility functions and helpers
│   ├── App.js               # Main app component with routes
│   ├── index.js             # App entry point
│   └──index.css            # Global styles
│
├── .env                     # Environment variables (explained below)
├── package.json             # Project metadata and dependencies
```

---

## 3. 🌐 Environment Variables (`.env`)

Create a `.env` file in the root of `frontend/` directory and paste the following:

> ⚠️ Replace `http://localhost:8000` with your deployed backend server address in production.

```env
# User APIs
REACT_APP_usersignup_api=http://localhost:8000/api/user/signup
REACT_APP_usersignup_method=POST
REACT_APP_userlogin_api=http://localhost:8000/api/user/login

# Job APIs (Public Access)
REACT_APP_viewjobs_api=http://localhost:8000/api/public/jobs
REACT_APP_viewjobs_method=POST
REACT_APP_suggeseted_jobs=http://localhost:8000/api/user/suggestedjob
REACT_APP_filter_jobs=http://localhost:8000/api/public/filterjobs

REACT_APP_viewjobdetails_api=http://localhost:8000/api/public/viewjob
REACT_APP_viewmyjobdetails_api=http://localhost:8000/api/public/getmyjobs

# Apply Job
REACT_APP_applyjob_api=http://localhost:8000/api/user/applytojob
REACT_APP_applyjob_method=POST

# Profile - About / Skills / Projects
REACT_APP_saveabout_api=http://localhost:8000/api/user/adddetails
REACT_APP_addskill_api=http://localhost:8000/api/user/adddetails
REACT_APP_addproject_api=http://localhost:8000/api/user/adddetails

# Experience APIs
REACT_APP_addexperience_api=http://localhost:8000/api/user/addexperience
REACT_APP_updateexperience_api=http://localhost:8000/api/user/updateexperience
REACT_APP_deleteexperience_api=http://localhost:8000/api/user/deleteexperience

# Education APIs
REACT_APP_addeducation_api=http://localhost:8000/api/user/addeducation
REACT_APP_updateeducation_api=http://localhost:8000/api/user/updateeducation
REACT_APP_deleteeducation_api=http://localhost:8000/api/user/deleteeducation

# MCQ / Interview Prep APIs
REACT_APP_interview_api=http://localhost:8000/api/public/getdata
REACT_APP_mcq_api=http://localhost:8000/api/public/getmcq

# Organization Auth APIs
REACT_APP_orgsignup_api=http://localhost:8000/api/organization/signup
REACT_APP_orglogin_api=http://localhost:8000/api/organization/login

# Organization Job APIs
REACT_APP_createjob_api=http://localhost:8000/api/organization/addjob
REACT_APP_closedjob_api=http://localhost:8000/api/organization/getclosedjobs
REACT_APP_postedjob_api=http://localhost:8000/api/organization/getopenjobs
REACT_APP_handleclosejob_api=http://localhost:8000/api/organization/closejob

# Organization Info
REACT_APP_organization_details=http://localhost:8000/api/organization/organizationdetails
REACT_APP_organization_saveabout_api=http://localhost:8000/api/organization/addorganization

# Community
REACT_APP_community_api=http://localhost:8000/api/public/getpost
REACT_APP_addpost_api=http://localhost:8000/api/public/addpost

# Profile View
REACT_APP_userdetails_api=http://localhost:8000/api/user/userdetails
REACT_APP_profile_datas_api=http://localhost:8000/api/public/getprofdatas
REACT_APP_profile_data_api=http://localhost:8000/api/public/getprofdata
```

---

## 4. 🧪 Available Scripts

In the project directory, you can run:

| Script | Description |
|--------|-------------|
| `npm start` | Starts development server on `http://localhost:3000` |
| `npm test` | Runs test runner |
| `npm run build` | Builds app for production |
| `npm run eject` | Ejects config files (Not reversible) |

---

## 5. 📚 Learn More

- [React Documentation](https://reactjs.org/)
- [Create React App Docs](https://create-react-app.dev/)
- [Environment Variables Docs](https://create-react-app.dev/docs/adding-custom-environment-variables/)

---

## 6. ✨ Features Implemented

- ✅ Authentication for both users & organizations
- ✅ Role-based routing for users and organizations
- ✅ Job recommendation engine
- ✅ Profile builder with experiences, education, projects, and skills
- ✅ AI-based interview prep (MCQs & questions)
- ✅ Resume builder templates (PDF export)
- ✅ Community connection (Posts & interactions)

---

## 7. 🧠 Best Practices Followed

- 🌐 Environment variables for API endpoints
- ⚛️ Reusable component-based architecture
- 💡 Separation of concerns (pages vs. components)
- 🧩 Modularized folder structure for scalability
