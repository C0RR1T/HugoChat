# HugoChat
figma
[figma](https://www.figma.com/file/50LPnzsXi{nein}yuAFFxgQnlHzO/Untitled?node-id=0%3A1) (auf jeden fall up to date das ui sieht genau so aus)


postgres-pw: "huGO123.corsBOSS"

default time zone utc


link zum react frontend: [haha](http://localhost:3000/)



Docker Container run: 

`docker run -d -p 5432:5432 --name HugoChat -e POSTGRES_PASSWORD=huGO123.corsBOSS postgres`

batch file wenn alles kaputt geht:
```bat
docker stop HugoChat
docker rm HugoChat
docker run -d -p 5432:5432 --name HugoChat -e POSTGRES_PASSWORD=huGO123.corsBOSS postgres
docker attach HugoChat
```

main room uuid:
00000000-0000-0000-0000-000000000000


### TODO:
* message received add message
* user added event
* user removed event
* user renamed event
* (user list changed event)
