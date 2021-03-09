# Customer Lists

Services related to managing **Customer Lists** (for Newsletters) and subscriptions.

## Get Customer Lists

Get all available customer lists.

```shell
# EXAMPLE REQUEST
$ curl "https://commerce.campaignmonitor.com/api/v1/customer-lists" \
  -H "X-ApiKey: YOUR_API_KEY"
  -H "Accept: application/json"
```

> EXAMPLE RESPONSE

```json
[
  {
    "id": "57b5aa3b046abfb053d80b52",
    "title": "Weekly Newsletter Subscribers",
    "singleOptIn": false,
    "enabled": true,
    "subscribable": true,
    "subscribers": 3,
    "pending": 2,
    "unsubscribers": 1
  },
  {
    "id": "57b5aa3b046abfb053d80b53",
    "title": "New Products Announcements",
    "singleOptIn": true,
    "enabled": true,
    "subscribable": true,
    "subscribers": 3,
    "pending": 2,
    "unsubscribers": 1
  },
  {
    "id": "marketing",
    "title": "Accepted Marketing",
    "singleOptIn": true,
    "enabled": false,
    "subscribable": false,
    "subscribers": 0,
    "pending": 0,
    "unsubscribers": 0
  }
]
```

### List all Customer Lists [GET]

`https://commerce.campaignmonitor.com/api/v1/customer-lists`

### Arguments

These are provided via query params.

|Key               |Details                                                                  |
|-----------------:|-------------------------------------------------------------------------|
|**all:**          |**boolean**                                                              |
|                  |Whether to include lists that are not subscribable in the return (eg: Accepts Marketing)|

### Return

The endpoint returns an array with all the Customer Lists in the account. Object keys are:

|Key               |Details                                                                  |
|-----------------:|-------------------------------------------------------------------------|
|**id:**           |**string**                                                               |
|                  |The Customer List ID. This is used whenever referencing this Customer List in other endpoints.|
|**title:**        |**string**                                                               |
|                  |The title picked by the user for this List. Used in user-facing interfaces.|
|**singleOptIn:**  |**boolean**                                                              |
|                  |Whether this list is single opt-in. If not, a confirmation email is sent on subscription.|
|**enabled:**      |**boolean**                                                              |
|                  |Whether this list is enabled. Always `true` except for the `marketing` list where it may be `false`.|
|**subscribable:** |**boolean**                                                              |
|                  |Whether subscribers can be added to this list.                           |
|**subscribers:**  |**integer**                                                              |
|                  |The number of subscribers for this list.|
|**pending:**      |**integer**                                                              |
|                  |The number of pending subscribers for this list. A pending subscriber used an online form to sign up, but has not confirmed the subscription yet.|
|**unsubscribers:**|**integer**                                                              |
|                  |The number of unsubscribers for this list.                               |

<aside class="success">
  Response 200 (application/json)
</aside>

## Create List

Creates a new Customer List.

```shell
# EXAMPLE REQUEST
$ curl "https://commerce.campaignmonitor.com/api/v1/customer-lists" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -X POST \
  -d '{
       "title":"An Awesome List",
       "singleOptIn":false
  }'
```

> RESPONSE

```json
{
  "data": {
    "id": "57b5aa3b046abfb053d80b52",
    "title": "An Awesome List",
    "singleOptIn": false,
    "enabled": true,
    "subscribable": true
  }
}
```

### Create a Customer List [POST]

`https://commerce.campaignmonitor.com/api/v1/customer-lists`

_OAuth Scopes_: read_customer_list, write_customer_list

### Arguments

|Key             |Details                                                            |
|---------------:|-------------------------------------------------------------------|
|**title:**      |**string**                                                         |
|                |The title for the new List. Used in user-facing interfaces.        |
|**singleOptIn:**|**boolean, optional**                                              |
|                |Whether this list is single opt-in. If not, a confirmation email is sent on subscription.|

### Return

The endpoint returns an object with a `data` key with the created list's data in it:

|Key               |Details                                                                  |
|-----------------:|-------------------------------------------------------------------------|
|**id:**           |**string**                                                               |
|                  |The Customer List ID. This is used whenever referencing this Customer List in other endpoints.|
|**title:**        |**string**                                                               |
|                  |The title picked by the user for this List. Used in user-facing interfaces.|
|**singleOptIn:**  |**boolean**                                                              |
|                  |Whether this list is single opt-in. If not, a confirmation email is sent on subscription.|
|**enabled:**      |**boolean**                                                              |
|                  |Whether this list is enabled. Always `true` except for the `marketing` list where it may be `false`.|
|**subscribable:** |**boolean**                                                              |
|                  |Whether subscribers can be added to this list.                           |

<aside class="success">
  Response 201 (application/json)
</aside>

<aside class="warning">
  Response 400 - Invalid arguments
</aside>

## Update List

Updates an existing Customer List. Updates are applied partially both on PUT and PATCH requests.

```shell
# EXAMPLE REQUEST
$ curl "https://commerce.campaignmonitor.com/api/v1/customer-lists/57b5aa3b046abfb053d80b52" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -X PATCH \
  -d '{
       "singleOptIn":true
  }'
```

