# Partner Apps API

This API comprises of management endpoints for Partner Apps. Because they're unrelated to any Store, authentication is done through [HMAC](#hmac).

## Get Partner App

Returns the saved info for the authenticated Partner App.

```shell
# EXAMPLE REQUEST
$ curl https://app.conversio.com/api/v1/partners/ \
  -H "Accept: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1N2I1YWEzYjA0NmFiZmIwNTNkODBiNTIifQ.sxd8uG4EkeIXHsIIVELrfGTIZcaTFE9a9YY-8HGHuOQ
```

> EXAMPLE RESPONSE

```json
{
  "data": {
    "id": "57b5aa3b046abfb053d80b52",
    "name": "Epic Forms",
    "email": "hello@epicforms.com",
    "website": "https://epicforms.com",
    "logo": "epicforms-logo.jpg",
    "redirectUri": "https://epicforms.com/oauth/auth"
  }
}
```

### Show Current Partner App [GET]

<aside class="success">
  Response 200
</aside>

### Response Body

Returns JSON with a `data` key which contains the info for the authenticated Partner App:

|Key             |Details|
|---------------:|-----------|
|**id:**         |**string**|
|                |The Partner App's ID. This is also the `client_id` used in OAuth.|
|**name:**       |**string**|
|                |The name of this Partner App.|
|**email:**      |**string**|
|                |The contact email for this Partner App.|
|**website:**    |**string**|
|                |The Partner App's homepage.|
|**logo:**       |**string**|
|                |The Partner App's logo, used in the OAuth authorize page. Can be a URL or a data URI.|
|**redirectUri:**|**string**|
|                |The redirect URI used during OAuth. This value **must match** the argument received in the authorize call.|

## Update Partner App

Updates the saved info for the authenticated Partner App. Use this to update a logo or an OAuth redirect URI.

```shell
# EXAMPLE REQUEST
$ curl https://app.conversio.com/api/v1/partners/ \
  -H "Accept: application/json" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1N2I1YWEzYjA0NmFiZmIwNTNkODBiNTIifQ.sxd8uG4EkeIXHsIIVELrfGTIZcaTFE9a9YY-8HGHuOQ" \
  -X PATCH \
  -d '{
        "name": "A Great Name 2",
        "email": "another_contact@partner.com",
        "website": "www.rebranded.com",
        "logo": "data:image/png;base64,iVBORw0...ggg==",
        "redirectUri": "https://www.rebranded.com/oauth/auth"
      }'
```

> EXAMPLE RESPONSE

```json
{
  "data": {
    "name": "A Great Name 2",
    "email": "another_contact@partner.com",
    "website": "www.rebranded.com",
    "logo": "",
    "redirectUri": "https://www.rebranded.com/oauth/auth"
  }
}
```

### Update Partner App [PATCH]

Only the attributes that are present in the body will be updated. The logo must be a base64 encoded data URI.

### Updateable Attributes

|Key             |Details|
|---------------:|-----------|
|**name:**       |**string**|
|                |The name of this Partner App.|
|**email:**      |**string**|
|                |The contact email for this Partner App.|
|**website:**    |**string**|
|                |The Partner App's homepage.|
|**logo:**       |**string**|
|                |The Partner App's logo, used in the OAuth authorize page. Must be a data URI.|
|**redirectUri:**|**string**|
|                |The redirect URI used during OAuth. This value **must match** the argument received in the authorize call.|

<aside class="success">
  Response 200 - Partner App Updated
</aside>

<aside class="warning">
  Response 400 - The Partner App data is invalid. Probably one of the fields is empty or null.
</aside>
