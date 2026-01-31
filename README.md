# HugoChat

You can find HugoChat [here](https://hugo-chat.noratrieb.dev)!

![image](https://user-images.githubusercontent.com/48135649/114876059-3caa9b80-9dfe-11eb-9d66-519e05a4771d.png)

## What is HugoChat?

HugoChat is a simple chat platform for everyone.  
There is no need to create an account, just open it and start. You can change your name by clicking on yourself on the
right side.

There are many rooms where you can write, and you can even create new rooms.  
You can also create an unlisted room that can only be accessed directly by entering the url.

Your user account is stored temporarily in session storage and gets deleted from the server when you remain offline for
more than 10 seconds.

*HugoChat stores all its messages forever, but the messages get partly anonymized after the sender user account was
deleted. Content, username (not uniquely identifiable) and timestamp are stored.*

*HugoChat is also **not** very secure, one can easily do things as if they were another user. This is not a very big
problem though because all userId info is only temporary.*

### Technologies used 
 * Spring Boot REST API
 * React/Typescript with create-react-app
 * PostgreSQL

## How to run HugoChat

What you need:

- Java (to run the backend)
- Docker (postgres image for the database)
- NodeJS (for the frontend)
- Yarn (nodejs package manager)

Clone the repository.

### Database

Docker Container run:  
`docker run -d -p 5432:5432 --name HugoChat -e POSTGRES_PASSWORD=huGO123.corsBOSS postgres`

to reset the db:

```bat
docker stop HugoChat
docker rm HugoChat
docker run -d -p 5432:5432 --name HugoChat -e POSTGRES_PASSWORD=huGO123.corsBOSS postgres
docker attach HugoChat
```

### Backend

Then, build and run the Spring Boot backend.  
`gradlew bootRun`

### Frontend

Lastly, either run the react app with  
`yarn start`

or build it first with  
`yarn build`

and then serve it on a webserver or locally with  
`serve -s build`

**Make sure that the url in hugo-client/src/services/AxiosUtility.ts leads to the backend and the ports are open**
