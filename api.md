# API Routes

Base route: `/api/v1`

## User

### Log in

`POST` `/users`

Example Body

```json
{
  "name": "corsin"
}
```

Response:

```json
{
  "id": "8b343b07-83bd-47e0-b317-7dbb8e3985a8",
  "name": "corsin"
}
```

### Get active users

`GET` `/users`

Response:

```json
[
  {
    "id": "8b343b07-83bd-47e0-b317-7dbb8e3985a8",
    "name": "corsin"
  },
  {
    "id": "6b343b07-83bd-47e0-b317-7dbb8e3985a8",
    "name": "timo"
  },
  {
    "id": "8b34fb07-83bd-47e0-b317-7dbb8e3985a8",
    "name": "hugo"
  }
]
```

### Change name

`PUT` `/users`

Example Body:

```json
{
  "id": "8b343b07-83bd-47e0-b317-7dbb8e3985a8",
  "name": "corsin"
}
```

Example Response:

```json
{
  "id": "8b343b07-83bd-47e0-b317-7dbb8e3985a8",
  "name": "corsin"
}
```

### Send still here

`PATCH` `/users/active/{uuid}`

No request or response body

## Messages

### x Messages before the last message

`GET` `/messages/old/{messageid}?amount={n}`

Response:

```json
[
  {
    "sentBy": "corsin",
    "sentByID": "8b343b07-83bd-47e0-b317-7dbb8e3985a8",
    "body": "hallo",
    "sentOn": 2643578034265,
    "id": "881f5729-c3fb-425d-9ea7-a7f4d82980d3"
  },
  {
    "sentBy": "hugo",
    "sentByID": "8b34fb07-83bd-47e0-b317-7dbb8e3985a8",
    "body": "hallo leut",
    "sentOn": 4382759627480,
    "id": "881f5729-c3fb-425d-9ea7-a9f4d82980d3"
  }
]
```

### New Messages since the last message

`GET` `/messages/new/{messageid}`

Response:

```json
[
  {
    "sentBy": "corsin",
    "sentByID": "8b343b07-83bd-47e0-b317-7dbb8e3985a8",
    "body": "hallo",
    "sentOn": 2643578034265,
    "id": "881f5729-c3fb-425d-9ea7-a7f4d82980d3"
  },
  {
    "sentBy": "hugo",
    "sentByID": "8b34fb07-83bd-47e0-b317-7dbb8e3985a8",
    "body": "hallo leut",
    "sentOn": 4382759627480,
    "id": "881f5729-c3fb-425d-9ea7-a9f4d82980d3"
  }
]
```

### Send Message

`POST` `/messages/`

Example body:

```json
{
  "sentBy": "8b343b07-83bd-47e0-b317-7dbb8e3985a8",
  "body": "hi",
  "sentOn": 5590432785885
}
```