> RESPONSE

```json
{
  "data": {
    "id": "57b5aa3b046abfb053d80b52",
    "title": "An Awesome List",
    "singleOptIn": true,
    "enabled": true,
    "subscribable": true
  }
}
```

### Update a Customer List [PATCH|PUT]

`https://commerce.campaignmonitor.com/api/v1/customer-lists/{LIST_ID}`

_OAuth Scopes_: read_customer_list, write_customer_list

### Arguments

|Key             |Details                                                            |
|---------------:|-------------------------------------------------------------------|
|**title:**      |**string**                                                         |
|                |A new title for the List. Used in user-facing interfaces.          |
|**singleOptIn:**|**boolean, optional**                                              |
|                |Whether this list is single opt-in.                                |

### Return

The endpoint returns an object with a `data` key with the updated list's data in it:

|Key               |Details                                                                  |
|-----------------:|-------------------------------------------------------------------------|
|**id:**           |**string**                                                               |
|                  |The Customer List ID. This is used whenever referencing this Customer List in other endpoints.|
|**title:**        |**string**                                                               |
|                  |The title for this List. Used in user-facing interfaces.                 |
|**singleOptIn:**  |**boolean**                                                              |
|                  |Whether this list is single opt-in. If not, a confirmation email is sent on subscription.|
|**enabled:**      |**boolean**                                                              |
|                  |Whether this list is enabled. Always `true` except for the `marketing` list where it may be `false`.|
|**subscribable:** |**boolean**                                                              |
|                  |Whether subscribers can be added to this list.                           |

<aside class="success">
  Response 200 (application/json)
</aside>

<aside class="warning">
  Response 400 - Invalid arguments
</aside>

<aside class="warning">
  Response 404 - No such list
</aside>

## Subscribe to List

Subscribe an email address and optional user details to a specific customer list.

```shell
# EXAMPLE REQUEST
$ curl "https://commerce.campaignmonitor.com/api/v1/customer-lists/LIST_ID/subscriptions" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -X PUT \
  -d '{
    "email": "an@email.com",
    "name": "John Snow",
    "source": "Conversio",
    "sourceType": "SubscriptionForm",
    "sourceId": "some-form-slug",
    "optInText": "Subscribe to receive new product updates",
    "properties": {
      "age": 42,
      "happy": true,
      "dob": "2001-12-23",
      "likes": ["wine", "cinnamon", "umami"]
    }
  }'
```

### Subscribe an Email to a Customer List [PUT]

`https://commerce.campaignmonitor.com/api/v1/customer-lists/LIST_ID/subscriptions`

