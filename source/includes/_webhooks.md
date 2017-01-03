# Webhooks

Endpoints for subscribing and configuring Webhooks triggered by events on your account.

You should use webhooks to get near real-time updates on events in a shop. When one of the supported events happens (eg: a newsletter email is sent), Conversio will `POST` some data related to that event to the endpoints registered in webhooks that subscribed to that event's topic.

Currently, only the ´newsletter-email/sent' topic is supported.

## View Webhooks

Returns all Webhooks registered for the current shop. If authorized through OAuth, only those webhooks created by the authorized PartnerApp will be listed.

```shell
# EXAMPLE REQUEST
$ curl "https://app.conversio.com/api/v1/webhooks" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Accept: application/json" \
  -X GET
```

> EXAMPLE RESPONSE

```json
{
  "data": [
    {
      "id": "57b5aa3b046abfb053d80b52",
      "topic": "newsletter-email/sent",
      "endpoint": "https://www.endpoint.com/conversio-webhook"
    }
  ]
}
```

### List all Webhooks [GET]

`https://app.conversio.com/api/v1/webhooks`

_OAuth Scopes_: read_webhook, write_webhook

<aside class="success">
  Response 200 (application/json)
</aside>

### Response Body

Then endpoint returns an object with a `data` key that is an Array with all the webhooks in the shop. It will limit output to the currently authenticated Partner App webhooks if authorized through OAuth.

Each webhook includes the following info:

|Key|Details|
|-------:|-----------|
|**id:**|**string**|
||The Webhook ID. Use it when calling single-webhook endpoints.|
|**topic:**|**string**|
||The event that triggers this webhook.|
|**endpoint:**|**string**|
||Where the webhook's payload is sent, when triggered. Must be a URI.|
|**partnerApp:**|**string, optional**|
||The ID of the Partner App that created this webhook. Included only when authorization is made with the API key.|

```shell
# EXAMPLE REQUEST
$ curl "https://app.conversio.com/api/v1/webhooks/57b5aa3b046abfb053d80b52" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Accept: application/json" \
  -X GET
```

> EXAMPLE RESPONSE

```json
{
  "data": {
    "id": "57b5aa3b046abfb053d80b52",
    "topic": "newsletter-email/sent",
    "endpoint": "https://www.endpoint.com/conversio-webhook"
  }
}
```

### Show Single Webhook [GET]

`https://app.conversio.com/api/v1/webhooks/{WEBHOOK_ID}`

_OAuth Scopes_: read_webhook, write_webhook

<aside class="success">
  Response 200 - All good
</aside>

<aside class="warning">
  Response 404 - Webhook not found. One of the following happened:
  <ul>
    <li>The given ID does not belong to an existing webhook</li>
    <li>The ID belongs to another shop's webhook</li>
    <li>The ID belongs to another Partner App's webhook</li>
    <li>The webhook has been deleted</li>
  </ul>
</aside>

### Response Body

Then endpoint returns an object with a `data` key that is itself an object with the Webhook's properties. It will include the Partner App if authorized with an API key. The following keys are returned:

|Key|Details|
|-------:|-----------|
|**id:**|**string**|
||The Webhook ID. You used it to call this endpoint.|
|**topic:**|**string**|
||The event that triggers this webhook.|
|**endpoint:**|**string**|
||Where the webhook's payload is sent, when triggered. Must be a URI.|
|**partnerApp:**|**string, optional**|
||The ID of the Partner App that created this webhook. Included only when authorization is made with the API key.|

## Create Webhooks

Create a new Webhook for the currently authenticated shop. If authorized through OAuth, the Webhook will be assigned to the authorized Partner App.

Only one Webhook for a unique topic & endpoint combination can exist for each Shop. Thus, trying to create multiple webhooks for the same topic and endpoint will result in errors.

```shell
# EXAMPLE REQUEST
$ curl "https://app.conversio.com/api/v1/webhooks" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{
        "endpoint": "https://www.your-endpoint.com/webhooks",
        "topic": "newsletter-email/sent",
      }'
```

> EXAMPLE RESPONSE

```json
{
  "data": {
    "id": "57b5aa3b046abfb053d80b52",
    "topic": "newsletter-email/sent",
    "endpoint": "https://www.your-endpoint.com/webhooks"
  }
}
```

> EXAMPLE ERROR RESPONSE

```json
{
  "errors": [
    "The chosen topic is invalid"
  ]
}
```

### Create Webhook [POST]

`https://app.conversio.com/api/v1/webhooks`

_OAuth Scopes_: write_webhook

### Request Body

|Key           |Details                                                     |
|-------------:|------------------------------------------------------------|
|**topic:**    |**string**                                                  |
|              |The topic to subscribe with this Webhook.                   |
|**endpoint:** |**string**                                                  |
|              |URL where to publish this Webhook's payload, when triggered.|

