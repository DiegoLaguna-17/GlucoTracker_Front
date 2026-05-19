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
                dir('frontend') {
                    bat '''
                    set PM2_HOME=C:\\Users\\diego\\.pm2
                    
                    :: Usamos "pm2 serve" en lugar del paquete "serve" externo
                    :: --spa asegura que el enrutamiento interno de Angular funcione
                    pm2 restart frontend || pm2 serve dist/frontend/browser 4200 --name "frontend" --spa
                    
                    pm2 save
                    '''
                }
            }
        }
    }
}