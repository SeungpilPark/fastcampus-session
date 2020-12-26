# FastCampus DevOps Tutorial - Session Application

## Start Api Server

다음의 userdata 로 EC2 를 시작합니다.
해당 스크립트는 git, jdk11, gradle 을 설치하고, 어플리케이션을 빌드한 후 서비스로 등록합니다.

```
#!/bin/bash
yum -y install git
git clone https://github.com/SeungpilPark/fastcampus-session /root/fastcampus-session
sh /root/fastcampus-session/ec2-install.sh
```

다음의 명령어로 EC2 userdata 실행 로그를 볼 수 있습니다.

```
sudo tail -f /var/log/cloud-init-output.log
```

다음의 명령어로 session-service 어플리케이션 로그를 볼 수 있습니다.

```
sudo tail -f /var/lib/session-service/logs/session-service.log
```

서비스 중단, 실행

```
sudo service session-service start (or stop)
```

## UI Static Contents

Vue.js 로 제작된 스태틱 컨텐츠는 session-ui/dist 에 있습니다.
강의 내용대로 CloudFront 를 통한 S3 bucket 에 배포를 진행하세요.
