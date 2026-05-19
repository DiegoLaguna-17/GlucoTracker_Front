pipeline {
    agent any

    tools {
        // Recuerda verificar que el nombre coincida en Global Tool Configuration
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
                    bat 'call npm install'
                }
            }
        }

        stage('Build Angular') {
            steps {
                dir('frontend') {
                    bat 'call npm run build'
                }
            }
        }

        // 🔍 DEBUG actualizado a la ruta de Angular 17+
        stage('Verificar dist') {
            steps {
                dir('frontend') {
                    bat 'dir dist\\frontend\\browser'
                }
            }
        }

        stage('Deploy Frontend') {
            steps {
                echo 'Levantando frontend con PM2...'
                
                dir('frontend/dist/frontend/browser') {
                    bat '''
                    set PM2_HOME=C:\\Users\\diego\\.pm2
                    
                    :: Siempre usar "call" antes de pm2 (o npm) en scripts multilinea de Windows
                    call pm2 delete frontend || echo "Proceso limpio"
                    call pm2 serve . 4200 --name "frontend" --spa
                    call pm2 save
                    '''
                }
            }
        }
    }
}