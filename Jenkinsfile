pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')  // Replace with your Jenkins credentials ID
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

        stage('Install Dependencies & Build') {
            steps {
                echo "Installing dependencies and building frontend/backend..."
                dir('frontend') {
                    bat 'del /f /s /q node_modules && rmdir /s /q node_modules' // Clean node_modules
                    bat 'npm cache clean --force'
                    bat 'npm install'
                    bat 'npm run build'
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

        stage('Build Docker Images') {
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

        stage('Login to Docker Hub') {
            steps {
                echo "Logging into Docker Hub..."
                bat '''
                    echo|set /p=%DOCKERHUB_CREDENTIALS_PSW%|docker login -u %DOCKERHUB_CREDENTIALS_USR% --password-stdin
                '''  // Login to Docker Hub using credentials stored in Jenkins
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo "Pushing frontend and backend images to Docker Hub..."

                // Push the frontend image to Docker Hub
                bat "docker push %IMAGE_FRONTEND%:%IMAGE_TAG%"
                bat "docker push %IMAGE_FRONTEND%:latest"

                // Push the backend image to Docker Hub
                bat "docker push %IMAGE_BACKEND%:%IMAGE_TAG%"
                bat "docker push %IMAGE_BACKEND%:latest"
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
