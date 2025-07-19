import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {store} from './store/store';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Route,Routes} from 'react-router-dom';



import LandingPage from './pages/UserPages/LandingPage/LandingPage';
import JobSeekerSignup from './pages/UserPages/JobSeekerSignup/JobSeekerSignup';
import JobSeekerLogin from './pages/UserPages/JobSeekerLogin/JobSeekerLogin';
import OrganizationSignup from './pages/OrganizationPages/OrganizationSignup/OrganizationSignup';
import OrganizationLogin from './pages/OrganizationPages/OrganizationLogin/OrganizationLogin';
import OrganizationRouter from './pages/OrganizationPages/OrganizationProfile/OrganizationRouter';
import User from './pages/UserPages/UserJobs/UserJobs';
import Mcqtest from './pages/UserPages/McqTest/McqTest';
import MentorshipApp from './pages/UserPages/Mentorship/Mentorship';
import CoursePage from './pages/UserPages/CoursePage/CoursePage';
import Posts from './pages/UserPages/Community/Community';
import CreatePost from './pages/UserPages/CreatePost/CreatePost';
import UsersData from './pages/UserPages/UserData/UsersData';
import ViewProfile from './pages/UserPages/ViewProfile/ViewProfile';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mcqtest/:id" element={<Mcqtest/>}/>
        <Route path="/mentorship" element={<MentorshipApp/>}/>
        <Route path="/posts" element={<Posts/>}/>
        <Route path="/addpost" element={<CreatePost/>}/>
        <Route path="/profiles" element={<UsersData/>}/>
        <Route path="/profiles/:id" element={<ViewProfile/>}/>

        <Route path="/user/*" element={<User/>}/>
        <Route path="/user/courses" element={<CoursePage/>} />
        <Route path="/jobseeker/signup" element={<JobSeekerSignup />} />
        <Route path="/jobseeker/login" element={<JobSeekerLogin />} />

        <Route path="/organization/*" element={<OrganizationRouter/>} />
        <Route path="/organization/login" element={<OrganizationLogin/>}/>
        <Route path="/organization/signup" element={<OrganizationSignup/>}/>
        
        
      </Routes>
    </BrowserRouter>
    </Provider>
);

reportWebVitals();
