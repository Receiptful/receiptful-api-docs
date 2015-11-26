# Abandoned Carts
Services related to managing **Abandoned Carts**.

## Create

```shell
# EXAMPLE REQUEST
$ curl "https://app.receiptful.com/api/v1/abandoned-carts" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{
       "token":"sometoken",
       "customer":"some@customer.com",
       "currency":"USD",
       "items":[
          {
             "reference":"rct",
             "variant":"rct2",
             "description":"Receiptful subscription",
             "quantity":1,
             "amount":"39.99",
             "attributes":[{ "key": "foo", "value": "bar" }]
          }
       ]
    }'
```

> RESPONSE

```json
{}
```

### Create or Update a Cart [POST]

`https://app.receiptful.com/api/v1/abandoned-carts`

### Arguments

|Argument      |Details                                               |
|-------------:|------------------------------------------------------|
|**token:**    | **string, required**                                 |
|              |Cart token or unique identifier                       |
|**customer:** | **string, required**                                 |
|              |Email address of the customer to whom the cart belongs|
|**currency:** | **string, required**                                 |
|              |ISO 4217 currency code                                |
|**items:**    | **[object], required, _see below_**                  |
|              |The items inside the cart.                            |

#### Items

The items inside the cart. Object contents:

|Key              |Details                    |Example                         |
|----------------:|---------------------------|--------------------------------|
|**reference:**   |**string, optional**       |*c_123*                         |
|**variant:**     |**string, optional**       |*c_123_2*                       |
|**description:** |**string, required**       |*Receiptful Hobby Plan*         |
|**quantity:**    |**number, optional**       |*1*                             |
|**amount:**      |**number, optional**       |*29.00*                         |
|                 |A single item's price.     |                                |
|**attributes:**  |**[object], optional**     |*[{ key: "foo", value: "bar" }]*|
|                 |Item attributes. See below.|                                |

##### Attributes

Item attributes:

|Key        |Details              |
|----------:|---------------------|
|**key:**   |**string, required** |
|**value:** |**string, required** |

<aside class="success">
Response 200 (application/json)
</aside>

## Delete an abandoned cart

```shell
# DEFINITION
DELETE https://app.receiptful.com/api/v1/abandoned-carts/1a2b3c4d

# EXAMPLE REQUEST
$ curl "https://app.receiptful.com/api/v1/abandoned-carts/1a2b3c4d" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -X DELETE
```

`https://app.receiptful.com/api/v1/abandoned-carts/{TOKEN}`

### Arguments

|Argument|Details|
|-------:|-----------|
|**token:**|**string, required**|
||Cart token or unique identifier.|

<aside class="success">
Response 204 (application/json)
</aside>
