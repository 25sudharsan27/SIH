pipeline {
    agent any

    environment {
   
        IMAGE_FRONTEND = "01sudharsan/sihfrontend-app"     // Frontend Docker Hub image name
        IMAGE_BACKEND = "01sudharsan/sihbackend-app"       // Backend Docker Hub image name
        IMAGE_TAG = "${env.BUILD_NUMBER}"                  // Tagging with Jenkins build number, can also use "latest"
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out source code..."
                checkout scm  // Checkout the code from the repository
            }
        }

        stage('Create .env files') {
            steps {
                echo "Creating frontend and backend .env files..."

                dir('frontend') {
                    writeFile file: '.env', text: '''

                    # Users section
                    REACT_APP_usersignup_api = "http://localhost:8000/api/signup"
                    REACT_APP_userlogin_api = "http://localhost:8000/api/login"
                    REACT_APP_usersignup_method = "POST"

                    ## View Jobs
                    REACT_APP_viewjobs_api = "http://localhost:8000/public/jobs"
                    REACT_APP_viewjobs_method = "POST"
                    REACT_APP_suggeseted_jobs = "http://localhost:8000/user/suggestedjob"
                    REACT_APP_suggeseted_jobs_method = "POST"
                    REACT_APP_filter_jobs = "http://localhost:8000/public/filterjobs"
                    REACT_APP_filter_jobs_method = "POST"


                    ## View Job Details
                    REACT_APP_viewjobdetails_api = "http://localhost:8000/public/viewjob"
                    REACT_APP_viewjobdetails_method = "POST"
                    REACT_APP_viewmyjobdetails_api = "http://localhost:8000/public/getmyjobs"

                    REACT_APP_applyjob_api = "http://localhost:8000/user/applytojob"
                    REACT_APP_applyjob_method = "POST"


                    ## View Profile
                    REACT_APP_saveabout_api = "http://localhost:8000/user/adddetails"
                    REACT_APP_saveabout_method = "POST"
                    REACT_APP_addskill_api = "http://localhost:8000/user/adddetails"
                    REACT_APP_addskill_method = "POST"
                    REACT_APP_addproject_api = "http://localhost:8000/user/adddetails"
                    REACT_APP_addproject_method = "POST"
                    REACT_APP_addexperience_api = "http://localhost:8000/user/addexperiences"
                    REACT_APP_addexperience_method = "POST"
                    REACT_APP_addeducation_api = "http://localhost:8000/user/addeducation"

                    ## Interview
                    REACT_APP_interview_api = 'http://localhost:8000/public/getdata'
                    REACT_APP_interview_method = 'POST'
                    REACT_APP_mcq_api = "http://localhost:8000/public/getmcq"
                    REACT_APP_mcq_method = "POST"


                    ## Organization section
                    REACT_APP_orgsignup_api = 'http://localhost:8000/organization/signup'
                    REACT_APP_orgsignup_method = 'POST'
                    REACT_APP_orglogin_api = 'http://localhost:8000/organization/login'
                    REACT_APP_orglogin_method = 'POST'
                    REACT_APP_organization_details ='http://localhost:8000/organization/organizationdetails'

                    REACT_APP_organization_details_method = 'POST'
                    REACT_APP_saveabout_api = 'http://localhost:8000/organization//addorganization'
                    REACT_APP_saveabout_method = 'POST'


                    ## Create Job
                    REACT_APP_createjob_api = "http://localhost:8000/organization/addjob"
                    REACT_APP_createjob_method = "POST"

                    ## closed Job
                    REACT_APP_closedjob_api = "http://localhost:8000/organization/getclosedjobs"
                    REACT_APP_closedjob_method = "POST"

                    ## posted Jobs
                    REACT_APP_postedjob_api = "http://localhost:8000/organization/getopenjobs"
                    REACT_APP_postedjob_method = "POST"
                    REACT_APP_handleclosejob_api ="http://localhost:8000/organization/closejob"
                    REACT_APP_handleclosejob_method = "POST"


                    ## community
                    REACT_APP_community_api = "http://localhost:8000/public/getpost"
                    REACT_APP_community_method = "POST"

                    ## Add Post
                    REACT_APP_addpost_api = "http://localhost:8000/public/addpost"
                    REACT_APP_addpost_method = "POST"

                    REACT_APP_userdetails_api = "http://localhost:8000/user/userdetails"
                    REACT_APP_userdetails_method = "POST"


                    REACT_APP_organization_saveabout_api = "http://localhost:8000/organization/addorganization"
                    REACT_APP_organization_saveabout_method = "POST"



                    REACT_APP_profile_datas_api = "http://localhost:8000/public/getprofdatas"
                    REACT_APP_profile_data_api = "http://localhost:8000/public/getprofdata"

                    '''           // Replace with actual values or load from Jenkins credentials
                }

                dir('backend') {
                    writeFile file: '.env', text: '''
                    MONGODB_URI = mongodb+srv://sudharsan:tZeMedYUE0h6JDjH@cluster0.m6ifiu6.mongodb.net/MERN?retryWrites=true&w=majority&appName=Cluster0
                    TOKEN_SECRET_KEY = "aasndf;asdnioeewknavn;klfkeww;kl"
                    FRONTEND_URL = http://localhost:3000
                    HOST=smtp.gmail.com
                    SERVICE=gmail
                    EMAIL_USER=sihsamplemail@gmail.com
                    EMAIL_PASSWORD=Ssample@123
                    ORG_TOKEN_SECRET_KEY = "enfriendapolayaarumacha"

                    PORT = 8000
                    '''           // Replace with actual values or use Jenkins secrets
                }
            }
        }
        stage('Install Dependencies & Build') {
            steps {
                echo "Installing dependencies and building frontend/backend..."
                dir('frontend') {
                    bat 'npm config set registry https://registry.npmjs.org/'
                    bat 'npm install'
                }
                dir('backend') {
                    bat 'npm install'    // Install backend dependencies
                    // If you have a build step for backend (e.g., TypeScript compilation), add it here
                }
            }
        }

        stage('Test') {
            steps {
                echo "Running tests on frontend and backend..."
                dir('frontend') {
                    bat 'npm test || exit 0'  // Run frontend tests, and ignore errors if any
                }

                dir('backend') {
                    bat 'npm test || exit 0'  // Run backend tests, and ignore errors if any
                }
            }
        }


        stage('B
        ') {
            steps {
                echo "Building Docker images for frontend and backend..."
                
                // Frontend Docker build
                dir('frontend') {
                    bat "docker build -t %IMAGE_FRONTEND%:%IMAGE_TAG% ."
                    bat "docker tag %IMAGE_FRONTEND%:%IMAGE_TAG% %IMAGE_FRONTEND%:latest"
                }

                // Backend Docker build
                dir('backend') {
                    bat "docker build -t %IMAGE_BACKEND%:%IMAGE_TAG% ."
                    bat "docker tag %IMAGE_BACKEND%:%IMAGE_TAG% %IMAGE_BACKEND%:latest"
                }
            }
        }

        stage('Deploy (Optional)') {
            steps {
                echo "Deployment step placeholder - customize based on your target platform"
                // Optional: Add commands for deployment (e.g., Docker Compose up, SSH to remote servers, etc.)
            }
        }
    }

    post {
        always {
            echo "Cleaning up Docker images locally..."
            // Logout from Docker Hub and remove locally cached images
            bat 'docker logout'
            bat "docker rmi %IMAGE_FRONTEND%:%IMAGE_TAG% || exit 0"
            bat "docker rmi %IMAGE_BACKEND%:%IMAGE_TAG% || exit 0"
        }
    }
}
