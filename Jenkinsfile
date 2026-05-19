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
                :: Crear carpeta si no existe
                if not exist "C:\\Deploy\\frontend" mkdir "C:\\Deploy\\frontend"

                :: Limpiar contenido anterior
                rmdir /S /Q "C:\\Deploy\\frontend"
                mkdir "C:\\Deploy\\frontend"

                :: Copiar archivos build
                xcopy "frontend\\dist\\frontend\\browser\\*" "C:\\Deploy\\frontend\\" /E /Y

                :: Dar permisos (SOLUCION 403)
                icacls "C:\\Deploy\\frontend" /grant Everyone:(OI)(CI)F /T
                '''

                echo 'Levantando frontend con PM2...'

                bat '''
                set PM2_HOME=C:\\Users\\diego\\.pm2

                :: Eliminar proceso si existe
                pm2 delete frontend || echo "No existía proceso"

                :: Usar servidor más estable que pm2 serve
                pm2 start serve --name frontend -- -s "C:\\Deploy\\frontend" -l 4200

                :: Guardar estado
                pm2 save
                '''
            }
        }
    }
}