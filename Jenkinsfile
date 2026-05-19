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
                echo 'Preparando el directorio de producción...'
                
                bat '''
                :: 1. Crear una carpeta fuera de Jenkins (sin puntos en el nombre)
                if not exist "C:\\Deploy\\frontend" mkdir "C:\\Deploy\\frontend"
                
                :: 2. Copiar los archivos compilados allí 
                :: /E (copia subcarpetas), /Y (sobreescribe sin preguntar)
                xcopy "frontend\\dist\\frontend\\browser\\*" "C:\\Deploy\\frontend\\" /E /Y
                '''
                
                echo 'Levantando frontend con PM2...'
                
                // 3. Cambiamos el contexto a la nueva carpeta limpia
                dir('C:\\Deploy\\frontend') {
                    bat '''
                    set PM2_HOME=C:\\Users\\diego\\.pm2
                    
                    call pm2 delete frontend || echo "Proceso limpio"
                    call pm2 serve . 4200 --name "frontend" --spa
                    call pm2 save
                    '''
                }
            }
        }
    }
}