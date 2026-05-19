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
                
                // 1. Entramos EXACTAMENTE a la carpeta donde están los archivos compilados
                dir('frontend/dist/frontend/browser') {
                    bat '''
                    set PM2_HOME=C:\\Users\\diego\\.pm2
                    
                    :: 2. Borramos la instancia anterior para limpiar la memoria de PM2.
                    :: (El "|| echo" evita que el pipeline falle si el proceso no existe)
                    pm2 delete frontend || echo "Proceso limpio"
                    
                    :: 3. Servimos el directorio actual (.) para eliminar problemas de rutas
                    pm2 serve . 4200 --name "frontend" --spa
                    
                    pm2 save
                    '''
                }
            }
        }
    }
}