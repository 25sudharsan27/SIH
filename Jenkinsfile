pipeline {
    agent any

    environment {
        // Optional: You can use these if needed
        COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/25sudharsan27/SIH'
            }
        }

        stage('Inject .env files') {
            steps {
                bat '''
                echo Copying .env files...
                copy C:\\Users\\sudharsan\\envs\\backend.env backend\\.env
                copy C:\\Users\\sudharsan\\envs\\frontend.env frontend\\.env
                '''
            }
        }

        stage('Build and Run Docker Containers') {
            steps {
                bat '''
                echo Stopping previous containers...
                docker-compose -f docker-compose.yml down

                echo Starting new containers...
                docker-compose -f docker-compose.yml up --build -d
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Deployment failed!'
        }
    }
}
