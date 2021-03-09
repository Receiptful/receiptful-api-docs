# Newsletters

Endpoints for getting data on existing Newsletters for a shop, and their emails.

## List Newsletters

Returns all the Newsletters created in a shop.

```shell
# EXAMPLE REQUEST
$ curl "https://commerce.campaignmonitor.com/api/v1/newsletters?limit=2&page=2" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Accept: application/json"
```

> EXAMPLE RESPONSE

```json
{
  "data": [
    {
      "id": "57b5aa3b046abfb053d80b59",
      "title": "4th of July Sales",
      "liveAt": "2017-07-03:00:00.000Z",
      "audience": {
        "lists": ["marketing", "57b5aa3b046abfb053d80b52"],
        "customerSegmentKind": "id",
        "customerSegmentId": "57b5aa3b046abfb053d80b57",
        "customerSegmentInline": { "criteria": [] }
      },
      "customerLists": [],
      "customerSegments": [],
      "status": "scheduled"
    },
    {
      "id": "57b5aa3b046abfb053d80b52",
      "title": "Black Friday Announcement",
      "liveAt": "2016-11-20T00:00:00.000Z",
      "customerLists": ["57b5aa3b046abfb053d80b53"],
      "customerSegments": ["57b5aa3b046abfb053d80b57"],
      "status": "sent",
      "sentAt": "2016-11-20T00:10:15.000Z"
    }
  ],
  "meta": {
    "page": 2,
    "pages": 3,
    "total": 5,
    "limit": 2,
    "prevPage": "https://commerce.campaignmonitor.com/api/v1/newsletters?page=1&limit=2",
    "nextPage": "https://commerce.campaignmonitor.com/api/v1/newsletters?page=3&limit=2"
  }
}
```

### List all Newsletters [GET]

`https://commerce.campaignmonitor.com/api/v1/newsletters`

_OAuth Scopes_: read_newsletter_template, write_newsletter_template

### Query Parameters

|Argument   |Details             |
|----------:|--------------------|
|**limit:** |**number, optional**|
|           |How many Newsletters to return. Default is 10.
|**page:**  |**number, optional**|
|           |Which page of Newsletters to return. Default is 1.|
|**status:**|**string, optional**|
|           |Filters the Newsletters by status. Can be `sent`, `scheduled`, `live` or `draft`.|

<aside class="success">
  Response 200
</aside>

### Response Body

Then endpoint returns an object with a `data` key that is an Array with `limit` newsletters in the shop. The Newsletters are sorted by `sentAt` descending, `liveAt` ascending and `createdAt` descending. It also returns a `meta` key with paging info.

Each newsletter object includes the following info:

|Key                               |Details                                                  |
|---------------------------------:|---------------------------------------------------------|
|**id:**                           |**string**                                               |
|                                  |The Newsletter's ID. Use it when calling single-newsletter endpoints.|
|**title:**                        |**string**|
|                                  |The Newsletter's title.|
|**audience**                      |**object**|
|                                  |The Newsletter's audience. Can be comprised of one or more lists, a segment ID or an inline segment. See <a href="#audience">below</a>.|
|**liveAt:**                       |**string, optional**|
|                                  |When the Newsletter is set to go live, if scheduled, or when it was set live, if sent or live. Is an **ISO 8601** encoded date. Is omitted if the Newsletter is a draft.|
|**status**                        |**string**|
|                                  |The Newsletter's current status. Must be one of "draft", "scheduled", "live", or "sent".|
|**sentAt**                        |**string, optional**|
|                                  |When the Newsletter was fully sent, if such is the case. Is an **ISO 8601** encoded date.|
|**customerLists (deprecated):**   |**string[]**|
|                                  |An array of IDs of Customer Lists who will receive / have received this Newsletter. May be empty. **Deprecated in favour of `audience`.**|
|**customerSegments (deprecated):**|**string[]**|
|                                  |An array of IDs of Customer Segments who will receive / have received this Newsletter. May be empty. **Deprecated in favour of `audience`.**|

#### Audience

The Newsletter's Audience. A Newsletter can be sent to one or more Customer Lists, with an optional segment that limits the Newsletter to a subset of subscribers on those lists.

