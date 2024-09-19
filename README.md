# Job and Internship Platform

Welcome to our Job and Internship Platform! This website connects students and job seekers with organizations offering job opportunities. It also provides various tools to enhance the user's profile, prepare for interviews, and find mentorship. Below is a detailed breakdown of each section of our platform.

## Features

### 1. User Profile Section

In the profile section, users can enter their experiences, projects, and skills. Additionally, the profile displays heatmaps from various platforms such as Codeforces, CodeChef, GeeksforGeeks, and LeetCode.

![User Profile](./website%20photos//JobSeekerLogin.png)
![User Profile](./website%20photos//UserProfile.png)
![User Profile](./website%20photos//UserProfile2.png)
![User Profile](./website%20photos//UserProfile4.png)


### 2. Job Section

Users can view jobs posted by organizations. The jobs can be filtered using the search bar based on different criteria, and our algorithm provides suggested jobs using vector mapping that matches the user’s skills by more than 70%.

![Job Section](./website%20photos/Jobs.png)
![Job Section](./website%20photos//Jobs2.png)


### 3. Community Section

Our community section allows users to view posts made by job seekers and job providers. It's a great place for interaction and knowledge sharing between users of the platform.

![Community Section](./website%20photos//Community.png)


### 4. Interview Preparation Section

This section allows users to take MCQ tests for self-evaluation in various skills. At the end of each test, users receive a score based on their performance.

![Interview Preparation](./website%20photos/InterviewPrep.png)
![MCQ TEST](./website%20photos/McqTest.png)

### 5. Resume Builder

Users can build a resume using either manually entered data or pre-filled information from their user profile. This feature offers multiple templates to suit different needs.

PDF Generated Resume 
![Generate Resume](./website%20photos/Resume.png)

![Resume Builder](./website%20photos/ResumeBuilder.png)
![Resume Builder](./website%20photos/ResumeBuilder2.png)

HTML Generated Resume 

![Resume Builder](./website%20photos/ResumeBuilder3.png)
![Resume Builder](./website%20photos/ResumeBuilder4.png)


### 6. Mentorship Page

Users can connect with mentors provided by our platform to improve their performance. Mentorships are tailored to help users enhance their skills and prepare for job opportunities.



![Mentorship Page](./website%20photos/Mentorship.png)

### 7. Post Creation Page

Users can create posts and share them on the public community page. This is useful for job seekers to share their achievements or job providers to share job openings or updates.

![Create Posts](./website%20photos/CreatePost.png)


### 8. Organization Pages

Organizations have a separate section where they can log in and manage job postings. This includes creating jobs by providing details like the title, description, stipend, and openings. Organizations can also view, update, and close jobs. Closed jobs are displayed in a separate "Closed Jobs" section.

![Organization Jobs](./website%20photos/OrganizationLogin.png)
![Organization Jobs](./website%20photos/OrganizationSignup.png)
![Organization Jobs](./website%20photos/OrganizationProfile.png)
![Organization Jobs](./website%20photos/OrganizationProfile2.png)

## Technical Details

- **Frontend**: The frontend of our platform is built using **ReactJS**, with **Redux** used for session and state management.
- **Backend**: The backend is powered by **Node.js** and **Express.js**.
- **Database**: We use **MongoDB** as our database to store user, organization, job, and post information.

## Database Schemas

We use separate schemas for the following entities:
- **User**
- **Organization**
- **Job**
- **Post**

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```

2. **Install Dependencies**: For Backend
  ```bash
  cd backend
  npm install
  ```

3. **Install Dependencies**: For Frontend
  ```bash
  cd frontend
  npm install
  ```

4. **Environment Setup** : Create a .env file in the backend directory and configure your MongoDB URL, JWT secret, and other necessary enivornment variables:
  ```bash
  MONGODB_URI = your-mongodb-uri
  JWT_SECRET= your-secret-key
  ```

5. **Run the development servers**: For Backend
  ```bash
  node index
  ```

6. For Frontend
  ```bash
  npm start
  ```
<br/>
<br/>

# Contribution

We welcome contributions! If you'd like to contribute to this project, please fork the repository and create a pull request with your changes.

# License
This project is licensed under the MIT License - see the LICENSE file for details.




