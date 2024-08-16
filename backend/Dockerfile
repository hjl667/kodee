FROM openjdk:17-jdk-alpine
LABEL authors="hongji"
ARG JAR_FILE=target/*.jar
COPY ./target/spring-boot-crud-example-2-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar", "/app.jar"]