|Key                               |Details                                                  |
|---------------------------------:|---------------------------------------------------------|
|**lists:**                        |**string[]**                                             |
|                                  |List IDs. Can only be empty for "draft" Newsletters.     |
|**customerSegmentKind:**          |**string, optional**                                     |
|                                  |One of `"inline"`, `"id"` or `null`.                     |
|**customerSegmentId:**            |**string, optional**                                     |
|                                  |A Customer Segment's ID. Ignored unless `customerSegmentKind` is `"id"`.|
|**customerSegmentInline:**        |**object, optional**                                     |
|                                  |An inline Customer Segment. Ignored unless `customerSegmentKind` is `"inline"`. See <a href="#customer-segments">Customer Segments</a> for structure.|

## Newsletter Report

Returns the selected Newsletter and some stats regarding its sending status.

```shell
# EXAMPLE REQUEST
$ curl "https://commerce.campaignmonitor.com/api/v1/newsletters/57b5aa3b046abfb053d80b52" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Accept: application/json"
```

> EXAMPLE RESPONSE

```json
{
  "data": {
    "id": "57b5aa3b046abfb053d80b52",
    "title": "Black Friday Announcement",
    "liveAt": "2016-11-20T00:00:00.000Z",
    "audience": {
      "lists": ["everyone"],
      "customerSegmentKind": "inline",
      "customerSegmentInline": {
        "criteria": [{
          "criteriaName": "receipt.sent",
          "negate": true,
          "filters": []
        }]
      }
    },
    "customerLists": [],
    "customerSegments": [],
    "status": "sent",
    "sentAt": "2016-11-20T00:10:15.000Z",
    "stats": {
      "sends": 500,
      "opens": 450,
      "uniqueOpens": 300,
      "clicks": 99,
      "recipientCount": 515
    },
    "contentModules": []
  }
}
```

### Single Newsletter Report [GET]

`https://commerce.campaignmonitor.com/api/v1/newsletters/{NEWSLETTER_ID}`

_OAuth Scopes_: read_newsletter_template, write_newsletter_template

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

|Key                               |Details                                                  |
|---------------------------------:|---------------------------------------------------------|
|**id:**                           |**string**                                               |
|                                  |The Newsletter's ID. Use it when calling single-newsletter endpoints.|
|**title:**                        |**string**                                               |
|                                  |The Newsletter's title.                                  |
|**audience**                      |**object**|
|                                  |The Newsletter's audience. Can be comprised of one or more lists, a segment ID or an inline segment. See <a href="#audience">above</a>.|
|**liveAt:**                       |**string, optional**                                     |
|                                  |When the Newsletter is set to go live, if scheduled, or when it was set live, if sent or live. Is an **ISO 8601** encoded date. Is omitted if the Newsletter is a draft.|
|**status:**                       |**string**|
|                                  |The Newsletter's current status. Must be one of "draft", "scheduled", "live", or "sent".|
|**sentAt:**                       |**string, optional**|
|                                  |When the Newsletter was fully sent, if such is the case. Is an **ISO 8601** encoded date.|
|**stats:**                        |**object**|
|                                  |An object with this Newsletter's stats. Included keys are described below.|
|**contentModules:**               |**array**|
|                                  |An array of the Content Modules in a Newsletter. These represent the content (copy, images, discounts, etc.) in a Newsletter. More details below.|
|**customerLists (deprecated):**   |**string[]**|
|                                  |An array of IDs of Customer Lists who will receive / have received this Newsletter. May be empty. **Deprecated in favour of `audience`.**|
|**customerSegments (deprecated):**|**string[]**|
|                                  |An array of IDs of Customer Segments who will receive / have received this Newsletter. May be empty. **Deprecated in favour of `audience`.**|

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

#### Content Modules

```json
{
  "contentModules": [
    {
      "position": 0,
      "type": "text",
      "context": {
        "body": "Black Friday Sale!"
      }
    },
    {
      "position": 1,
      "type": "image",
      "context": {
        "value": "https://www.epic-store.com/black-friday-img.png",
        "url": "https://www.epic-store.com/sale",
        "alignment": "center"
      }
    },
    {
      "position": 2,
      "type": "discountCoupon",
      "context": {
        "title": "Extra Black Friday Discount",
        "description": "{{firstName}}, these are the last few hours of our Black Friday sale! As an extra incentive, this is a coupon for extra {{discount}} off your next purchase :)",
        "actionTitle": "Start Shopping",
        "expiresOn": "Expires On",
        "primaryColor": "#1990FF",
        "amount": 10,
        "expiryPeriod": 1,
        "emailLimit": false,
        "couponType": 2,
        "backgroundColor": "#f8f8f8",
        "onePerUser": true,
        "usageLimit": 1
      }
    }
  ]
}
```

