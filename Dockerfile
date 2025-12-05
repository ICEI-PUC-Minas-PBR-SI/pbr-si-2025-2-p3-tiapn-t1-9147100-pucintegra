# Etapa 1: Construção (Build)
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Etapa 2: Execução
FROM openjdk:17-jdk-slim
WORKDIR /app
# Copia o JAR gerado na etapa anterior
COPY --from=build /app/target/api-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]