<aside class="success">
  Response 201 - Webhook Created
</aside>

<aside class="warning">
  Response 400 - The Webhook data provided is invalid. The particular error will be returned in the response body, but these could be the most common:
  <ul>
    <li>A Webhook for that particular endpoint and topic combination already exists.</li>
    <li>The selected topic isn't supported.</li>
  </ul>
</aside>

### Response Body

When successful, the endpoint returns the newly created webhook. The returned data mimics that of the `show` endpoint:

|Key            |Details             |
|--------------:|--------------------|
|**id:**        |**string**          |
|               |The new Webhook's ID.|
|**topic:**     |**string**          |
|               |The event that triggers this webhook.|
|**endpoint:**  |**string**          |
|               |Where the webhook's payload is sent, when triggered. Must be a URI.|
|**partnerApp:**|**string, optional**|
|               |The ID of the Partner App that created this webhook. Included only when authorization is made with the API key.|

Any errors during creation will be identified by a 400 status code and a JSON object with an `errors` Array with string explanations of what went wrong.

## Update Webhooks

Update an existing webhook with new data. Can change either the topic or endpoint of an existing webhook.

```shell
# EXAMPLE REQUEST
$ curl "https://app.conversio.com/api/v1/webhooks/57b5aa3b046abfb053d80b52" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -X PATCH \
  -d '{
        "endpoint": "https://www.your-other-endpoint.com/webhooks"
      }'
```

> EXAMPLE RESPONSE

```json
{
  "data": {
    "id": "57b5aa3b046abfb053d80b52",
    "topic": "newsletter-email/sent",
    "endpoint": "https://www.your-endpoint.com/webhooks"
  }
}
```

> EXAMPLE ERROR RESPONSE

```json
{
  "errors": [
    "The chosen topic is invalid"
  ]
}
```

### Update Webhook [PATCH/PUT]

`https://app.conversio.com/api/v1/webhooks/{WEBHOOK_ID}`

_OAuth Scopes_: write_webhook

If your client doesn't support the `PATCH` method, `PUT` can be used to the same effect.

<aside class="notice">
  This endpoint performs a partial update. This means omitting a key from the request body will rresult in that value not being changed. Values can be unset with `null`.
</aside>

### Request Body

|Key           |Details                                                                      |
|-------------:|-----------------------------------------------------------------------------|
|**topic:**    |**string, optional**                                                         |
|              |The topic to subscribe with this Webhook. Can't be `null`.                   |
|**endpoint:** |**string, optional**                                                         |
|              |URL where to publish this Webhook's payload, when triggered. Can't be `null`.|

<aside class="success">
  Response 200 - Webhook Updated
</aside>

<aside class="warning">
  Response 400 - The Webhook data provided is invalid. The particular error will be returned in the response body, but these could be the most common:
  <ul>
    <li>A Webhook (other than this one) for that particular endpoint and topic combination already exists.</li>
    <li>The selected topic isn't supported.</li>
  </ul>
</aside>

<aside class="warning">
  Response 404 - Webhook not found. One of the following happened:
  <ul>
    <li>The given ID does not belong to an existing webhook</li>
    <li>The ID belongs to another shop's webhook</li>
    <li>The ID belongs to another Partner App's webhook</li>
    <li>The webhook has been deleted</li>
  </ul>
</aside>

### Response Body

When successful, the endpoint returns the newly created webhook. The returned data mimics that of the `show` endpoint:

|Key            |Details             |
|--------------:|--------------------|
|**id:**        |**string**          |
|               |The updated Webhook's ID.|
|**topic:**     |**string**          |
|               |The event that triggers this webhook.|
|**endpoint:**  |**string**          |
|               |Where the webhook's payload is sent, when triggered. Must be a URI.|
|**partnerApp:**|**string, optional**|
|               |The ID of the Partner App that created this webhook. Included only when authorization is made with the API key.|

Any errors during creation will be identified by a 400 status code and a JSON object with an `errors` Array with string explanations of what went wrong.

## Delete Webhook

Delete an existing Webhook to stop receiving data at the endpoint.

```shell
# EXAMPLE REQUEST
$ curl "https://app.conversio.com/api/v1/webhooks/57b5aa3b046abfb053d80b52" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -X DELETE
```

### Delete Webhook [DELETE]

`https://app.conversio.com/api/v1/webhooks/{WEBHOOK_ID}`

_OAuth Scopes_: write_webhook

<aside class="success">
  Response 204 - Webhook destroyed
</aside>

<aside class="warning">
  Response 404 - Webhook not found. One of the following happened:
  <ul>
    <li>The given ID does not belong to an existing webhook</li>
    <li>The ID belongs to another shop's webhook</li>
    <li>The ID belongs to another Partner App's webhook</li>
    <li>The webhook has been deleted</li>
  </ul>
</aside>

Successful requests return nothing.
