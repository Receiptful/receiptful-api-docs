# Customer Lists
Services related to managing **Customer Lists** (for newsletters) and subscriptions.

## Get Customer Lists

Get all available customer lists.

```shell
# EXAMPLE REQUEST
$ curl "https://app.conversio.com/api/v1/customer-lists" \
  -H "X-ApiKey: YOUR_API_KEY"
```

> EXAMPLE RESPONSE

```json
[
  {
    "id": "57b5aa3b046abfb053d80b52",
    "title": "Weekly Newsletter Subscribers",
    "subscribers": 3,
    "pending": 2,
    "unsubscribers": 1
  },
  {
    "id": "57b5aa3b046abfb053d80b53",
    "title": "New Products Announcements",
    "subscribers": 3,
    "pending": 2,
    "unsubscribers": 1
  }
]
```

### List all Customer Lists [GET]

`https://app.conversio.com/api/v1/customer-lists`

<aside class="success">
  Response 200 (application/json)
</aside>

### Return

The endpoint returns an array with all the Customer Lists in the account. Object keys are:

|Key|Details|
|-------:|-----------|
|**id:**|**string**|
||The Customer List ID. This is used whenever referencing this Customer List in other endpoints.|
|**title:**|**string**|
||The title picked by the user for this List. Used in user-facing interfaces.|
|**subscribers:**|**integer**|
||The number of subscribers for this list.|
|**pending:**|**integer**|
||The number of pending subscribers for this list. A pending subscriber used an online form to sign up, but has not confirmed the subscription yet.|
|**unsubscribers:**|**integer**|
||The number of unsubscribers for this list.|

## Subscribe to List

Subscribe an email address and optional user details to a specific customer list.

```shell
# EXAMPLE REQUEST
$ curl "https://app.conversio.com/api/v1/customer-lists/LIST_ID/subscriptions" \
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
    "optInText": "Subscribe to receive new product updates"
  }'
```

### Subscribe an Email to a Customer List [PUT]

`https://app.conversio.com/api/v1/customer-lists/LIST_ID/subscriptions`

`LIST_ID` should be the `id` returned in the [list](#get-customer-lists) response.

### Arguments

|Argument       |Details                                                                                              |
|--------------:|-----------------------------------------------------------------------------------------------------|
|**email:**     |**string**                                                                                           |
|               |The email address to subscribe to this Customer List. Must be a valid email address.                 |
|**name:**      |**string, optional**                                                                                 |
|               |The email address owner's name. Expects first or first and last name.                                |
|**properties:**|**object, optional**                                                                                 |
|               |Additional properties to track for this subscriber. Type inference applies the first time a property is tracked, see rules below.|
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
* Otherwise, `string` is inferred.

<aside class="success">
  Response 204
</aside>

<aside class="warning">
  Response 400 - Invalid email address
</aside>
