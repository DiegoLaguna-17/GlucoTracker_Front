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

                echo Deteniendo frontend...
                :: ¡CRÍTICO! Usar call para que no se muera el script
                call pm2 delete frontend || exit /b 0

                timeout /t 2 >nul

                echo Eliminando carpeta...
                if exist "C:\\Deploy\\frontend" (
                    rmdir /S /Q "C:\\Deploy\\frontend"
                ) else (
                    echo Carpeta no existia
                )

                echo Creando carpeta...
                mkdir "C:\\Deploy\\frontend"

                echo Copiando build...
                xcopy "frontend\\dist\\frontend\\browser\\*" "C:\\Deploy\\frontend\\" /E /Y /I
                
                echo Permisos...
                icacls "C:\\Deploy\\frontend" /grant Todos:(OI)(CI)F /T
                '''

                echo 'Levantando frontend con PM2...'

                bat '''
                set PM2_HOME=C:\\Users\\diego\\.pm2

                :: 1. Entramos físicamente a la unidad y carpeta de despliegue
                cd /d "C:\\Deploy\\frontend"

                :: 2. Levantamos PM2 usando el directorio actual (.)
                call pm2 start npx --name frontend -- serve -s "C:\\Deploy\\frontend" -l 4200

                call pm2 save
                '''
            }
        }
    }
}