docker stop HugoChat
docker rm HugoChat
docker run -d -p 5432:5432 --name HugoChat -e POSTGRES_PASSWORD=huGO123.corsBOSS postgres
docker attach HugoChat
