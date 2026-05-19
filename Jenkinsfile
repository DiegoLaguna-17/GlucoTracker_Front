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
                :: Creamos la carpeta limpia y copiamos los archivos compilados
                if not exist "C:\\Deploy\\frontend" mkdir "C:\\Deploy\\frontend"
                xcopy "frontend\\dist\\frontend\\browser\\*" "C:\\Deploy\\frontend\\" /E /Y
                '''
                
                echo 'Levantando frontend con PM2...'
                bat '''
                set PM2_HOME=C:\\Users\\diego\\.pm2
                
                call pm2 delete frontend || echo "Proceso limpio"
                
                :: Aquí está el truco: le pasamos la RUTA ABSOLUTA directamente
                call pm2 serve "C:\\Deploy\\frontend" 4200 --name "frontend" --spa
                
                call pm2 save
                '''
            }
        }
    }
}