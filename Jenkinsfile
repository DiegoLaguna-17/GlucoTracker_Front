pipeline {
    agent any

    tools {
        // Recuerda verificar que el nombre coincida en Global Tool Configuration
        nodejs 'NodeJS 20' 
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
                dir('frontend') {
                    bat '''
                    set PM2_HOME=C:\\Users\\diego\\.pm2
                    call npm install -g serve
                    
                    :: Ruta actualizada apuntando a la carpeta browser
                    pm2 restart frontend || pm2 start serve --name "frontend" -- -s dist/frontend/browser -l 4200
                    pm2 save
                    '''
                }
            }
        }
    }
}