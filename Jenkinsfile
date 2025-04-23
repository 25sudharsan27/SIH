pipeline {
    agent any

    stages {
        stage('Clone Repo') {
            steps {
                git 'https://github.com/25sudharsan27/SIH.git'
            }
        }

        stage('Inject .env Files') {
            steps {
                bat 'copy D:\\OUTOFBOX\\Full-Stack-Projects\\sih\\SIH\\frontend\\.env frontend\\.env'
                bat 'copy D:\\OUTOFBOX\\Full-Stack-Projects\\sih\SIH\\backend\\.env backend\\.env'
            }
        }

        stage('Docker Compose Up') {
            steps {
                bat 'docker-compose down'
                bat 'docker-compose up --build -d'
            }
        }
    }
}
