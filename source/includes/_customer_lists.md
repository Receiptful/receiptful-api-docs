# Customer Lists
Services related to managing **Customer Lists** (for newsletters) and subscriptions.

## Get Customer Lists

Get all available customer lists.

```shell
# EXAMPLE REQUEST
$ curl "https://app.conversio.com/api/v1/customer-lists" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Accept: application/json" \
  -X GET
```

> EXAMPLE RESPONSE

```json
[
  {
    "id": "57b5aa3b046abfb053d80b52",
    "title": "Weekly Newsletter Subscribers"
  },
  {
    "id": "57b5aa3b046abfb053d80b53",
    "title": "New Products Announcements"
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

## Subscribe to List

Subscribe an email address and optional user details to a specific customer list.

```shell
# EXAMPLE REQUEST
$ curl "https://app.conversio.com/api/v1/customer-lists/LIST_ID/subscriptions" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Accept: application/json" \
  -X PUT \
  -d '{
    "email": "an@email.com",
    "name": "John Snow",
    "source": "Conversio",
    "sourceType": "SubscriptionForm",
    "sourceId": "some-form-slug"
  }'
```

### Subscribe an Email to a Customer List [PUT]

`https://app.conversio.com/api/v1/customer-lists/LIST_ID/subscriptions`

`LIST_ID` should be the `id` returned in the [list](#get-customer-lists) response.

### Arguments

|Argument|Details|
|-------:|-----------|
|**email:**|**string**|
||The email address to subscribe to this Customer List. Must be a valid email address.|
|**name:**|**string, optional**|
||The email address owner's name. Expects first or first and last name.|
|**source:**|**string, optional**|
||Where this subscription came from. Should be an App or company name.|
|**sourceType:**|**string, optional**|
||What type of control did the user interact for subscribing. Could be a form type, page, etc.|
|**sourceId:**|**string, optional**|
||A more granular ID of where the user subscribed. Could be the ID/slug of a form or subscription page.|

<aside class="success">
  Response 204
</aside>
