# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


# Initialize environment variables in this format

``` bash
    
    
# Users section
REACT_APP_usersignup_api = "http://your_backend_url/api/signup"
REACT_APP_userlogin_api = "http://your_backend_url/api/login"
REACT_APP_usersignup_method = "POST"

## View Jobs
REACT_APP_viewjobs_api = "http://your_backend_url/public/jobs"
REACT_APP_viewjobs_method = "POST"
REACT_APP_suggeseted_jobs = "http://your_backend_url/user/suggestedjob"
REACT_APP_suggeseted_jobs_method = "POST"
REACT_APP_filter_jobs = "http://your_backend_url/public/filterjobs"
REACT_APP_filter_jobs_method = "POST"


## View Job Details
REACT_APP_viewjobdetails_api = "http://your_backend_url/public/viewjob"
REACT_APP_viewjobdetails_method = "POST"
REACT_APP_applyjob_api = "http://your_backend_url/user/applytojob"
REACT_APP_applyjob_method = "POST"


## View Profile
REACT_APP_saveabout_api = "http://your_backend_url/user/adddetails"
REACT_APP_saveabout_method = "POST"
REACT_APP_addskill_api = "http://your_backend_url/user/adddetails"
REACT_APP_addskill_method = "POST"
REACT_APP_addproject_api = "http://your_backend_url/user/adddetails"
REACT_APP_addproject_method = "POST"
REACT_APP_addexperience_api = "http://your_backend_url/user/adddetails"
REACT_APP_addexperience_method = "POST"

## Interview
REACT_APP_interview_api = 'http://your_backend_url/public/getdata'
REACT_APP_interview_method = 'POST'
REACT_APP_mcq_api = "http://your_backend_url/public/getmcq"
REACT_APP_mcq_method = "POST"


## Organization section
REACT_APP_orgsignup_api = 'http/:/your_backend_url/organization/signup'
REACT_APP_orgsignup_method = 'POST'
REACT_APP_orglogin_api = 'http://your_backend_url/organization/login'
REACT_APP_orglogin_method = 'POST'
REACT_APP_organization_details ='http://your_backend_url/organization/organizationdetails'

REACT_APP_organization_details_method = 'POST'
REACT_APP_organization_saveabout_api = 'http://your_backend_url/organization/addorganization'
REACT_APP_saveabout_method = 'POST'


## Create Job
REACT_APP_createjob_api = "http://your_backend_url/organization/addjob"
REACT_APP_createjob_method = "POST"

## closed Job
REACT_APP_closedjob_api = "http://your_backend_url/organization/getclosedjobs"
REACT_APP_closedjob_method = "POST"

## posted Jobs
REACT_APP_postedjob_api = "http://your_backend_url/organization/getopenjobs"
REACT_APP_postedjob_method = "POST"
REACT_APP_handleclosejob_api ="http://your_backend_url/organization/closejob"
REACT_APP_handleclosejob_method = "POST"


## community
REACT_APP_community_api = "http://your_backend_url/public/getpost"
REACT_APP_community_method = "POST"

## Add Post
REACT_APP_addpost_api = "http://your_backend_url/public/addpost"
REACT_APP_addpost_method = "POST"

REACT_APP_userdetails_api = "http://your_backend_url/user/userdetails"
REACT_APP_userdetails_method = "POST"



    


```


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
