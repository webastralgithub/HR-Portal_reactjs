node(){
    stage('Cloning Git') {
        checkout scm
    }
        
    stage('Install dependencies') {
        nodejs('nodejs') {
            sh 'npm install'
            echo "Modules installed"
        }
        
    }
    stage('Build') {
        nodejs('nodejs') {
            sh 'npm run build'
            echo "Build completed"
        }
        
    }

    stage('Package Build') {
        sh "tar -zcvf portal.tar.gz build/*"
    }

    stage('Artifacts Creation') {
        fingerprint 'portal.tar.gz'
        archiveArtifacts 'portal.tar.gz'
        echo "Artifacts created"
    }

    stage('Stash changes') {
        stash allowEmpty: true, includes: 'bundlemort.tar.gz', name: 'buildArtifacts'
    }
}

node('devserver') {
    echo 'Unstash'
    unstash 'buildArtifacts'
    echo 'Artifacts copied'

    echo 'Copy'
    sh "yes |  cp -R portal.tar.gz /var/www/html && cd /var/www/html &&  tar -xvf portal.tar.gz && rm -rf portal/* && cp -r build/*  /var/www/html/portal/ && rm -rf /var/www/html/build"
    echo 'Copy completed'
}
