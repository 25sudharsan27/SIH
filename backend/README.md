# Documentation of Backend of Job Intern Catalyst

# Indexing

```

├── 1 . Project File Structure
├── 2 . Backend API Endpoints
├── 3 . Environment Variables setup
├── 4 . Start Backend Server
└── 5 . Error Notes


```
# 1.  Project File Structure - Backend

```
backend/
├── config/            # Configuration files (e.g., DB, env)
├── controller/        # Controller logic for handling requests
├── middleware/        # Express middleware (auth, logging, etc.)
├── models/            # Mongoose/Sequelize models for DB schemas
├── node_modules/      # Node.js packages (auto-generated)
├── routes/            # API route definitions
├── index.js           # Entry point of the server
└── package.json       # Project dependencies and scripts
```


# 2. Backend API Endpoints

---

## 2.a 🧑‍💼 Users Section

| Purpose      | Endpoint                         | Method |
|--------------|----------------------------------|--------|
| User Signup  | `/api/user/signup`              | POST   |
| User Login   | `/api/user/login`               | POST   |

---

## 2.b 🧳 Job Viewing & Suggestions

| Purpose                  | Endpoint                              | Method |
|--------------------------|---------------------------------------|--------|
| View All Jobs            | `/api/public/jobs`                   | POST   |
| Suggested Jobs           | `/api/user/suggestedjob`             | POST   |
| Filter Jobs              | `/api/public/filterjobs`             | POST   |
| View Job Details         | `/api/public/viewjob`                | POST   |
| View My Posted Jobs      | `/api/public/getmyjobs`              | POST   |
| Apply to Job             | `/api/user/applytojob`               | POST   |

---

## 2.c 👤 User Profile Management

### 2.c1 🔹 General Details

| Purpose          | Endpoint                         | Method |
|------------------|----------------------------------|--------|
| Add About Info   | `/api/user/adddetails`          | POST   |
| Add Skills       | `/api/user/adddetails`          | POST   |
| Add Projects     | `/api/user/adddetails`          | POST   |

### 2.c2 🔹 Experience

| Purpose              | Endpoint                            | Method |
|----------------------|-------------------------------------|--------|
| Add Experience       | `/api/user/addexperience`          | POST   |
| Update Experience    | `/api/user/updateexperience`       | POST   |
| Delete Experience    | `/api/user/deleteexperience`       | POST   |

### 2.c3🔹 Education

| Purpose              | Endpoint                            | Method |
|----------------------|-------------------------------------|--------|
| Add Education        | `/api/user/addeducation`           | POST   |
| Update Education     | `/api/user/updateeducation`        | POST   |
| Delete Education     | `/api/user/deleteeducation`        | POST   |

### 2.c4🔹 User Data

| Purpose              | Endpoint                            | Method |
|----------------------|-------------------------------------|--------|
| Get User Details     | `/api/user/userdetails`            | POST   |

---

## 2.d 🧪 Interview & MCQ Section

| Purpose              | Endpoint                            | Method |
|----------------------|-------------------------------------|--------|
| Get Interview Data   | `/api/public/getdata`              | POST   |
| Get MCQ Test Data    | `/api/public/getmcq`               | POST   |

---

## 2.e 🏢 Organization Section

| Purpose                     | Endpoint                                 | Method |
|-----------------------------|------------------------------------------|--------|
| Organization Signup         | `/api/organization/signup`              | POST   |
| Organization Login          | `/api/organization/login`               | POST   |
| Save Organization Details   | `/api/organization/addorganization`     | POST   |
| Get Organization Details    | `/api/organization/organizationdetails` | POST   |

---

## 2.f 🧾 Job Management (Organization)

| Purpose                     | Endpoint                            | Method |
|-----------------------------|-------------------------------------|--------|
| Create Job                  | `/api/organization/addjob`         | POST   |
| Get Closed Jobs             | `/api/organization/getclosedjobs`  | POST   |
| Get Open Jobs               | `/api/organization/getopenjobs`    | POST   |
| Close a Job                 | `/api/organization/closejob`       | POST   |

---

## 2.g 🌐 Community Section

| Purpose              | Endpoint                            | Method |
|----------------------|-------------------------------------|--------|
| View Community Posts | `/api/public/getpost`              | POST   |
| Add New Post         | `/api/public/addpost`              | POST   |

---

## 2.h 📈 Profile Data (for Heatmap & Analytics)

| Purpose                         | Endpoint                             | Method |
|----------------------------------|--------------------------------------|--------|
| Get All Profile Data             | `/api/public/getprofdatas`          | POST   |
| Get Single Profile Data          | `/api/public/getprofdata`           | POST   |




## 3. Initialize environment variables in this format

``` bash
// Database credentials
MONGODB_URI = your_mongodb_url

// tokens
TOKEN_SECRET_KEY = user_token_secret_key
ORG_TOKEN_SECRET_KEY = organization_token_secret_key

// URL
FRONTEND_URL = your_frontend_origin_url_for_cors

// Mail Services
HOST=smtp.gmail.com
SERVICE=gmail
EMAIL_USER=sample_gmail_id
EMAIL_PASSWORD=gmail_id_password

// Port number
PORT = your_backend_port_number (example : 5000)
```


## 4. Start backend server

If you have nodemon then 

``` bash
    nodemon index
```

Otherwise 

``` bash
    node index.js
```

## 5. Error Notes

---

## 🧾 Common HTTP Status Codes & Error Notes

| Status Code | Message               | Reason                                                    |
|-------------|------------------------|------------------------------------------------------------|
| 200         | OK                     | Request successful.                                        |
| 201         | Created                | Resource created successfully (e.g., data added).          |
| 400         | Bad Request            | User ID or required data not sent from client.             |
| 401         | Unauthorized           | Invalid token or user not logged in.                       |
| 403         | Forbidden              | User does not have the required privileges.                |
| 404         | Not Found              | Requested resource or user not found in the database.      |
| 500         | Internal Server Error  | Unexpected error occurred in server.                       |

---
