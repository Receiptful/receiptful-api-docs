# Product Reviews

Endpoints for getting data on existing Product Reviews from Customers.

## List Product Reviews

Returns reviews from the most recently created.

```shell
# EXAMPLE REQUEST
$ curl "https://commerce.campaignmonitor.com/api/v1/product-reviews?limit=2&page=2" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Accept: application/json"
```

> EXAMPLE RESPONSE

```json
{
  "data": [
    {
      "id": "57b5aa3b046abfb053d80b52",
      "title": "Awesome!",
      "comment": "Taste and texture were all on point! ++ would buy again.",
      "rating": 5,
      "productId": "123456789",
      "customerEmail": "happyguy@email.com",
      "archived": false,
      "visible": true,
      "isTest": false,
      "createdAt": "2016-11-30T10:20:00.000Z"
    },
    {
      "id": "57b5aa3b046abfb053d80b59",
      "title": "Quality Stuff",
      "comment": "Product was great, but shipping took two weeks.",
      "rating": 4,
      "productId": "65443335",
      "customerEmail": "mehdude@email.com",
      "archived": false,
      "visible": false,
      "isTest": false,
      "createdAt": "2016-11-20T00:00:00.000Z"
    }
  ],
  "meta": {
    "page": 2,
    "pages": 3,
    "total": 5,
    "limit": 2,
    "prevPage": "https://commerce.campaignmonitor.com/api/v1/product-reviews?page=1&limit=2",
    "nextPage": "https://commerce.campaignmonitor.com/api/v1/product-reviews?page=3&limit=2"
  }
}
```

### List all Product Reviews [GET]

`https://commerce.campaignmonitor.com/api/v1/product-reviews`

_OAuth Scopes_: read_product_reviews, write_product_reviews

### Query Parameters

|Argument     |Details             |
|------------:|--------------------|
|**limit:**   |**number, optional**|
|             |How many Reviews to return. Default is 10.
|**page:**    |**number, optional**|
|             |Which page of Reviews to return. Default is 1.|
|**visible:** |**bool, optional**|
|             |Whether to return only visible (those that may appear in widgets) reviews or invisible.|
|**archived:**|**bool, optional**|
|             |Whether to return reviews that have been archived by the user. Default is `false`. Pass an empty string to disable this filter.|
|**test:**    |**bool, optional**|
|             |Whether to return reviews created from test followups. Default is `false`. Pass an empty string to disable this filter.|

<aside class="success">
  Response 200
</aside>

### Response Body

Then endpoint returns an object with a `data` key that is an Array with `limit` Product Reviews in the shop, sorted by created date (recent on top). It also returns a `meta` key with paging info.

Each Product Review object includes the following info:

|Key                  |Details|
|--------------------:|-----------|
|**id:**              |**string**|
|                     |The Product Review's ID. Currently unused.|
|**title:**           |**string, optional**|
|                     |The Review's title.|
|**comment:**         |**string, optional**|
|                     |The Review's long comment.|
|**rating:**          |**number, optional**|
|                     |The Review's rating, 1 to 5.|
|**productId:**       |**string**|
|                     |The ID of the Product that was reviewed.|
|**customerEmail:**   |**string, optional**|
|                     |The email address of the reviewer. May not exist when anonymous.|
|**createdAt:**       |**string, optional**|
|                     |When the Product Review was created. Is an **ISO 8601** encoded date.|
|**archived:**        |**bool**|
|                     |A User may Archive a Product Review as a soft delete. Archived reviews aren't shown in Widgets.|
|**visible:**         |**bool**|
|                     |Only `visible` reviews can appear in Widgets.|
|**isTest:**          |**bool**|
|                     |Whether this Review was created from a test FollowUp Email.|
