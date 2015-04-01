# Users
Services related to users using the **Users API**.

## Current user

```shell
# EXAMPLE REQUEST
$ curl "https://app.receiptful.com/api/v1/users/current" \
  -H "X-ApiKey: YOUR_API_KEY"
```

> EXAMPLE RESPONSE

```json
{
    "publicKey": "abcd",
    "name": {
        "firstName": "John",
        "lastName": "Doe"
    }
}
```

### Retrieve user information [GET]

`https://app.receiptful.com/api/v1/users/current`

The current API user.

<aside class="success">
Response 200 (application/json)
</aside>
