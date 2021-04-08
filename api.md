# API Routes
Base route: `/api/v1`

## Login
`POST` `/login`  

Example Body
```json
{
  "name": "corsin"
}
```

## Members
`GET` `/members`

Response:  
```json
{
  "members": ["corsin", "timo", "hugo"]
}
```

## Messages
### All Messages
`GET` `/messages`

Response:
```json
{
  "messages": [
    {
      "sentBy": "corsin",
      "body": "hallo",
      "sentOn": 2643578034265
    },
    {
      "sentBy": "hugo",
      "body": "hallo leut",
      "sentOn": 4382759627480
    }
  ]
}
```

### New Messages for a User
`GET` `/messages/new/{userId}`

Response: 
```json
{
  "messages": [
    {
      "sentBy": "corsin",
      "body": "hallo",
      "sentOn": 2643578034265
    },
    {
      "sentBy": "hugo",
      "body": "hallo leut",
      "sentOn": 4382759627480
    }
  ]
}
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

