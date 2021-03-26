# Users
Services related to users using the **Users API**.

## Current user

```shell
# EXAMPLE REQUEST
$ curl "https://commerce.campaignmonitor.com/api/v1/users/current" \
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

`https://commerce.campaignmonitor.com/api/v1/users/current`

The current API user.

<aside class="success">
Response 200 (application/json)
</aside>

## Uninstall

```shell
# EXAMPLE REQUEST
$ curl "https://commerce.campaignmonitor.com/api/v1/users/uninstall" \
  -X POST \
  -H "X-ApiKey: YOUR_API_KEY"
```

### Uninstall the user/app [POST]

`https://commerce.campaignmonitor.com/api/v1/users/uninstall`

Tells CM Commerce to uninstall the user associated with the given API key. Among
other things, this automatically unsubscribes the user from a premium plan.

<aside class="success">
Response 204
</aside>
