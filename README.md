# Job and Internship Platform

Welcome to our Job and Internship Platform! This website connects students and job seekers with organizations offering job opportunities. It also provides various tools to enhance the user's profile, prepare for interviews, and find mentorship. Below is a detailed breakdown of each section of our platform.

## Flow Chart 

![Flow Chart](./website%20photos/flow-chart.png)


## Features

### 1. User Profile Section

In the profile section, users can enter their experiences, projects, and skills. Additionally, the profile displays heatmaps from various platforms such as Codeforces, CodeChef, GeeksforGeeks, and LeetCode.

![User Profile](./website%20photos//JobSeekerLogin.png)
![image](https://github.com/user-attachments/assets/54cec64d-2b39-4891-9f5b-f3aed23e3f0b)
![image](https://github.com/user-attachments/assets/b90efe91-2eae-4041-b73c-a1c2501794af)
![image](https://github.com/user-attachments/assets/d70c03e6-fc10-42ce-886a-e331b6570fb0)

For Mobile
![image](https://github.com/user-attachments/assets/3442f0df-b2c4-45bf-8106-486a95475ced)
![image](https://github.com/user-attachments/assets/a582d622-aa9a-440b-91e4-297cf30fe6ed)
![image](https://github.com/user-attachments/assets/38a00641-68ae-4eb8-ae98-7d1b3c67d109)
![image](https://github.com/user-attachments/assets/1ec1f7e4-21a5-4b37-aaaf-2a2e14eccd6c)



### 2. Job Section

Users can view jobs posted by organizations. The jobs can be filtered using the search bar based on different criteria, and our algorithm provides suggested jobs using vector mapping that matches the user’s skills by more than 70%.

![image](https://github.com/user-attachments/assets/fd56ff00-80f4-4b29-bc83-adcea608fee4)
![image](https://github.com/user-attachments/assets/c6468379-1815-4166-aa90-5de7a210bce2)
![image](https://github.com/user-attachments/assets/545bac15-c2a7-48f1-883e-2614683d581e)
![image](https://github.com/user-attachments/assets/bbe7cf85-75fd-440e-b5be-8322cd263365)

For Mobile
![image](https://github.com/user-attachments/assets/16667f7b-1349-4755-bf85-785a341b4c19)
![image](https://github.com/user-attachments/assets/ccb2447b-9a9a-4035-91ea-9fdfde0192ff)


### 3. Community Section

Our community section allows users to view posts made by job seekers and job providers. It's a great place for interaction and knowledge sharing between users of the platform.

![image](https://github.com/user-attachments/assets/a5eee3fd-2df2-4ada-b023-b7413dc21d9b)


### 4. Interview Preparation Section

This section allows users to take MCQ tests for self-evaluation in various skills. At the end of each test, users receive a score based on their performance.

![image](https://github.com/user-attachments/assets/11f1d0b4-1f10-4c9f-993a-6d006c2425bb)
![image](https://github.com/user-attachments/assets/658e0969-d44d-411f-84f4-f5d14208fff4)


### 5. Resume Builder

Users can build a resume using either manually entered data or pre-filled information from their user profile. This feature offers multiple templates to suit different needs.

PDF Generated Resume 
![Generate Resume](./website%20photos/Resume.png)

![image](https://github.com/user-attachments/assets/ba356808-0b22-4cd8-a194-d1d81c112a7e)

![image](https://github.com/user-attachments/assets/1dd4d73e-8da5-4833-adac-fee0a575a6d4)

HTML Generated Resume 

![Resume Builder](./website%20photos/ResumeBuilder3.png)
![Resume Builder](./website%20photos/ResumeBuilder4.png)


### 6. Mentorship Page

Users can connect with mentors provided by our platform to improve their performance. Mentorships are tailored to help users enhance their skills and prepare for job opportunities.


![image](https://github.com/user-attachments/assets/e66616e2-d454-471d-8dc5-63cee33d8266)


### 7. Post Creation Page

Users can create posts and share them on the public community page. This is useful for job seekers to share their achievements or job providers to share job openings or updates.

![image](https://github.com/user-attachments/assets/1c4b4dbe-251b-4287-a30b-6fc0a870e1b5)



### 8. Organization Pages

Organizations have a separate section where they can log in and manage job postings. This includes creating jobs by providing details like the title, description, stipend, and openings. Organizations can also view, update, and close jobs. Closed jobs are displayed in a separate "Closed Jobs" section.

![Organization Jobs](./website%20photos/OrganizationLogin.png)
![image](https://github.com/user-attachments/assets/a5d327f0-f5f4-4532-a1a1-8f71b6ff68f2)
![image](https://github.com/user-attachments/assets/e9836775-dc64-4eea-8bc9-7d2700a15375)

![image](https://github.com/user-attachments/assets/0ae673d3-1a91-4151-b7bc-dbe71e71a015)

![image](https://github.com/user-attachments/assets/c0f66052-704d-4d10-bf58-a5225b51438a)
![image](https://github.com/user-attachments/assets/0bee7946-342e-492d-b370-10f1fed4f781)
![image](https://github.com/user-attachments/assets/e54de8f3-d77d-4b19-9339-60f0d4e96578)
![image](https://github.com/user-attachments/assets/8b86bf6e-8a70-4521-b1ce-163818c8bb00)
![image](https://github.com/user-attachments/assets/6df41020-9d61-413b-a9d6-69343fd427fd)
![image](https://github.com/user-attachments/assets/fe2cd167-fc72-4026-a03e-9f3e2f3fdf4a)
![image](https://github.com/user-attachments/assets/a8da67d6-992e-4ba6-9259-d166afd722c4)

![image](https://github.com/user-attachments/assets/9c8a03b2-22f2-4def-95bd-34c8c4f9c13d)

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
- **McqTest**

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
   cd backend
   node index
  ```

6. For Frontend
  ```bash
  cd frontend
  npm start
  ```
<br/>
<br/>

# Contribution

We welcome contributions! If you'd like to contribute to this project, please fork the repository and create a pull request with your changes.

# License
This project is licensed under the MIT License - see the LICENSE file for details.




