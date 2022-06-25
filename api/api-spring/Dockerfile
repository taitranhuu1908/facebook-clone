# jdk 18 maven
FROM maven:3.5.4-jdk-18

WORKDIR app

RUN mvn clean package -DskipTests

COPY target/app.jar app.jar

CMD ["java", "-jar", "app.jar"]