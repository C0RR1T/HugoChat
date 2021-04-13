# API Routes

Base Route: `/api/v2`

## DTO

### MessageDTO

| Field Name    | Type           | Description     |
| ------------- |--------------- | -------------   |
| id            | string (uuid)  |  message id     |
| body          | string         |  message body   |
| sentById      | string (uuid)  |  user id        |
| sentBy        | string         |  user name      |
| sentOn        | number (long)  |  UNIX-timestamp |

Example:

```json
  {
  "sentBy": "hugo",
  "sentByID": "8b34fb07-83bd-47e0-b317-7dbb8e3985a8",
  "body": "hallo leut",
  "sentOn": 4382759627480,
  "id": "881f5729-c3fb-425d-9ea7-a9f4d82980d3"
}
```

### UserDTO

| Field Name    | Type           | Description     |
| ------------- |--------------- | -------------   |
| id            | string (uuid)  |  user id        |
| name          | string         |  user name      |

Example:

```json
{
  "id": "8b343b07-83bd-47e0-b317-7dbb8e3985a8",
  "name": "corsin"
}
```

### RoomDTO

| Field Name    | Type           | Description     |
| ------------- |--------------- | -------------   |
| id            | string (uuid)  |  room id        |
| name          | string         |  room name      |

Example:

```json
{
  "id": "8b343b07-83bd-48e0-b317-7dbb8e3985a8",
  "name": "main"
}
```

---

## Rooms

### Create Room

`POST` `/rooms/{roomId}/messages`

Room names have to be unique.  
`400` if room name is already taken

Request body: `RoomDTO` without id

```json
{
  "name": "room name"
}
```

Response body: `RoomDTO`

### Get all Rooms

`GET` `/rooms`

Response body: `RoomDTO[]`

## User

### Log in

`POST` `/users`

Request body: `UserDTO` without id  
Example:

```json
{
  "name": "corsin"
}
```

Response body: `UserDTO`

### Change username

`PUT` `/users`

Request body: `UserDTO`

Response body: `UserDTO`

### Get active users in a room

`GET` `/rooms/{roomId}/users`

Response body: `UserDTO[]`

### Send still here

`PATCH` `/rooms/{roomId}/users/active/{uuid}`

No request or response body

## Messages

### Get n messages before a specific message

`GET` `/rooms/{roomId}/messages/old/{messageid}?amount={n}`

Response: `MessageDTO`

### Get all message after a specific message

`GET` `/rooms/{roomId}/messages/new/{messageid}`

Response Body: `MessageDTO[]`

### Send a Message

`POST` `/rooms/{roomId}/messages`

Example body: `MessageDTO` without id

```json
{
  "sentBy": "8b343b07-83bd-47e0-b317-7dbb8e3985a8",
  "body": "hi",
  "sentOn": 5590432785885
}
```

