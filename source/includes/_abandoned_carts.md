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
       "amount":"125.0",
       "currency":"USD",
       "items":[
          {
             "reference":"rct",
             "variant":"rct2",
             "description":"Receiptful subscription",
             "quantity":1,
             "amount":"39.99"
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

|Argument|Details|
|-------:|-----------|
|**token:**    | **string, required**|
||Cart token or unique identifier|
|**customer:** | **string, required**|
||Email address of the user to whom the cart belongs|
|**amount:**   | **string, required**|
||Cart total, including deductions|
|**currency:** | **string, required**|
||ISO 4217 currency code|
|**items:**    | **array, required**|
||The items inside the cart. Children:<ul><li>**reference**, *optional, c_123*</li><li>**variant**, *optional, c_123_2*</li><li>**description**, *Receiptful Hobby Plan*</li><li>**quantity**, *optional, 1*</li><li>**amount**, *29.00*</li></ul>|

<aside class="success">
Response 200 (application/json)
</aside>
