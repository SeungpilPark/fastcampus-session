# install jdk11
curl -L https://corretto.aws/downloads/latest/amazon-corretto-11-x64-linux-jdk.rpm -o jdk11.rpm
yum -y localinstall jdk11.rpm
/usr/sbin/alternatives --set java /usr/lib/jvm/java-11-amazon-corretto/bin/java
rm -rf jdk11.rpm

# install gradle
mkdir /opt/gradle
wget https://services.gradle.org/distributions/gradle-6.7.1-bin.zip
unzip -d /opt/gradle gradle-6.7.1-bin.zip

tee -a /etc/profile.d/gradle.sh > /dev/null <<EOF
export GRADLE_HOME=/opt/gradle/gradle-6.7.1
export PATH=\${GRADLE_HOME}/bin:\${PATH}
EOF
chmod +x /etc/profile.d/gradle.sh
source /etc/profile.d/gradle.sh

# install git and build
cd /root/fastcampus-session
gradle build

# make service
mkdir -p /var/lib/session-service/logs
install -m 777 /dev/null /var/lib/session-service/logs/session-service.log
cp /root/fastcampus-session/session-service/build/libs/session-service.jar /var/lib/session-service/
ln -s /var/lib//session-service/session-service.jar /etc/init.d/session-service
chmod 755 /etc/init.d/session-service

touch /var/lib/session-service/session-service.conf
tee -a /var/lib/session-service/session-service.conf > /dev/null <<EOF
PID_FOLDER=/var/lib/session-service
LOG_FOLDER=/var/lib/session-service/logs
JAVA_OPTS="-server -Xms512m -Xmx512m"
EOF

# run service and auto-start on reboot
service session-service start
chkconfig session-service on
