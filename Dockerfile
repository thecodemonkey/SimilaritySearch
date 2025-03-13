FROM openjdk:21-jdk-slim
LABEL authors="TheCodemonkey"

WORKDIR /app
COPY build/libs/similarity-search.jar similarity-search.jar
EXPOSE 7070

# Anwendung starten
ENTRYPOINT ["java", "-jar", "similarity-search.jar"]