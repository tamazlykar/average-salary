pipeline {
  agent {
    docker {
      image 'angular/ngcontainer'
    }
  }

  stages {
    stage('Dependency installation') {
      steps {
          sh 'npm install'
      }
    }

    stage('Linting') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('Unit and Integration Testing') {
      steps {
          sh 'xvfb-run -a npm run test -- --single-run --no-progress --browser=ChromeNoSandbox'
      }
    }

    stage('System Testing') {
      steps {
          sh 'xvfb-run -a npm run e2e -- --no-progress --config=protractor-ci.conf.js'
      }
    }

  }
}
