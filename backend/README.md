


# 📌 Backend API Endpoints Documentation

---

## 🧑‍💼 Users Section

| Purpose      | Endpoint                         | Method |
|--------------|----------------------------------|--------|
| User Signup  | `/api/user/signup`              | POST   |
| User Login   | `/api/user/login`               | POST   |

---

## 🧳 Job Viewing & Suggestions

| Purpose                  | Endpoint                              | Method |
|--------------------------|---------------------------------------|--------|
| View All Jobs            | `/api/public/jobs`                   | POST   |
| Suggested Jobs           | `/api/user/suggestedjob`             | POST   |
| Filter Jobs              | `/api/public/filterjobs`             | POST   |
| View Job Details         | `/api/public/viewjob`                | POST   |
| View My Posted Jobs      | `/api/public/getmyjobs`              | POST   |
| Apply to Job             | `/api/user/applytojob`               | POST   |

---

## 👤 User Profile Management

### 🔹 General Details

| Purpose          | Endpoint                         | Method |
|------------------|----------------------------------|--------|
| Add About Info   | `/api/user/adddetails`          | POST   |
| Add Skills       | `/api/user/adddetails`          | POST   |
| Add Projects     | `/api/user/adddetails`          | POST   |

### 🔹 Experience

| Purpose              | Endpoint                            | Method |
|----------------------|-------------------------------------|--------|
| Add Experience       | `/api/user/addexperience`          | POST   |
| Update Experience    | `/api/user/updateexperience`       | POST   |
| Delete Experience    | `/api/user/deleteexperience`       | POST   |

### 🔹 Education

| Purpose              | Endpoint                            | Method |
|----------------------|-------------------------------------|--------|
| Add Education        | `/api/user/addeducation`           | POST   |
| Update Education     | `/api/user/updateeducation`        | POST   |
| Delete Education     | `/api/user/deleteeducation`        | POST   |

### 🔹 User Data

| Purpose              | Endpoint                            | Method |
|----------------------|-------------------------------------|--------|
| Get User Details     | `/api/user/userdetails`            | POST   |

---

## 🧪 Interview & MCQ Section

| Purpose              | Endpoint                            | Method |
|----------------------|-------------------------------------|--------|
| Get Interview Data   | `/api/public/getdata`              | POST   |
| Get MCQ Test Data    | `/api/public/getmcq`               | POST   |

---

## 🏢 Organization Section

| Purpose                     | Endpoint                                 | Method |
|-----------------------------|------------------------------------------|--------|
| Organization Signup         | `/api/organization/signup`              | POST   |
| Organization Login          | `/api/organization/login`               | POST   |
| Save Organization Details   | `/api/organization/addorganization`     | POST   |
| Get Organization Details    | `/api/organization/organizationdetails` | POST   |

---

## 🧾 Job Management (Organization)

| Purpose                     | Endpoint                            | Method |
|-----------------------------|-------------------------------------|--------|
| Create Job                  | `/api/organization/addjob`         | POST   |
| Get Closed Jobs             | `/api/organization/getclosedjobs`  | POST   |
| Get Open Jobs               | `/api/organization/getopenjobs`    | POST   |
| Close a Job                 | `/api/organization/closejob`       | POST   |

---

## 🌐 Community Section

| Purpose              | Endpoint                            | Method |
|----------------------|-------------------------------------|--------|
| View Community Posts | `/api/public/getpost`              | POST   |
| Add New Post         | `/api/public/addpost`              | POST   |

---

## 📈 Profile Data (for Heatmap & Analytics)

| Purpose                         | Endpoint                             | Method |
|----------------------------------|--------------------------------------|--------|
| Get All Profile Data             | `/api/public/getprofdatas`          | POST   |
| Get Single Profile Data          | `/api/public/getprofdata`           | POST   |




## Initialize environment variables in this format

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


## Start backend server

If you have nodemon then 

``` bash
    nodemon index
```

Otherwise 

``` bash
    node index.js
```