FROM java AS build

WORKDIR /app

COPY ./gradlew ./gradle ./
RUN ./gradlew

COPY . .
RUN ./gradlew jar

# ---

FROM gcr.io/distroless/java17-debian11

WORKDIR /app

COPY --from=build build/libs/HugoServer-0.0.1-SNAPSHOT.war HugoServer.war
RUN ["java", "-jar", "HugoServer.war"]