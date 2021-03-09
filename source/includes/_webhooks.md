# Webhooks

Endpoints for subscribing and configuring Webhooks triggered by events on your account.

You should use webhooks to get near real-time updates on events in a shop. When one of the supported events happens (eg: a newsletter email is sent), Conversio will `POST` some data related to that event to the endpoints registered in webhooks that subscribed to that event's topic.

When Webhook delivery fails (your endpoint can't be reached or returns an error status code), we'll keep trying to re-send the failed Webhooks up to a limited number of tries, in an exponential back-off fashion. Details are described [below](#retry-mechanism).

For security purposes, all our webhooks use JSON Web Signatures ([JWS](https://tools.ietf.org/html/rfc7515)). These allow recipients to validate that each webhook originates from Conversio. More details on the validation are [below](#security-signature).

### Subscribable Topics

* `newsletter-template/sent`: Triggered when all emails for a Newsletter have been sent.
* `newsletter-email/sent`: Triggered when a Newsletter is sent to a customer. These typically arrive in bursts as the Newsletter Template is sending;
* `async-job/completed`: Triggered when an Async Job has been completed (failed or succeeded).
* `abandoned-cart-email/sent`: Triggered when an email was sent for an Abandoned Cart.

### Payload

All request bodies contain two keys, `meta` and `data`. The `meta` key contains information about the webhook itself:

|Key       |Details|
|---------:|-----------|
|**topic:**|**string**|
|          |The Webhook's topic. Useful if you wish to direct all webhooks to the same endpoint.|
|**ts:**   |**number**|
|          |The timestamp for when the webhook was **first sent**. This will stay equal for subsequent retries.|

The `data` key's content depends on the Webhook's topic. The following apply:

#### `newsletter-template/sent`

```shell
# EXAMPLE WEBHOOK
$ curl "https://partner-app.com/registered/endpoint" \
  -H "Authorization: Bearer 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNsaWVudCBTZWNyZXQiLCJ0eXAiOiJKV1QifQ.eyJqaXQiOiIzOTg1Y2JlMC1lM2JlLTExZTYtYThmMy04NTMzOTYyOGMzNGEiLCJpYXQiOjE0ODU0MzE2ODIsImlzcyI6IkNvbnZlcnNpbyJ9.WZYh7Wylj5vnGRWqrgeMXdeRjIqJc9V30nyEG7QHpvk'" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -X POST \
  -d '{
    "meta": {
      "topic": "newsletter-template/sent",
      "ts": 1485431966802
    },
    "data": {
      "templateId": "57b5aa3b640abfb053d80a63",
      "userId": "67b5aa3c640abfb053d80a63",
      "status": "sent",
      "title": "Black Friday opening announcement",
      "sentAt": "2017-01-26T11:57:26.675Z",
      "liveAt": "2017-01-26T11:45:28.888Z"
    }
  }'
```

|Key            |Details    |
|--------------:|-----------|
|**templateId:**|**string** |
|               |The Newsletter Template's ID. Can be used to reference the template using the API.|
|**userId:**    |**string** |
|               |The User / Store that this template belongs to.|
|**status:**    |**string** |
|               |Template status, is "sent".|
|**title:**     |**string** |
|               |The Newsletter's title (store-facing, not necessarily in email content).|
|**liveAt:**    |**string** |
|               |When the template started sending. This is an **ISO 8601** formatted date.|
|**sentAt:**    |**string** |
|               |When the template finished sending. This is an **ISO 8601** formatted date.|

#### `newsletter-email/sent`

```shell
# EXAMPLE WEBHOOK
$ curl "https://partner-app.com/registered/endpoint" \
  -H "Authorization: Bearer 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNsaWVudCBTZWNyZXQiLCJ0eXAiOiJKV1QifQ.eyJqaXQiOiIzOTg1Y2JlMC1lM2JlLTExZTYtYThmMy04NTMzOTYyOGMzNGEiLCJpYXQiOjE0ODU0MzE2ODIsImlzcyI6IkNvbnZlcnNpbyJ9.WZYh7Wylj5vnGRWqrgeMXdeRjIqJc9V30nyEG7QHpvk'" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -X POST \
  -d '{
    "meta": {
      "topic": "newsletter-email/sent",
      "ts": 1485431966802
    },
    "data": {
      "emailId": "57b5aa3b046abfb053d80b52",
      "templateId": "57b5aa3b640abfb053d80a63",
      "userId": "67b5aa3c640abfb053d80a63",
      "to": "an@email.com",
      "subject": "Black Friday Sale",
      "title": "Black Friday opening announcement",
      "sentAt": "2017-01-26T11:57:26.675Z"
    }
  }'
```

|Key            |Details|
|--------------:|-----------|
|**emailId:**   |**string** |
|               |The Newsletter Email's ID. Can be used to reference the email using the API.|
|**templateId:**|**string** |
|               |The Newsletter Template's ID. The template that the email belongs to.|
|**userId:**    |**string** |
|               |The User / Store that this email belongs to.|
|**to:**        |**string** |
|               |The email address to whom this email was sent.|
|**subject:**   |**string** |
|               |The subject of the email|
|**title:**     |**string** |
|               |The Newsletter's title (store-facing, not necessarily in email content).|
|**sentAt:**    |**string** |
|               |When the email was sent. This is an **ISO 8601** formatted date.|

#### `async-job/completed`

```shell
# EXAMPLE WEBHOOK
$ curl "https://partner-app.com/registered/endpoint" \
  -H "Authorization: Bearer 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNsaWVudCBTZWNyZXQiLCJ0eXAiOiJKV1QifQ.eyJqaXQiOiIzOTg1Y2JlMC1lM2JlLTExZTYtYThmMy04NTMzOTYyOGMzNGEiLCJpYXQiOjE0ODU0MzE2ODIsImlzcyI6IkNvbnZlcnNpbyJ9.WZYh7Wylj5vnGRWqrgeMXdeRjIqJc9V30nyEG7QHpvk'" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -X POST \
  -d '{
    "meta": {
      "topic": "async-job/completed",
      "ts": 1485431966803
    },
    "data": {
      "asyncJobId": "57b5aa3b046abfb053d80b52",
      "userId": "57b5aa3b046abbf053d80b64"
      "kind": "newsletter-recipients",
      "status": "done",
      "startedAt": "2017-01-26T11:57:26.675Z",
      "completedAt": "2017-01-26T12:02:06.665Z",
      "result": "https://receiptful.s3.amazonaws.com/async-jobs/1234567890987654321.csv"
    }
  }'
```

Data is the JSON representation of the completed Async Job:

|Key               |Details    |
|-----------------:|-----------|
|**asyncJobId:**   |**string** |
|                  |The Async Job's ID.|
|**userId:**       |**string** |
|                  |The user on whose behalf this job is running.|
|**kind:**         |**string**|
|                  |What kind of job it is.|
|**status:**       |**string**|
|                  |The job's status. Is either "done" or "failed".|
|**startedAt:**    |**string, optional**|
|                  |When this job started processing. Is an **ISO 8601** encoded date. Can be null if it hasn't started yet.|
|**completedAt:**  |**string**|
|                  |When this job completed. Is an **ISO 8601** encoded date.|
|**error:**        |**string, optional**|
|                  |An error message that indicates a problem when processing the job. There is no `result` if this is present.|
|**result:**       |**string, optional**|
|                  |The final result from processing this job. What it is depends on job `kind`.|

#### `abandoned-cart-email/sent`

```shell
# EXAMPLE WEBHOOK
$ curl "https://partner-app.com/registered/endpoint" \
  -H "Authorization: Bearer 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNsaWVudCBTZWNyZXQiLCJ0eXAiOiJKV1QifQ.eyJqaXQiOiIzOTg1Y2JlMC1lM2JlLTExZTYtYThmMy04NTMzOTYyOGMzNGEiLCJpYXQiOjE0ODU0MzE2ODIsImlzcyI6IkNvbnZlcnNpbyJ9.WZYh7Wylj5vnGRWqrgeMXdeRjIqJc9V30nyEG7QHpvk'" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -X POST \
  -d '{
    "meta": {
      "topic": "abandoned-cart-email/sent",
      "ts": 1485431966893
    },
    "data": {
      "userId": "57b5aa3b0461234053d80b52"
      "emailId": "57b5aa3b046abfb053d80b52",
      "templateId": "57b5aa3b046abfb053d80b53",
      "campaignId": "57b5aa3b046abfb053d80b56",
      "abandonedCartId": "57b5aa3b046abfb053d80b59",
      "to": "some@customer.com",
      "status": "sent"
      "sentAt": "2017-01-26T11:57:26.675Z",
      "subject": "You forgot your goodies!"
    }
  }'
```

Data is the JSON representation of the sent Abandoned Cart email:

|Key                  |Details    |
|--------------------:|-----------|
|**emailId:**         |**string** |
|                     |The email's ID.|
|**templateId:**      |**string** |
|                     |The email template's ID.|
|**campaignId:**      |**string** |
|                     |The Abandoned Cart Campaign's ID.|
|**abandonedCartId:** |**string** |
|                     |The ID of the Abandoned Cart that triggered this email.|
|**userId:**          |**string** |
|                     |The User's ID.|
|**to:**              |**string** |
|                     |The email address of the customer that received this email (also the owner of the Abandoned Cart).|
|**status:**          |**string** |
|                     |The email's status. Is "sent".|
|**sentAt:**          |**stringl**|
|                     |When the email was sent. Is an **ISO 8601** encoded date.|
|**subject:**         |**string** |
|                     |The email subject.|

### Retry Mechanism

Webhooks retry up to 6 times, for a total of 7 attempts. Multiple failures are grouped by endpoint and retried in batches. If 5% or more of a batch of retries fails consecutively, all webhooks in that batch are skipped and an attempt is counted for each.

The retry progression is (in time elapsed from first attempt):

1. 10min
2. 35min
3. 1h 30min
4. 4h 20min
5. 10h 30min
6. 1d 3h
7. 3d

After all attempts are through, the webhooks are discarded.

### Security Signature

```shell
# EXAMPLE WEBHOOK
$ curl "https://partner-app.com/registered/endpoint" \
  -H "Authorization: Bearer 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNsaWVudCBTZWNyZXQiLCJ0eXAiOiJKV1QifQ.eyJqaXQiOiIzOTg1Y2JlMC1lM2JlLTExZTYtYThmMy04NTMzOTYyOGMzNGEiLCJpYXQiOjE0ODU0MzE2ODIsImlzcyI6IkNvbnZlcnNpbyJ9.WZYh7Wylj5vnGRWqrgeMXdeRjIqJc9V30nyEG7QHpvk'" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -X POST \
  -d '{ ... }'
```

```javascript
/* JavaScript */
const jws = require('jws');

const authorization = req.get('Authorization');
// > 'Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6IkNsaWVudCBTZWNyZXQiLCJ0eXAiOiJKV1QifQ.eyJqaXQiOiIzOTg1Y2JlMC1lM2JlLTExZTYtYThmMy04NTMzOTYyOGMzNGEiLCJpYXQiOjE0ODU0MzE2ODIsImlzcyI6IkNvbnZlcnNpbyJ9.WZYh7Wylj5vnGRWqrgeMXdeRjIqJc9V30nyEG7QHpvk'

const [, encodedToken] = authorization.split(' ');
const token = jws.decode(encodedToken);
// > {
// >   header: { alg: 'HS256', kid: 'Client Secret', typ: 'JWT' },
// >   payload: {
// >     jit: '3985cbe0-e3be-11e6-a8f3-85339628c34a',
// >     iat: 1485431682,
// >     iss: 'Conversio'
// >   },
// >   signature: 'WZYh7Wylj5vnGRWqrgeMXdeRjIqJc9V30nyEG7QHpvk'
// > }

jws.verify(encodedToken, token.header.alg, 'a-secret');
// > true
```

```ruby
## Ruby
require 'JWT'

_, encoded_token = request.headers['Authorization'].split
payload, header = JWT.decode(encoded_token, nil, false)
# > payload = {"jit"=>"3985cbe0-e3be-11e6-a8f3-85339628c34a", "iat"=>1485431682, "iss"=>"Conversio"}
# > header = {"alg"=>"HS256", "kid"=>"Client Secret", "typ"=>"JWT"}

JWT.decode(encoded_token, 'a-secret', true, algorithm: header['alg'], iss: 'Conversio', verify_iss: true, verify_iat: true)
# > [{"jit"=>"3985cbe0-e3be-11e6-a8f3-85339628c34a", "iat"=>1485431682, "iss"=>"Conversio"}, {"alg"=>"HS256", "kid"=>"Client Secret", "typ"=>"JWT"}]
```

A JSON Web Token ([JWT](https://tools.ietf.org/html/rfc7519)) is signed and encoded into the Authorization header of the Webhook's request using the Bearer schema. The token's header includes the following keys:

|Key               |Details    |
|-----------------:|-----------|
|**alg:**          |**string**|
|                  |Has the value "HS256". It's the algorightm used for the HMAC signature.|
|**typ:**          |**string**|
|                  |Has the value "JWT". Indicates this is a JSON Web Token.|
|**kid:**          |**string**|
|                  |Hints at what secret was used for signing the Token. Is "Client Secret" when the webhook is registered for a Partner App, or "API Key" when the webhook was registered through an API.|

The token's body itself includes the following keys:

|Key               |Details    |
|-----------------:|-----------|
|**jti:**          |**string**|
|                  |Has a random, unique value. Two tokens with the same `jti` could mean an attacker is re-using tokens to fabricate authorized webhooks.|
|**iss:**          |**string**|
|                  |Has the value "Conversio".|
|**iat:**          |**string**|
|                  |UNIX time of when the token was generated (when webhook request is sent).|

This token is then serialized using [JWS Compact Serialization](https://tools.ietf.org/html/rfc7515#page-19) and included in the Authorization header using the Bearer schema.

Webhooks recipients should validate that every request is properly signed. This acts as guarantee that the webhook is valid and was sent by Conversio.

Validating the signatures is a process made simple by programming libraries. The same library used during [OAuth](#authorizing-requests) can be used here, just follow the examples on the right.

## View Webhooks

Returns all Webhooks registered for the current shop. If authorized through OAuth, only those webhooks created by the authorized PartnerApp will be listed.

```shell
# EXAMPLE REQUEST
$ curl "https://commerce.campaignmonitor.com/api/v1/webhooks" \
  -H "X-ApiKey: YOUR_API_KEY"
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

`https://commerce.campaignmonitor.com/api/v1/webhooks`

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
$ curl "https://commerce.campaignmonitor.com/api/v1/webhooks/57b5aa3b046abfb053d80b52" \
  -H "X-ApiKey: YOUR_API_KEY"
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

`https://commerce.campaignmonitor.com/api/v1/webhooks/{WEBHOOK_ID}`

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

|Key            |Details                                                            |
|--------------:|-------------------------------------------------------------------|
|**id:**        |**string**                                                         |
|               |The Webhook ID. You used it to call this endpoint.                 |
|**topic:**     |**string**                                                         |
|               |The event that triggers this webhook.                              |
|**endpoint:**  |**string**                                                         |
|               |Where the webhook's payload is sent, when triggered. Must be a URI.|
|**partnerApp:**|**string, optional**                                               |
|               |The ID of the Partner App that created this webhook. Included only when authorization is made with the API key.|

## Create Webhooks

Create a new Webhook for the currently authenticated shop. If authorized through OAuth, the Webhook will be assigned to the authorized Partner App.

Only one Webhook for a unique topic & endpoint combination can exist for each Shop. Thus, trying to create multiple webhooks for the same topic and endpoint will result in errors.

```shell
# EXAMPLE REQUEST
$ curl "https://commerce.campaignmonitor.com/api/v1/webhooks" \
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

`https://commerce.campaignmonitor.com/api/v1/webhooks`

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
$ curl "https://commerce.campaignmonitor.com/api/v1/webhooks/57b5aa3b046abfb053d80b52" \
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

`https://commerce.campaignmonitor.com/api/v1/webhooks/{WEBHOOK_ID}`

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
$ curl "https://commerce.campaignmonitor.com/api/v1/webhooks/57b5aa3b046abfb053d80b52" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -X DELETE
```

### Delete Webhook [DELETE]

`https://commerce.campaignmonitor.com/api/v1/webhooks/{WEBHOOK_ID}`

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
