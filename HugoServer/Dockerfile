FROM gradle AS build

WORKDIR /app

COPY . .
RUN ./gradlew build
RUN ./gradlew jar

# ---

FROM gcr.io/distroless/java17

WORKDIR /app

COPY --from=build /app/build/libs/HugoServer-0.0.1-SNAPSHOT.jar /app/HugoServer.jar
ENTRYPOINT  ["java", "-jar", "/app/HugoServer.jar"]