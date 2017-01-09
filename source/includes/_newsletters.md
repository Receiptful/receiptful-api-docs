# Newsletters

Endpoints for getting data on existing Newsletters for a shop, and their emails.

## List Newsletters

Returns all the Newsletters created in a shop.

```shell
# EXAMPLE REQUEST
$ curl "https://app.conversio.com/api/v1/newsletters" \
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
      "title": "Black Friday Announcement",
      "liveAt": "2016-11-20T00:00:00.000Z",
      "customerLists": ["57b5aa3b046abfb053d80b53"],
      "customerSegments": [],
      "status": "sent",
      "sentAt": "2016-11-20T00:10:15.000Z"
    },
    {
      "id": "57b5aa3b046abfb053d80b59",
      "title": "4th of July Sales",
      "liveAt": "2017-07-03:00:00.000Z",
      "customerLists": [],
      "customerSegments": [
        "57b5aa3b046abfb053d80b57",
        "57b5aa3b046abfb053d80b56"
      ],
      "status": "scheduled"
    }
  ]
}
```

### List all Newsletters [GET]

`https://app.conversio.com/api/v1/newsletters`

_OAuth Scopes_: read_newsletter_templates, write_newsletter_templates

<aside class="success">
  Response 200
</aside>

### Response Body

Then endpoint returns an object with a `data` key that is an Array with all the newsletters in the shop.

Each newsletter object includes the following info:

|Key                  |Details|
|--------------------:|-----------|
|**id:**              |**string**|
|                     |The Newsletter's ID. Use it when calling single-newsletter endpoints.|
|**title:**           |**string**|
|                     |The Newsletter's title.|
|**liveAt:**          |**string, optional**|
|                     |When the Newsletter is set to go live, if scheduled, or when it was set live, if sent or live. Is an **ISO 8601** encoded date. Is omitted if the Newsletter is a draft.|
|**customerLists:**   |**array[string]**|
|                     |An array of IDs of Customer Lists who will receive / have received this Newsletter. May be empty.|
|**customerSegments:**|**array[string]**|
|                     |An array of IDs of Customer Segments who will receive / have received this Newsletter. May be empty.|
|**status**           |**string**|
|                     |The Newsletter's current status. Must be one of "draft", "scheduled", "live", or "sent".|
|**sentAt**           |**string, optional**|
|                     |When the Newsletter was fully sent, if such is the case. Is an **ISO 8601** encoded date.|

## Newsletter Report

Returns the selected Newsletter and some stats regarding its sending status.

```shell
# EXAMPLE REQUEST
$ curl "https://app.conversio.com/api/v1/newsletters/57b5aa3b046abfb053d80b52" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Accept: application/json" \
  -X GET
```

> EXAMPLE RESPONSE

```json
{
  "data": {
    "id": "57b5aa3b046abfb053d80b52",
    "title": "Black Friday Announcement",
    "liveAt": "2016-11-20T00:00:00.000Z",
    "customerLists": ["57b5aa3b046abfb053d80b53"],
    "customerSegments": [],
    "status": "sent",
    "sentAt": "2016-11-20T00:10:15.000Z",
    "stats": {
      "sends": 500,
      "opens": 450,
      "uniqueOpens": 300,
      "clicks": 99,
      "recipientCount": 515
    }
  }
}
```

### Single Newsletter Report [GET]

`https://app.conversio.com/api/v1/newsletters/{NEWSLETTER_ID}`

_OAuth Scopes_: read_newsletter_templates, write_newsletter_templates

<aside class="success">
  Response 200
</aside>

<aside class="warning">
  Response 404 - Newsletter not found. One of the following happened:
  <ul>
    <li>The given ID does not belong to an existing newsletter</li>
    <li>The ID belongs to another shop's newsletter</li>
    <li>The newsletter has been deleted</li>
  </ul>
</aside>

### Response Body

Then endpoint returns an object with a `data` key that the Newsletter object. The included info:

|Key                  |Details|
|--------------------:|-----------|
|**id:**              |**string**|
|                     |The Newsletter's ID. Use it when calling single-newsletter endpoints.|
|**title:**           |**string**|
|                     |The Newsletter's title.|
|**liveAt:**          |**string, optional**|
|                     |When the Newsletter is set to go live, if scheduled, or when it was set live, if sent or live. Is an **ISO 8601** encoded date. Is omitted if the Newsletter is a draft.|
|**customerLists:**   |**array[string]**|
|                     |An array of IDs of Customer Lists who will receive / have received this Newsletter. May be empty.|
|**customerSegments:**|**array[string]**|
|                     |An array of IDs of Customer Segments who will receive / have received this Newsletter. May be empty.|
|**status**           |**string**|
|                     |The Newsletter's current status. Must be one of "draft", "scheduled", "live", or "sent".|
|**sentAt**           |**string, optional**|
|                     |When the Newsletter was fully sent, if such is the case. Is an **ISO 8601** encoded date.|
|**stats**            |**object**|
|                     |An object with this Newsletter's stats. Included keys are described below.|

