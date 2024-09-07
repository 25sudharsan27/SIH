API Endpoints
Authentication
POST /api/signup
Description: Registers a new user.
Request:
json

{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}
Response:
json

{
  "message": "User registered successfully",
  "success": true
}
POST /api/login
Description: Authenticates a user and returns a JWT token.
Request:
json
Copy code
{
  "email": "johndoe@example.com",
  "password": "password123"
}
Response:
json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "success": true
}
GET /api/user-details
Description: Returns the details of the authenticated user.
Headers:
Authorization: Bearer <JWT Token>
Response:
json
{
  "data": {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "skills": [],
    "projects": [],
    "jobs": []
  },
  "success": true
}
GET /api/logout
Description: Logs out the authenticated user by clearing the token.
Headers:
Authorization: Bearer <JWT Token>
Response:
json
{
  "message": "User logged out",
  "success": true
}
POST /api/forget-password
Description: Sends a password reset email to the user.
Request:
json
Copy code
{
  "email": "johndoe@example.com"
}
Response:
json
{
  "message": "Password reset email sent",
  "success": true
}
User Profile
POST /user/adddetails
Description: Adds or updates user details like skills, projects, jobs, etc.
Request:
json
{
  "email": "johndoe@example.com",
  "skills": ["JavaScript", "Node.js"],
  "projects": [
    {
      "title": "Project A",
      "description": "Project description",
      "link": "http://example.com",
      "media": ["http://example.com/image.png"]
    }
  ]
}
Response:
json
{
  "message": "User details updated successfully",
  "success": true
}
POST /user/delete
Description: Deletes specific fields like skills, projects, etc.
Request:
json
Copy code
{
  "email": "johndoe@example.com",
  "fieldToDelete": "skills",
  "valueToDelete": "JavaScript"
}
Response:
json
{
  "message": "Details deleted successfully",
  "success": true
}
Public
GET /public/jobs
Description: Retrieves a list of available jobs.
Response:
json
{
  "jobs": [
    {
      "title": "Web Developer",
      "description": "Develop web applications",
      "location": "Remote",
      "company": "Tech Inc"
    }
  ],
  "success": true
}
POST /public/updatejob
Description: Adds or updates a job listing.
Request:
json
{
  "title": "Web Developer",
  "description": "Develop web applications",
  "location": "Remote",
  "company": "Tech Inc"
}
Response:
json
{
  "message": "Job updated successfully",
  "success": true
}
Job Management
POST /public/jobs
Description: Add or update jobs for authenticated users.
Request:
json

{
  "email": "johndoe@example.com",
  "jobs": [
    {
      "title": "Web Developer",
      "description": "Full-time web developer",
      "workMode": "remote",
      "country": "USA",
      "city": "San Francisco",
      "company": "Tech Inc"
    }
  ]
}
Response:
{
  "message": "Jobs added/updated successfully",
  "success": true
}
