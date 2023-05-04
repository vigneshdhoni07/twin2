# Api Endpoints

All API routes are present in this directory. Below are the files and their corresponding endpoints.

## authRoute.js

---

Register a new User for Twin V Digital App

```http
  POST /api/auth/createuser
```

| Parameter         | Type     | Description                             |
| :---------------- | :------- | :-------------------------------------- |
| `name`            | `string` | **Required**. Name of the user          |
| `mobile`          | `string` | **Required**. Mobile number of the user |
| `email`           | `string` | **Required**. Email of the user         |
| `password`        | `string` | **Required**. Login password            |

### Request Body

```json
{
    "name":"Test1", 
    "mobile":"9876543210", 
    "email":"Test1@test.com", 
    "password":"12345678"
}
```
### Response 

```json
    {
   "message":"User Created Successfully"
    }
```

### Request Body

```json
{
     
    "mobile":"9876543210", 
    "email":"Test1@test.com", 
    "password":"12345678"
}
```

### Response 

```json
    {
    "message": "Name Must Be Provided"
    }
```
### Request Body

```json
{
    "name":"Test1", 
     "email":"Test1@test.com", 
    "password":"12345678"
}
```

### Response 
```json
{
 "message": "Mobile Number Is Missing"
}
```

### Request Body

```json
{
    "name":"Test1", 
    "mobile":"9876543210", 
     "password":"12345678"
}
```
### Response 

```json
    {
    "message": "Email Must Be Provided"
    }
```
### Request Body

```json
{
    "name":"Test1", 
    "mobile":"9876543210", 
    "email":"Test1@test.com", 
    
}
```
### Response 

```json
    {
   "message": "Password Is Missing"
    }
```

```json
{
    "name":"Test1", 
    "mobile":"9876543210", 
    "email":"Test1@test.com", 
    "password":"12345678"
}
```
### Response 

```json
    {
   "message": "Mobile Number Already Exist"
    }
```


---

User Login for Twin V Digital App

```http 
api/auth/user_login
```



| Parameter         | Type     | Description                             |
| :---------------- | :------- | :-------------------------------------- |
| `email`           | `string` | **Required**. Email of the user         |
| `password`        | `string` | **Required**. Login password            |


### Request Body
```json
{
    "email":"Test1@test.com", 
    "password":"12345678"
}
```

### Response
```json
{
     "message": "Login Success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NGI2MmIyYzY3YmM2MTU3NjZlYTNhMSIsImlhdCI6MTY4MjY2NTUzOSwiZXhwIjoxNjg1MjU3NTM5fQ.eq8RjKM8sqKUurlU5r_EtPrOt3YhsWOlWDwwLvJGoZQ"
}
```
### Request Body
```json
{
     "password":"12345678"
}
```

### Response
```json
{
 "Message": "Email Must Be Provided"
}
```

### Request Body
```json
{
     "email":"Test1@test.com",
    
}
```

### Response
```json
{
  "Message": "Password Is Missing"
}
```

### Request Body
```json
{
    "email":"Test1@test.com", 
    "password":"1234567"
}
```

### Response

```json
{
    "message": "Wrong Password"
}
```


