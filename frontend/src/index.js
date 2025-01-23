import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LandingPage from './pages/LandingPage';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
// import OrganizationSignup from './pages/OrganizationSignup';
import JobSeekerSignup from './pages/JobSeekerSignup';
import JobSeekerLogin from './pages/JobSeekerLogin';
import OrganizationSignup from './pages/OrganizationSignup';
import OrganizationLogin from './pages/OrganizationLogin';
import Organization from './pages/Organizationjobs';
import OrganizationRouter from './pages/OrganizationRouter';
import User from './pages/UserJobs';
import {store} from './store/store';
import { Provider } from 'react-redux';
import Mcqtest from './pages/McqTest';
import MentorshipApp from './pages/Mentorship';
import CoursePage from './pages/CoursePage';
import Posts from './pages/Community';
import CreatePost from './pages/CreatePost';
import UsersData from './pages/UsersData';
import ViewProfile from './pages/ViewProfile';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/organization/signup" element={<OrganizationSignup />} /> */}
        <Route path="/jobseeker/signup" element={<JobSeekerSignup />} />
        <Route path="/jobseeker/login" element={<JobSeekerLogin />} />
        <Route path="/organization/login" element={<OrganizationLogin/>}/>
        <Route path="/organization/signup" element={<OrganizationSignup/>}/>
        <Route path="/user/*" element={<User/>}/>
        <Route path="/organization/*" element={<OrganizationRouter/>} />
        <Route path="/mcqtest/:id" element={<Mcqtest/>}/>
        <Route path="/mentorship" element={<MentorshipApp/>}/>
        <Route path="/user/courses" element={<CoursePage/>} />
        <Route path="/posts" element={<Posts/>}/>
        <Route path="/addpost" element={<CreatePost/>}/>
        <Route path="/profiles" element={<UsersData/>}/>
        <Route path="/profiles/:id" element={<ViewProfile/>}/>
      </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
