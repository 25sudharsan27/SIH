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
import User from './pages/UserJobs';
import {store} from './store/store';
import { Provider } from 'react-redux';
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
        <Route path="/organization/jobs/*" element={<Organization/>}/>
        <Route path="/user/*" element={<User/>}/>
        
      </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
