# Products
Services related to sending product updates using the **Products API**.
These endpoints must be used to send updates about products for our reccommendation engine.

## Create product

```shell
# EXAMPLE REQUEST (SINGLE PRODUCT)
$ curl "https://app.receiptful.com/api/v1/products" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{
    "product_id": "ipa_12345",
    "type": "beer",
    "brand": "StefanoS",
    "title": "Refreshing IPA by StefanoS",
    "description": "This IPA is awesome and brought to you by the legendary StefanoS",
    "hidden": false,
    "url": "https://stefanos.beer/products/ipa_12345",
    "tags": [ "ipa", "beer", "refreshing" ],
    "images": [
      { "position": 1, "url": "https://stefanos.beer/img/ipa_12345_1.jpg" },
      { "position": 2, "url": "https://stefanos.beer/img/ipa_hej.jpg" }
    ],
    "variants": [
      { "price": 10.0 },
      { "price": 15.0 }
    ],
    "categories": [
      {
        "category_id": "category_1234",
        "title": "IPA category",
        "description": "A category of good IPAs",
        "url": "https://stefanos.beer/categories/category_1234"
      }
    ]
  }'
```

```shell
# EXAMPLE REQUEST (MULTIPLE PRODUCTS)
$ curl "https://app.receiptful.com/api/v1/products" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -X POST \
  -d '[{
    "product_id": "ipa_12345",
    "type": "beer",
    "brand": "StefanoS",
    "title": "Refreshing IPA by StefanoS",
    "description": "This IPA is awesome and brought to you by the legendary StefanoS",
    "hidden": false,
    "url": "https://stefanos.beer/products/ipa_12345",
    "tags": [ "ipa", "beer", "refreshing" ],
    "images": [
      { "position": 1, "url": "https://stefanos.beer/img/ipa_12345_1.jpg" },
      { "position": 2, "url": "https://stefanos.beer/img/ipa_hej.jpg" }
    ],
    "variants": [
      { "price": 10.0 },
      { "price": 15.0 }
    ],
    "categories": [
      {
        "category_id": "category_1234",
        "title": "IPA category",
        "description": "A category of good IPAs",
        "url": "https://stefanos.beer/categories/category_1234"
      }
    ]
  },
  {
    "product_id": "wheat_54321",
    "type": "beer",
    "brand": "StefanoS",
    "title": "Refreshing wheat beer by StefanoS",
    "description": "This lovely golden wheat is perfect on a hot Summer day.",
    "hidden": false,
    "url": "https://stefanos.beer/products/wheat_54321",
    "tags": [ "ipa", "beer", "refreshing" ],
    "images": [
      { "position": 1, "url": "https://stefanos.beer/img/wheat_54321.jpg" }
    ],
    "variants": [
      { "price": 5.0 }
    ],
    "categories": [
      {
        "category_id": "category_4321",
        "title": "Wheat category",
        "description": "A category of good wheat beers",
        "url": "https://stefanos.beer/categories/category_4321"
      }
    ]
  }]'
```

### Create one or more new products [POST]

`POST https://app.receiptful.com/api/v1/products`

### Arguments

<aside class="notice">
The endpoint accepts a *single* product object or *multiple* products in an
array. See examples on the right.
</aside>

<aside class="notice">
You can upload 250 products per request.
</aside>

#### Main object (product)

|Argument|Details|
|-------:|-----------|
|**brand:**|**string, optional**|
||The brand or vendor for the product, e.g.  'Apple'.|
|**categories:**|**category array, optional**|
||A list of categories that the product belong to.|
|**description:**|**string, optional**|
||The description of the product, for example 'A very nice soccer ball, updated for the needs of 2014.'.|
|**hidden:**|**boolean, optional**|
||Indicates whether the product is currently hidden.|
|**images:**|**image array, optional**|
||A list of images for the product.|
|**product_id:**|**string, required**|
||The ID of the product.|
|**tags:**|**string array, optional**|
||A list of tags for the product.|
|**title:**|**string, optional**|
||The title of the product, for example 'Soccer Ball 2014'.|
|**type:**|**string, optional**|
||The type of the product, e.g. 'ball'.|
|**url:**|**string, optional**|
||The full or relative url for the product, for example 'http://example.com/products/soccer-ball-2014'.|
|**variants:**|**variant array, optional**|
||A list of product variants. The price of a product is always stored in a variant.|

#### Category

|Argument|Details|
|-------:|-----------|
|**category_id:**|**string, required**|
||The ID of the category.|
|**description:**|**string, optional**|
||The description of the category.|
|**title:**|**string, optional**|
||The title of the category, for example 'Soccer Balls'|
|**url:**|**string, optional**|
||The full or relative url for the category, for example 'http://example.com/category/soccer-balls'.|

#### Image

|Argument|Details|
|-------:|-----------|
|**position:**|**integer, optional**|
||The position of the image compared to other images for the same product.|
|**url:**|**string, required**|
||The url where the image is stored.|

#### Variant

|Argument|Details|
|-------:|-----------|
|**price:**|**float, required**|
||The price of the variant.|

<aside class="success">
Response 200 (success)

All products are valid.
</aside>

<aside class="success">
Response 202 (partial success)

Some products are valid and some are invalid. The response specifies which
products failed to validate.

Valid products are accepted and processed and should *not* be re-uploaded.
</aside>

## Update product

```shell
# EXAMPLE REQUEST
$ curl "https://app.receiptful.com/api/v1/products/{product_id}" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -X PUT \
  -d '{
    "product_id": "ipa_12345",
    "type": "beer",
    "brand": "StefanoS",
    "title": "Refreshing IPA by StefanoS",
    "description": "This IPA is awesome and brought to you by the legendary StefanoS",
    "hidden": false,
    "url": "https://stefanos.beer/products/ipa_12345",
    "tags": [ "ipa", "beer", "refreshing" ],
    "images": [
      { "position": 1, "url": "https://stefanos.beer/img/ipa_12345_1.jpg" },
      { "position": 2, "url": "https://stefanos.beer/img/ipa_hej.jpg" }
    ],
    "variants": [
      { "price": 10.0 },
      { "price": 15.0 }
    ],
    "categories": [
      {
        "category_id": "category_1234",
        "title": "IPA category",
        "description": "A category of good IPAs",
        "url": "https://stefanos.beer/categories/category_1234"
      }
    ]
  }'
```

### Update a product [PUT]

`PUT https://app.receiptful.com/api/v1/products/{product_id}`

### Arguments

<aside class="notice">
The product structure is the same as for [Create a product](#create-product)
except that you can only update a single product.
</aside>
<aside class="warning">
Notice that the product should always be a *full* representation, **not** a
partial. The API does not support partial updates.
</aside>

<aside class="success">
Response 200 (application/json)
</aside>

## Delete product

### Delete a product [DELETE]

```shell
# EXAMPLE REQUEST
$ curl "https://app.receiptful.com/api/v1/products/{product_id}" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -X DELETE'
```

`DELETE https://app.receiptful.com/api/v1/products/{product_id}`

<aside class="success">
Response 204 (application/json)
</aside>
