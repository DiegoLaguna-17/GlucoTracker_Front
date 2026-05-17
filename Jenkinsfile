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
                    serve -s dist -l 4200
                    '''
                }
            }
        }
    }
}