#### Stats

The `stats` key has the following format:

|Key                  |Details|
|--------------------:|-----------|
|**sends:**           |**number**|
|                     |The total number of emails that were sent for this Newsletter.|
|**opens:**           |**number**|
|                     |The total number of times this Newsletter's emails have been opened.|
|**uniqueOpens:**     |**number**|
|                     |The number of unique users that have opened this Newsletter's emails.|
|**clicks:**          |**number**|
|                     |The total number of clicks on this Newsletter's links.|
|**recipientCount:**  |**number**|
|                     |How many recipients was this Newsletter sent to. May differ from `sends` if there are sending errors.|

## List Newsletter Emails

A paginated list of all the emails sent for a Newsletter. Will be empty if Newsletter has not been sent yet. Emails are returned sorted by email address, and pagination is done by providing the email address from which to return results.

Note that if the Newsletter is currently live and sending, paginating results will not guarantee that all emails are returned. Wait for the "sent" status if an exhaustive list is required.

```shell
# EXAMPLE REQUEST
$ curl "https://app.conversio.com/api/v1/newsletters/57b5aa3b046abfb053d80b52/emails?limit=2" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Accept: application/json" \
  -X GET
```

> EXAMPLE RESPONSE

```json
{
  "data": [
    {
      "id": "57b5aa3b046abfb053d80b60",
      "to": "a@customer.com",
      "sentAt": "2016-11-20T00:00:00.000Z",
      "deliveredAt": "2016-11-20T00:00:15.000Z",
      "openedAt": "2016-11-20T01:00:00.000Z",
      "clickedAt": "2016-11-20T01:01:10.000Z"
    }, {
      "id": "57b5aa3b046abfb053d80b60",
      "to": "another@customer.com",
      "sentAt": "2016-11-20T00:00:01.000Z",
      "deliveredAt": "2016-11-20T00:00:17.000Z",
      "openedAt": "2016-11-21T10:02:00.000Z"
    }
  ],
  "meta": {
    "nextPage": "https://app.conversio.com/api/v1/newsletters/57b5aa3b046abfb053d80b52/emails/?from=another%40email.com&limit=2",
    "total": 500,
    "limit": 2,
    "pages": 250
  }
}
```

### Newsletter Email List [GET]

`https://app.conversio.com/api/v1/newsletters/{NEWSLETTER_ID}/emails`

_OAuth Scopes_: read_newsletter_emails, write_newsletter_emails

### Request Query Params

|Key           |Details                                                                      |
|-------------:|-----------------------------------------------------------------------------|
|**from:**     |**string, optional**                                                         |
|              |The email address from which to start paginating records. Must be URI encoded if present.|
|**limit:**    |**number, optional**                                                         |
|              |The maximum number of records to return at once. Very high numbers are discouraged and might result in connection timeouts.|

<aside class="success">
  Response 200
</aside>

<aside class="warning">
  Response 404 - Newsletter not found. One of the following happened:
  <ul>
    <li>The given ID does not belong to an existing newsletter</li>
    <li>The ID belongs to another shop's newsletter</li>
    <li>The newsletter has been deleted</li>
  </ul>
</aside>

### Response Body

The response body includes a `data` key which contains an array of newsletter emails. The emails' format:

|Key                |Details|
|------------------:|-----------|
|**id:**            |**string**|
|                   |The ID for this email.|
|**to:**            |**string**|
|                   |The email address to which this email was sent.|
|**sentAt:**        |**string**|
|                   |When this email was sent. **ISO 8601** encoded date.|
|**deliveredAt:**   |**string, optional**|
|                   |When this email was delivered. **ISO 8601** encoded date. Can be missing if not delivered.|
|**openedAt:**      |**string, optional**|
|                   |When this email was last opened. **ISO 8601** encoded date. Can be missing if never delivered.|
|**clickedAt:**     |**string, optional**|
|                   |When this email was last clicked. **ISO 8601** encoded date. Can be missing if no link was ever clicked.|

The response body also includes a `meta` key with further pagination information. The keys included are:

