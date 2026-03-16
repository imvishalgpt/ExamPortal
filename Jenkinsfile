pipeline {
    agent any

    stage('Clone Repository') {
    steps {
        git branch: 'main', url: 'https://github.com/imvishalgpt/examportal.git'
    }
}

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                sh '''
                pkill -f examportal || true
                nohup java -jar backend/target/*.jar > app.log 2>&1 &
                '''
            }
        }

    }
}