Each module has a `position` and a `type`. The 0-based position indicates where in the Newsletter the module appears (starting from top) and the type defines the kind of content.

The module's content is in the `context` key. This object and its keys depend on the module's type. These map directly to the content & settings in the Newsletter editor, so we recommend referencing that in case any values are unclear.

## List Newsletter Emails

A paginated list of all the emails sent for a Newsletter. Will be empty if Newsletter has not been sent yet. Emails are returned sorted by email address, and pagination is done by providing the email address from which to return results.

Note that if the Newsletter is currently live and sending, paginating results will not guarantee that all emails are returned. Wait for the "sent" status if an exhaustive list is required.

```shell
# EXAMPLE REQUEST
$ curl "https://commerce.campaignmonitor.com/api/v1/newsletters/57b5aa3b046abfb053d80b52/emails?limit=2" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Accept: application/json"
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
    "nextPage": "https://commerce.campaignmonitor.com/api/v1/newsletters/57b5aa3b046abfb053d80b52/emails/?from=another%40email.com&limit=2",
    "total": 500,
    "limit": 2,
    "pages": 250
  }
}
```

### Newsletter Email List [GET]

`https://commerce.campaignmonitor.com/api/v1/newsletters/{NEWSLETTER_ID}/emails`

_OAuth Scopes_: read_newsletter_email, write_newsletter_email

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
$ curl "https://commerce.campaignmonitor.com/api/v1/newsletters/57b5aa3b046abfb053d80b52/emails/57b5aa3b046abfb053d80b68" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Accept: application/json"
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

`https://commerce.campaignmonitor.com/api/v1/newsletters/{NEWSLETTER_ID}/emails/{EMAIL_ID}`

_OAuth Scopes_: read_newsletter_email, write_newsletter_email

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

The response body includes a `data` key which contains an object representation of the requested newsletter email. The `rendered` key is included with the email's contents:

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
$ curl "https://commerce.campaignmonitor.com/api/v1/newsletters/57b5aa3b046abfb053d80b52/recipients/async-export" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
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

`https://commerce.campaignmonitor.com/api/v1/newsletters/{NEWSLETTER_ID}/recipients/async-export`

_OAuth Scopes_: read_newsletter_email, write_newsletter_email

<aside class="success">
  Response 201 - Job Created
</aside>

<aside class="warning">
  Response 404 - Newsletter not found. One of the following happened:
  <ul>
    <li>The given ID does not belong to an existing Newsletter</li>
    <li>The ID belongs to another shop's Newsletter</li>
    <li>The Newsletter has been deleted</li>
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

## Export Newsletter Emails

Starts an Async Job to export a Newsletter's emails. Once completed, the job's result will point to a CSV file with email addresses and activity timestamps.

Refer to the [Async Jobs](#async-jobs) documentation on how to access the job's result.

```shell
# EXAMPLE REQUEST
$ curl "https://commerce.campaignmonitor.com/api/v1/newsletters/57b5aa3b046abfb053d80b52/emails/async-export" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -X POST
```

> EXAMPLE RESPONSE

```json
{
  "data": {
    "id": "57b5aa3b046abfb053d80b68",
    "kind": "newsletter-emails",
    "status": "pending"
  }
}
```

### Create Export Job [POST]

`https://commerce.campaignmonitor.com/api/v1/newsletters/{NEWSLETTER_ID}/emails/async-export`

_OAuth Scopes_: read_newsletter_email, write_newsletter_email

<aside class="success">
  Response 201 - Job Created
</aside>

<aside class="warning">
  Response 404 - Newsletter not found. One of the following happened:
  <ul>
    <li>The given ID does not belong to an existing Newsletter</li>
    <li>The ID belongs to another shop's newsletter</li>
    <li>The Newsletter has been deleted</li>
  </ul>
</aside>

### Response Body

The response body includes a `data` key which reflects the created Async Job's info:

|Key                |Details|
|------------------:|-----------|
|**id:**            |**string**|
|                   |The ID for the created AsyncJob. Use this to identify this export.|
|**kind:**          |**string**|
|                   |The kind of job created. Is always `newsletter-emails` on this endpoint.|
|**status:**        |**string**|
|                   |The job's status. Always `pending`.|