|Key              |Details|
|----------------:|-----------|
|**total:**       |**number**|
|                 |The total number of emails for this Newsletter.|
|**limit:**       |**number**|
|                 |The maximum number of records returned in this request.|
|**pages:**       |**number**|
|                 |How many pages need to be requested to go through all emails. Varies with `total` and `limit`.|
|**nextPage:**    |**string, optional**|
|                 |The URL form where the next page of emails can be fetched. Use it to cycle pages. May be omitted if there are no more emails to fetch.|

## View Newsletter Email

Returns a Newsletter's email, along with its text & HTML contents.

```shell
# EXAMPLE REQUEST
$ curl "https://app.conversio.com/api/v1/newsletters/57b5aa3b046abfb053d80b52/emails/57b5aa3b046abfb053d80b68" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Accept: application/json" \
  -X GET
```

> EXAMPLE RESPONSE

```json
{
  "data": {
    "id": "57b5aa3b046abfb053d80b68",
    "to": "a@customer.com",
    "sentAt": "2016-11-20T00:00:00.000Z",
    "deliveredAt": "2016-11-20T00:00:15.000Z",
    "openedAt": "2016-11-20T01:00:00.000Z",
    "clickedAt": "2016-11-20T01:01:10.000Z",
    "rendered": {
      "text": "This is an email's text version...",
      "html": "<html><body>This is an email's HTML content...</body></html>",
      "subject:": "This is the Newsletter's subject."
    }
  }
}
```

### Show Newsletter Email [GET]

`https://app.conversio.com/api/v1/newsletters/{NEWSLETTER_ID}/emails/{EMAIL_ID}`

_OAuth Scopes_: read_newsletter_emails, write_newsletter_emails

<aside class="success">
  Response 200
</aside>

<aside class="warning">
  Response 404 - Email not found. One of the following happened:
  <ul>
    <li>The given NEWSLETTER_ID does not belong to an existing newsletter</li>
    <li>The given EMAIL_ID does not belong to an existing email</li>
    <li>The NEWSLETTER_ID belongs to another shop's newsletter</li>
    <li>The EMAIL_ID belongs to another newsletter than indicated</li>
  </ul>
</aside>

### Response Body

The response body includes a `data` key which contains an object representation of the requested newsletter emails. The `rendered` key is included with the email's contents:

|Key                |Details|
|------------------:|-----------|
|**id:**            |**string**|
|                   |The ID for this email.|
|**to:**            |**string**|
|                   |The email address to which this email was sent.|
|**sentAt:**        |**string**|
|                   |When this email was sent. **ISO 8601** encoded date.|
|**deliveredAt:**   |**string, optional**|
|                   |When this email was delivered. **ISO 8601** encoded date. Can be missing if not delivered.|
|**openedAt:**      |**string, optional**|
|                   |When this email was last opened. **ISO 8601** encoded date. Can be missing if never delivered.|
|**clickedAt:**     |**string, optional**|
|                   |When this email was last clicked. **ISO 8601** encoded date. Can be missing if no link was ever clicked.|
|**rendered:**      |**object**|
|                   |The rendered content for this email. Contains keys: `text`, `html` and `subject`|

## Export Newsletter Recipients

Starts an Async Job to export a Newsletter's recipients. Once completed, the job's result will point to a CSV file with email addresses.

Refer to the [Async Jobs](#async-jobs) documentation on how to access the job's result.

```shell
# EXAMPLE REQUEST
$ curl "https://app.conversio.com/api/v1/newsletters/57b5aa3b046abfb053d80b52/ecipients/async-export" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Accept: application/json" \
  -X POST
```

> EXAMPLE RESPONSE

```json
{
  "data": {
    "id": "57b5aa3b046abfb053d80b68",
    "kind": "newsletter-recipients",
    "status": "pending"
  }
}
```

### Create Export Job [POST]

`https://app.conversio.com/api/v1/newsletters/{NEWSLETTER_ID}/recipients/async-export`

_OAuth Scopes_: read_newsletter_emails, write_newsletter_emails

<aside class="success">
  Response 201 - Job Created
</aside>

<aside class="warning">
  Response 404 - Newsletter not found. One of the following happened:
  <ul>
    <li>The given ID does not belong to an existing newsletter</li>
    <li>The ID belongs to another shop's newsletter</li>
    <li>The newsletter has been deleted</li>
  </ul>
</aside>

### Response Body

The response body includes a `data` key which reflects the created Async Job's info:

|Key                |Details|
|------------------:|-----------|
|**id:**            |**string**|
|                   |The ID for the created AsyncJob. Use this to identify this export.|
|**kind:**          |**string**|
|                   |The kind of job created. Is always `newsletter-recipients` on this endpoint.|
|**status:**        |**string**|
|                   |The job's status. Always `pending`.|