pipeline {
    agent any

    tools {
        nodejs 'NodeJS 22.21'
    }

    stages {
        stage('Clonar código') {
            steps {
                checkout scm
            }
        }

        stage('Instalar dependencias') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                }
            }
        }

        stage('Build Angular') {
            steps {
                dir('frontend') {
                    bat 'npm run build -- --configuration production'
                }
            }
        }

        stage('Deploy Frontend') {
            steps {
                dir('frontend') {
                    bat '''
                    npm install -g serve
                    pm2 delete frontend
                    pm2 start "serve -s dist/frontend -l 4200" --name frontend
                    pm2 save
                    '''
                }
            }
        }
    }
}