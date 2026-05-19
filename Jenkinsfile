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
                    bat 'call npm install'
                }
            }
        }

        stage('Build Angular') {
            steps {
                dir('frontend') {
                    // Build producción
                    bat 'call npm run build'
                }
            }
        }

        stage('Verificar dist') {
            steps {
                dir('frontend') {
                    bat 'dir dist\\frontend\\browser'
                }
            }
        }

        stage('Deploy Frontend') {
            steps {
                echo 'Preparando directorio de producción...'

                bat '''
                set PM2_HOME=C:\\Users\\diego\\.pm2

                :: 1. Detener frontend (LIBERA LA CARPETA)
                pm2 delete frontend || echo "No existía proceso"

                :: 2. Esperar un poco (importante en Windows)
                timeout /t 2

                :: 3. Eliminar carpeta
                rmdir /S /Q "C:\\Deploy\\frontend" || echo "No se pudo borrar (ya estaba vacía)"

                :: 4. Crear carpeta limpia
                mkdir "C:\\Deploy\\frontend"

                :: 5. Copiar build
                xcopy "frontend\\dist\\frontend\\browser\\*" "C:\\Deploy\\frontend\\" /E /Y

                :: 6. Permisos (FIX español)
                icacls "C:\\Deploy\\frontend" /grant Todos:(OI)(CI)F /T
                '''

                echo 'Levantando frontend con PM2...'

                bat '''
                set PM2_HOME=C:\\Users\\diego\\.pm2

                pm2 start cmd --name frontend -- /c serve -s "C:\\Deploy\\frontend" -l 4200

                pm2 save
                '''
            }
        }
    }
}