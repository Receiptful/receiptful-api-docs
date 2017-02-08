# Partner Apps API

This API comprises of management endpoints for Partner Apps. Because they're unrelated to any Store, authentication is done through [HMAC](#hmac).

## Get Partner App

Returns the saved info for the authenticated Partner App

```shell
# EXAMPLE REQUEST
$ curl https://app.conversio.com/api/v1/partners/ \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1N2I1YWEzYjA0NmFiZmIwNTNkODBiNTIifQ.sxd8uG4EkeIXHsIIVELrfGTIZcaTFE9a9YY-8HGHuOQ
```

> EXAMPLE RESPONSE

```json
{
  "data": {
    "id": "57b5aa3b046abfb053d80b52",
    "name": "Epic Forms",
    "email": "hello@epicforms.com",
    "website": "https://epicforms.com"
  }
}
```

### Show Current Partner App [GET]

<aside class="success">
  Response 200
</aside>

### Response Body

Returns JSON with a `data` key which contains the info for the authenticated Partner App:

|Key                  |Details|
|--------------------:|-----------|
|**id:**              |**string**|
|                     |The Partner App's ID. This is also the `client_id` used in OAuth.|
|**name:**            |**string**|
|                     |The name of this Partner App.|
|**email:**           |**string**|
|                     |The contact email for this Partner App.|
|**website:**         |**string**|
|                     |The Partner App's homepage.|
