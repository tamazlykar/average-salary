node {
  deleteDir()
  checkout scm

  stage('NPM install') {
    sh 'npm install'
  }

  stage('Unit and Integration Testing') {
      sh 'npm run test -- --single-run --no-progress --browser=ChromeNoSandbox'
  }

  stage('System Testing') {
      sh 'npm run e2e -- --no-progress --config=protractor-ci.conf.js'
  }

  stage('Lint') {
    sh 'npm run lint'
  }
}