`LIST_ID` should be the `id` returned in the [list](#get-customer-lists) response.

### Arguments

|Argument       |Details                                                                                              |
|--------------:|-----------------------------------------------------------------------------------------------------|
|**email:**     |**string**                                                                                           |
|               |The email address to subscribe to this Customer List. Must be a valid email address.                 |
|**name:**      |**string, optional**                                                                                 |
|               |The email address owner's name. Expects first or first and last name.                                |
|**properties:**|**object, optional**                                                                                 |
|               |Additional properties to track for this subscriber. Type inference applies the first time a property is tracked, We support string, number, boolean, array and date types.|
|**source:**    |**string, optional**                                                                                 |
|               |Where this subscription came from. Should be an App or company name.                                 |
|**sourceType:**|**string, optional**                                                                                 |
|               |What type of control did the user interact for subscribing. Could be a form type, page, etc.         |
|**sourceId:**  |**string, optional**                                                                                 |
|               |A more granular ID of where the user subscribed. Could be the ID/slug of a form or subscription page.|
|**optInText:** |**string, optional**                                                                                 |
|               |What opt-in text was shown to the subscriber. This is required for GDPR compliance.                  |

#### Properties

Property keys can have at most 100 characters in length and must match the regex `/^[a-zA-Z0-9-_]+$/`. A maximum of 20 different properties are allowed per account.

The first time a property is tracked (uniqueness is ensured by key), Conversio tries to infer its type. The following rules apply:

* If value is `null`, no type is inferenced.
* If a value can be cast to a number:
  * If it is a whole number and the key ends with "_at" or "At", `date` is inferred.
  * otherwise, `number` is inferred.
* If a value can be parsed as an iso8601 date, `date` is inferred.
* If a value is an array, its first element is used to infer the type (using these rules).
* Otherwise, `string` is inferred.

<aside class="success">
  Response 204
</aside>

<aside class="warning">
  Response 400 - Invalid email address
</aside>

## List Subscribers

Returns a list's accepted subscribers, pending subscribers (haven&rsquo;t opted in yet) and unsubscribers.

```shell
# EXAMPLE REQUEST
$ curl "https://commerce.campaignmonitor.com/api/v1/customer-lists/marketing/subscribers" \
  -H "X-ApiKey: YOUR_API_KEY"
  -H "Accept: application/json"
```

> EXAMPLE RESPONSE

```json
{
  "data": [
    {
      "id": "57b5aa3b046abfb053d80b52",
      "email": "test@email.com"
    }
  ],
  "meta": {
    "pages": 1,
    "total": 1,
    "limit": 10,
    "searchAfter": ["test@email.com"],
    "nextPage": "https://commerce.campaignmonitor.com/api/v1/customer-lists/5b10ded082d2653410054ac3/subscribers?limit=10&searchAfter=test%40email.com"
  }
}
```

### List all Subscribers to a Customer List [GET]

`https://commerce.campaignmonitor.com/api/v1/customer-lists/{LIST_ID}/subscribers`

_OAuth Scopes_: read_customers

### Arguments

These are provided via query params.

|Key               |Details                                                                  |
|-----------------:|-------------------------------------------------------------------------|
|**pending:**      |**boolean**                                                              |
|                  |Changes the return to a list of pending subscribers.                     |
|**unsubscribers:**|**boolean**                                                              |
|                  |Changes the return to a list of unsubscribers.                           |

### Return

The endpoint returns an object with a `data` key with the found subscribers, and a `meta` key with pagination info. By default, the returned subscribers are Customer objects with event & stats data.

**However**, when querying for `pending` or `unsubscribers` the returned subscribers include only the `email` key. Pagination is also different. This is for legacy reasons and is likely to change (to match the default return) in the future.

To ensure your app supports all returns and is future-proof, expect only the `email` address in the return, and use `nextPage` for pagination.

|Key               |Details                                                                  |
|-----------------:|-------------------------------------------------------------------------|
|**email:**        |**string**                                                               |
|                  |The email address for the subscriber. Only common field across all queries.|

<aside class="success">
  Response 200
</aside>

## Mass Unsubscribe

Removes one or more list's subscribers. There are two versions of this request: one that removes a list of emails, another that removes a whole segment.

```shell
# EXAMPLE REQUEST
$ curl "https://commerce.campaignmonitor.com/api/v1/customer-lists/LIST_ID/subscriptions" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Accept: application/json" \
  -X DELETE \
  -G \
  -d '{
    "emails": ["an@email.com", "another@email.com"]
  }'
```

> EXAMPLE RESPONSE

```json
{
  "data": {
    "unsubscribed": 2,
    "failed": 0,
    "failedReasons": []
  }
}
```

### Unsubscribe via Email List [DELETE]

`https://commerce.campaignmonitor.com/api/v1/customer-lists/{LIST_ID}/subscribers`

_OAuth Scopes_: write_customers

### Arguments

These are provided via query params.

|Key               |Details                                                                  |
|-----------------:|-------------------------------------------------------------------------|
|**emails:**       |**string[]**                                                             |
|                  |The list of emails to unsubscribe from the Customer List.                |

### Return

|Key               |Details                                                                  |
|-----------------:|-------------------------------------------------------------------------|
|**unsubscribed:** |**number**                                                               |
|                  |How many emails were successfuly unsubscribed.                           |
|**failed:**       |**number**                                                               |
|                  |How many emails failed to unsubscribe.                                   |
|**failedReasons:**|**string[]**                                                             |
|                  |A list of errors that explain unsubscribe failures.                      |

<aside class="success">
  Response 200
</aside>

<aside class="warning">
  Response 400 - No emails provided, or is not an array
</aside>

```shell
# EXAMPLE REQUEST
$ curl "https://commerce.campaignmonitor.com/api/v1/customer-lists/LIST_ID/subscriptions" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Accept: application/json" \
  -X DELETE \
  -G \
  -d '{
    "segment": "{\"criteria\":[{\"criteriaName\":\"receipt.sent\",\"negate\":true,\"filters\":[]}]}"
  }'
```

> EXAMPLE RESPONSE

```json
{
  "data": {
    "asyncJobId": "5b10ded082d2653410054ac3"
  }
}
```

### Unsubscribe via Customer Segment [DELETE]

`https://commerce.campaignmonitor.com/api/v1/customer-lists/{LIST_ID}/subscribers`

_OAuth Scopes_: write_customers

### Arguments

These are provided via query params.

|Key               |Details                                                                  |
|-----------------:|-------------------------------------------------------------------------|
|**segment:**      |**string[]**                                                             |
|                  |A Customer Segment in JSON format.                                       |

### Return

There are two possible return formats: If the number of subscribers to remove is relatively low, they will be removed synchronously with the request and the return will mirror the <a href="#unsubscribe-via-email-list-delete">Unsubscribe via Email List&rsquo;s</a>. Otherwise, an <a href="#async-jobs">Async Job</a> is started and it&rsquo;s ID returned instead inside the `data` key.

The following format is returned only with status 202:

|Key               |Details                                                                  |
|-----------------:|-------------------------------------------------------------------------|
|**asyncJobId:**   |**string**                                                               |
|                  |An Async Job&rsquo;s ID.                                                 |

<aside class="success">
  Response 200 - Subscribers removed synchronously
</aside>

<aside class="success">
  Response 202 - An async job was created to complete the mass unsubscribe
</aside>

<aside class="warning">
  Response 400 - No segment provided
</aside>
