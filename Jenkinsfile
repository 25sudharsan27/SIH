pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
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
                    bat 'del /f /s /q node_modules && rmdir /s /q node_modules' // Clean node_modules
                    bat 'npm cache clean --force'
                    bat 'npm install'
                    bat 'npm run build'
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
                echo|set /p=%DOCKERHUB_CREDENTIALS_PSW%|docker login -u %DOCKERHUB_CREDENTIALS_USR% --password-stdin
                '''
            }
        }

        stage('Tag & Push Images') {
            steps {
                echo "Tagging and pushing frontend and backend images to Docker Hub..."

                bat """
                docker tag backend %IMAGE_BACKEND%:%TAG%
                docker tag frontend %IMAGE_FRONTEND%:%TAG%

                docker push %IMAGE_BACKEND%:%TAG%
                docker push %IMAGE_FRONTEND%:%TAG%
                """
            }
        }

        stage('Deploy (Optional)') {
            steps {
                echo 'Add SSH, Docker Compose UP or server deployment steps here if needed.'
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
