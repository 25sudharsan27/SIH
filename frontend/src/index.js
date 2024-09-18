import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import reportWebVitals from './reportWebVitals';

// Lazy load components
const LandingPage = lazy(() => import('./pages/LandingPage'));
const JobSeekerSignup = lazy(() => import('./pages/JobSeekerSignup'));
const JobSeekerLogin = lazy(() => import('./pages/JobSeekerLogin'));
const OrganizationSignup = lazy(() => import('./pages/OrganizationSignup'));
const OrganizationLogin = lazy(() => import('./pages/OrganizationLogin'));
const OrganizationRouter = lazy(() => import('./pages/OrganizationRouter'));
const User = lazy(() => import('./pages/UserJobs'));
const CoursePage = lazy(() => import('./pages/CoursePage'));

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/jobseeker/signup" element={<JobSeekerSignup />} />
            <Route path="/jobseeker/login" element={<JobSeekerLogin />} />
            <Route path="/organization/login" element={<OrganizationLogin />} />
            <Route path="/organization/signup" element={<OrganizationSignup />} />
            <Route path="/user/*" element={<User />} />
            <Route path="/organization/*" element={<OrganizationRouter />} />
            <Route path="/user/courses" element={<CoursePage/>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
