pipeline {
  agent any

  environment {
    WINDOWS_SERVER = '10.130.254.5'   // e.g. 192.168.1.50
    WINRM_CREDENTIALS = 'winrm-jenkins-deploy'        // Jenkins credentials ID
    REMOTE_TEMP_DIR = 'C:\\temp\\deploy'              // where files will be copied on Windows
    IIS_SITE_PATH = 'C:\\Sites\\dev\\cicdreact'// target path on IIS server
    APP_POOL_NAME = 'dev'                  // name of app pool (optional)
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install & Build') {
      steps {
        bat 'npm install'         // if Jenkins agent is linux/mac; if Windows agent: use bat
        bat 'npm run build'
      }
    }

    stage('Package') {
      steps {
        bat 'rm -f build.zip || true'
        bat 'zip -r build.zip build'
        archiveArtifacts artifacts: 'build.zip', fingerprint: true
      }
    }

    stage('Deploy to IIS') {
      steps {
        script {
          // Use WinRM client plugin step
          winRMClient(
            hostName: env.WINDOWS_SERVER,
            credentialsId: env.WINRM_CREDENTIALS,
            winRMOperations: [
              // copy files
              [ sendFile: [ source: 'build.zip', destination: "${env.REMOTE_TEMP_DIR}\\\\build.zip", configurationName: '' ] ],
              [ sendFile: [ source: 'deploy\\\\remote-deploy.ps1', destination: "${env.REMOTE_TEMP_DIR}\\\\remote-deploy.ps1", configurationName: '' ] ],
              // run deploy script (execute PowerShell)
              [ invokeCommand: [ command: "powershell -ExecutionPolicy Bypass -File ${env.REMOTE_TEMP_DIR}\\\\remote-deploy.ps1 -zipPath ${env.REMOTE_TEMP_DIR}\\\\build.zip -targetPath '${env.IIS_SITE_PATH}' -appPool '${env.APP_POOL_NAME}'" ] ]
            ]
          )
        }
      }
    }
  }

  post {
    success {
      echo 'Deployment finished successfully'
    }
    failure {
      echo 'Deployment failed'
    }
  }
}
