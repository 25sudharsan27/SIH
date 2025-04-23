pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub') // Make sure to replace with your Docker Hub credential ID in Jenkins
        IMAGE_BACKEND = "01sudharsan/sihbackend-app"
        IMAGE_FRONTEND = "01sudharsan/sihfrontend-app"
        TAG = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out source code..."
                checkout scm
            }
        }

        stage('Install Dependencies & Build') {
            steps {
                echo "Installing dependencies and building frontend/backend locally (optional for dev testing)..."
                dir('frontend') {
                    bat 'npm install'
                }
                dir('backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Docker Compose Build') {
            steps {
                echo "Building Docker images using docker-compose..."
                bat 'docker-compose build'
            }
        }

        stage('Docker Login') {
            steps {
                echo "Logging into Docker Hub..."
                bat '''
                    echo "Username: %DOCKERHUB_CREDENTIALS_USR%"
                    echo "Password: (hidden)"
                    echo|set /p=%DOCKERHUB_CREDENTIALS_PSW%|docker login -u %DOCKERHUB_CREDENTIALS_USR% --password-stdin
                '''
            }
        }

        stage('Tag & Push Images') {
            steps {
                echo "Tagging and pushing frontend and backend images to Docker Hub..."
                bat """
                    echo "Tagging backend image: %IMAGE_BACKEND%:%TAG%"
                    echo "Tagging frontend image: %IMAGE_FRONTEND%:%TAG%"
                    docker tag backend %IMAGE_BACKEND%:%TAG%
                    docker tag frontend %IMAGE_FRONTEND%:%TAG%

                    echo "Pushing backend image to Docker Hub..."
                    docker push %IMAGE_BACKEND%:%TAG%

                    echo "Pushing frontend image to Docker Hub..."
                    docker push %IMAGE_FRONTEND%:%TAG%
                """
            }
        }

        stage('Deploy (Optional)') {
            steps {
                echo 'Add SSH, Docker Compose UP or server deployment steps here if needed.'
                // Example: docker-compose up -d or deploy via SSH commands
            }
        }
    }

    post {
        always {
            echo "Cleaning up Docker images locally..."
            bat '''
                docker logout
                docker rmi %IMAGE_BACKEND%:%TAG% || exit 0
                docker rmi %IMAGE_FRONTEND%:%TAG% || exit 0
            '''
        }
    }
}
