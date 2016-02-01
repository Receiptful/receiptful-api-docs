# Receipts
Services related to sending using the **Receipts API**

## All Receipts

```shell
# EXAMPLE REQUEST
$ curl "https://app.receiptful.com/api/v1/receipts?page=1&limit=10" \
  -H "X-ApiKey: YOUR_API_KEY"
```
> Example Response

```json
{
   "meta":{
      "_links":{
         "first":"https://app.receiptful.com/api/v1/receipts?page=1",
         "next":"https://app.receiptful.com/api/v1/receipts?page=3",
         "prev":"https://app.receiptful.com/api/v1/receipts?page=1",
         "last":"https://app.receiptful.com/api/v1/receipts?page=5"
      }
   },
   "data":[
      {
         "_id":"1e23df04",
         "reference":"c_1e23d",
         "currency":"USD",
         "amount":"0.00",
         "amountNotes":"Includes 19$ VAT",
         "to":"customer@email.com",
         "from":"me@mybusiness.com",
         "createdAt":"2015-01-07T10:02:13.915Z",
         "date":"2015-01-07T10:02:13.915Z",
         "payment":{
            "type":"VISA",
            "last4":4242
         },
         "items":[
            {
               "reference":123,
               "description":"Receiptful subscription",
               "quantity":1,
               "amount":"39.99",
               "image":"http://foo/image.jpg"
            }
         ],
         "subtotals":[
            {
               "description":"Delivery",
               "amount":"9.00"
            }
         ],
         "billing":{
            "address":{
               "firstName":"John",
               "lastName":"Doe",
               "company":"Acme Widgets",
               "addressLine1":"111 Main",
               "addressLine2":"Suite 101",
               "city":"New York",
               "state":"NY",
               "postcode":"10012",
               "country":"US"
            },
            "phone":"444-555-6464",
            "email":"john@acmewidgets.com"
         },
         "shipping":{
            "firstName":"John",
            "lastName":"Doe",
            "company":"Acme Widgets",
            "addressLine1":"111 Main",
            "addressLine2":"Suite 101",
            "city":"New York",
            "state":"NY",
            "postcode":"10012",
            "country":"US"
         },
         "customerIp":"145.145.145.145",
         "status":"sent",
         "upsell":{
            "upsellType":"coupon",
            "active":true,
            "title":"Lorem ipsum",
            "freeShipping":true,
            "amount":"10",
            "couponCode":"55G2-DHM0-50NN",
            "emailLimit":true
         }
      },
      {
         "_id":"1e23df04",
         "reference":"c_1e23d",
         "currency":"USD",
         "amount":"0.00",
         "to":"customer@email.com",
         "from":"me@mybusiness.com",
         "createdAt":"2015-01-07T10:02:13.915Z",
         "date":"2015-01-07T10:02:13.915Z",
         "payment":{
            "type":"VISA",
            "last4":4242
         },
         "items":[
            {
               "reference":123,
               "description":"Receiptful subscription",
               "quantity":1,
               "amount":"39.99",
               "image":"http://foo/image.jpg"
            }
         ],
         "subtotals":[
            {
               "description":"Delivery",
               "amount":"9.00"
            }
         ],
         "billing":{
            "address":{
               "firstName":"John",
               "lastName":"Doe",
               "company":"Acme Widgets",
               "addressLine1":"111 Main",
               "addressLine2":"Suite 101",
               "city":"New York",
               "state":"NY",
               "postcode":"10012",
               "country":"US"
            },
            "phone":"444-555-6464",
            "email":"john@acmewidgets.com"
         },
         "shipping":{
            "firstName":"John",
            "lastName":"Doe",
            "company":"Acme Widgets",
            "addressLine1":"111 Main",
            "addressLine2":"Suite 101",
            "city":"New York",
            "state":"NY",
            "postcode":"10012",
            "country":"US"
         },
         "customerIp":"145.145.145.145",
         "status":"sent",
         "upsell":{
            "upsellType":"coupon",
            "active":true,
            "title":"Lorem ipsum",
            "freeShipping":true,
            "amount":"10",
            "couponCode":"55G2-DHM0-50NN",
            "emailLimit":false
         }
      }
   ]
}
```

### List all Receipts [GET]

`https://app.receiptful.com/api/v1/receipts`

### Arguments

|Argument|Details|
|-------:|-----------|
|**page:**|**number, optional**|
||The page number|
|**limit:**|**number, optional**|
||Number of results per page|

<aside class="success">
Response 200 (application/json)
</aside>

## Send

```shell
# EXAMPLE REQUEST
$ curl "https://app.receiptful.com/api/v1/receipts" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{
       "reference":"c_1e23d",
       "currency":"USD",
       "amount":"0.00",
       "amountNotes":"Includes 19$ VAT",
       "to":"customer@email.com",
       "from":"me@mybusiness.com",
       "date":1410715640,
       "payment":{
          "type":"VISA",
          "last4":4242
       },
       "items":[
          {
             "reference":123,
             "description":"Receiptful subscription",
             "quantity":1,
             "amount":"39.99",
             "image":"http://foo/image.jpg",
             "metas": [{
               "key": "Color",
               "value": "Red"
             }]
          }
       ],
       "subtotals":[
          {
             "description":"Delivery",
             "amount":"9.00"
          }
       ],
       "billing":{
          "address":{
             "firstName":"John",
             "lastName":"Doe",
             "company":"Acme Widgets",
             "addressLine1":"111 Main",
             "addressLine2":"Suite 101",
             "city":"New York",
             "state":"NY",
             "postcode":"10012",
             "country":"US"
          },
          "phone":"444-555-6464",
          "email":"john@acmewidgets.com"
       },
       "shipping":{
          "firstName":"John",
          "lastName":"Doe",
          "company":"Acme Widgets",
          "addressLine1":"111 Main",
          "addressLine2":"Suite 101",
          "city":"New York",
          "state":"NY",
          "postcode":"10012",
          "country":"US"
       },
       "customerIp":"145.145.145.145",
       "notes":"Products require individual packaging",
       "coupons":[
         "abcd-1234-5678"
       ]
    }'
```

> EXAMPLE RESPONSE

```json
{
   "_id":"1e23df04",
   "reference":"c_1e23d",
   "currency":"USD",
   "amount":"0.00",
   "amountNotes":"Includes 19$ VAT",
   "to":"customer@email.com",
   "from":"me@mybusiness.com",
   "createdAt":"2015-01-07T10:02:13.915Z",
   "date":"2015-01-07T10:02:13.915Z",
   "payment":{
      "type":"VISA",
      "last4":4242
   },
   "items":[
      {
         "reference":123,
         "description":"Receiptful subscription",
         "quantity":1,
         "amount":"39.99",
         "image":"http://foo/image.jpg"
      }
   ],
   "subtotals":[
      {
         "description":"Delivery",
         "amount":"9.00"
      }
   ],
   "billing":{
      "address":{
         "firstName":"John",
         "lastName":"Doe",
         "company":"Acme Widgets",
         "addressLine1":"111 Main",
         "addressLine2":"Suite 101",
         "city":"New York",
         "state":"NY",
         "postcode":"10012",
         "country":"US"
      },
      "phone":"444-555-6464",
      "email":"john@acmewidgets.com"
   },
   "shipping":{
      "firstName":"John",
      "lastName":"Doe",
      "company":"Acme Widgets",
      "addressLine1":"111 Main",
      "addressLine2":"Suite 101",
      "city":"New York",
      "state":"NY",
      "postcode":"10012",
      "country":"US"
   },
   "customerIp":"145.145.145.145",
   "status":"sent",
   "upsell":{
      "upsellType":"coupon",
      "active":true,
      "title":"Lorem ipsum",
      "freeShipping":true,
      "amount":"10",
      "couponCode":"55G2-DHM0-50NN",
      "emailLimit":true
   }
}
```

### Create a new receipt [POST]

`https://app.receiptful.com/api/v1/receipts`

### Arguments

|Argument|Details|
|-------:|-----------|
|**reference:**|**string, required**|
||Sale reference or unique identifier|
|**currency:**|**string, required**|
||ISO 4217 currency code|
|**amount:**|**string, required**|
||Receipt total, including deductions|
|**amountNotes:**|**string**|
||Notes to add close to receipt amount (eg. "Includes taxes")|
|**to:**|**string, required**|
||Receipt recipient's email address|
|**from:**|**string, required**|
||The email address to be displayed in the from field|
|**date:**|**number/string, optional**, *default is now*|
||The date the order was completed, can be a unix timestamp or UTC date. e.g. '2013-02-04T10:35:24-08:00' or 1410715640|
|**payment:**|**object, optional**, *default is null*|
||The display details of the payment that completed the sale. Children:<ul><li>**Type**, *VISA*</li><li>**Last4**, *4242*</li></ul>|
|**items:**|**array, required**|
||The items sold. Children:<ul><li>**reference**, *optional, c_123*</li><li>**description**, *Receiptful Hobby Plan*</li><li>**quantity**, *optional, 1*</li><li>**amount**, *29.00*</li><li>**url**, *http://receiptful.com/download/123*</li><li>**metas**, *optional, [{ "key": "Color", "value": "Red" }]*</li><li>**image**, *optional, http://foo/image.jpg*</li></ul>|
|**subtotals:**|**array, optional**|
||any extra fields that are required before the total is displayed, e.g. discounts, delivery. Children:<ul><li>**description**, *Delivery*</li><li>**amount**, *9.99*</li></ul>|
|**billing:**|**object, optional**|
||the customer's billing details. Children:<ul><li>**address**<ul><li>**firstName**, *Joe*</li><li>**lastName**, *Smith*</li><li>**company**, *Receiptful*</li><li>**addressLine1**, *30 Broadway*</li><li>**AddressLine2**, *Manhattan*</li><li>**city**, *New York*</li><li>**state**, *New York*</li><li>**postcode**, *10001*</li><li>**country**, *USA*</li></ul></li><li>**phone**, *518-111-1111*</li><li>**email**, *help@receiptful.com*</li></ul>|
|**shipping:**|**object, optional**|
||the customer's shipping details. Children:<ul><li>**firstName**, *Joe*</li><li>**lastName**, *Smith*</li><li>**company**, *Receiptful*</li><li>**addressLine1**, *30 Broadway*</li><li>**AddressLine2**, *Manhattan*</li><li>**city**, *New York*</li><li>**state**, *New York*</li><li>**postcode**, *10001*</li><li>**country**, *USA*</li></ul>|
|**upsell:**|**object, optional**|
||details related to the upsell. Children:<ul><li>**products**<ul><li>array of<ul><li>**title**, Product 1</li><li>**description**, Lorem ipsum</li><li>**image**, http://foo/image.jpg</li><li>**actionUrl**, http://foo/product-1/</li></ul></li></ul>|
|**customerIp:**|**string, optional**|
||the IP Address of the connection that completed the sale|
|**notes:**|**string, optional**|
||any notes to be added to the receipt|
|**coupons:**|**array, optional**|
||an array of strings that represent all of the coupon codes used with the order|

<aside class="success">
Response 201 (application/json)
</aside>

## Receipt

```shell
# EXAMPLE REQUEST
$ curl "https://app.receiptful.com/api/v1/receipts/a1b2c3d4" \
  -H "X-ApiKey: YOUR_API_KEY"
```

> EXAMPLE RESPONSE

```json
{
   "_id":"1e23df04",
   "reference":"c_1e23d",
   "currency":"USD",
   "amount":"0.00",
   "to":"customer@email.com",
   "from":"me@mybusiness.com",
   "createdAt":"2015-01-07T10:02:13.915Z",
   "date":"2015-01-07T10:02:13.915Z",
   "payment":{
      "type":"VISA",
      "last4":4242
   },
   "items":[
      {
         "reference":123,
         "description":"Receiptful subscription",
         "quantity":1,
         "amount":"39.99",
         "image":"http://foo/image.jpg"
      }
   ],
   "subtotals":[
      {
         "description":"Delivery",
         "amount":"9.00"
      }
   ],
   "billing":{
      "address":{
         "firstName":"John",
         "lastName":"Doe",
         "company":"Acme Widgets",
         "addressLine1":"111 Main",
         "addressLine2":"Suite 101",
         "city":"New York",
         "state":"NY",
         "postcode":"10012",
         "country":"US"
      },
      "phone":"444-555-6464",
      "email":"john@acmewidgets.com"
   },
   "shipping":{
      "firstName":"John",
      "lastName":"Doe",
      "company":"Acme Widgets",
      "addressLine1":"111 Main",
      "addressLine2":"Suite 101",
      "city":"New York",
      "state":"NY",
      "postcode":"10012",
      "country":"US"
   },
   "customerIp":"145.145.145.145",
   "status":"sent",
   "upsell":{
      "upsellType":"coupon",
      "active":true,
      "title":"Lorem ipsum",
      "freeShipping":true,
      "amount":"10",
      "couponCode":"55G2-DHM0-50NN",
      "emailLimit":true
   }
}
```

### Retrieve a receipt [GET]

`https://app.receiptful.com/api/v1/receipts/{RECEIPT_ID}`

A single Receipt with all of its details

### Arguments

|Argument|Details|
|-------:|-----------|
|**id:**|**string, required**|
||String based `id` of the receipt supplied in the response from the send of a receipt.|

<aside class="success">
Response 200 (application/json)
</aside>

## Resend

```shell
# EXAMPLE REQUEST
$ curl "https://app.receiptful.com/api/v1/receipts/1a2b3c4d/send" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -X POST
```

> EXAMPLE RESPONSE

```json
{
   "_id":"1e23df04",
   "reference":"c_1e23d",
   "currency":"USD",
   "amount":"0.00",
   "to":"customer@email.com",
   "from":"me@mybusiness.com",
   "createdAt":"2015-01-07T10:02:13.915Z",
   "date":"2015-01-07T10:02:13.915Z",
   "payment":{
      "type":"VISA",
      "last4":4242
   },
   "items":[
      {
         "reference":123,
         "description":"Receiptful subscription",
         "quantity":1,
         "amount":"39.99",
         "image":"http://foo/image.jpg"
      }
   ],
   "subtotals":[
      {
         "description":"Delivery",
         "amount":"9.00"
      }
   ],
   "billing":{
      "address":{
         "firstName":"John",
         "lastName":"Doe",
         "company":"Acme Widgets",
         "addressLine1":"111 Main",
         "addressLine2":"Suite 101",
         "city":"New York",
         "state":"NY",
         "postcode":"10012",
         "country":"US"
      },
      "phone":"444-555-6464",
      "email":"john@acmewidgets.com"
   },
   "shipping":{
      "firstName":"John",
      "lastName":"Doe",
      "company":"Acme Widgets",
      "addressLine1":"111 Main",
      "addressLine2":"Suite 101",
      "city":"New York",
      "state":"NY",
      "postcode":"10012",
      "country":"US"
   },
   "customerIp":"145.145.145.145",
   "status":"sent",
   "upsell":{
      "upsellType":"coupon",
      "active":true,
      "title":"Lorem ipsum",
      "freeShipping":true,
      "amount":"10",
      "couponCode":"55G2-DHM0-50NN",
      "emailLimit":true
   }
}
```

### Resend a Receipt [POST]

`https://app.receiptful.com/api/v1/receipts/{RECEIPT_ID}/send`

Resend a receipt using the id.

### Arguments

|Argument|Details|
|-------:|-----------|
|**id:**|**string, required**|
||String based `id` of the receipt supplied in the response from the send of a receipt.| 

<aside class="success">
Response 200 (application/json)
</aside>

## Bulk upload

```shell
# EXAMPLE REQUEST
$ curl "https://app.receiptful.com/api/v1/receipts/bulk" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -X POST \
  -d '[{
       "reference":"c_1e23d",
       "currency":"USD",
       "amount":"0.00",
       "amountNotes":"Includes 19$ VAT",
       "to":"customer@email.com",
       "from":"me@mybusiness.com",
       "date":1410715640,
       "status": "completed",
       "payment":{
          "type":"VISA",
          "last4":4242
       },
       "items":[
          {
             "reference":123,
             "description":"Receiptful subscription",
             "quantity":1,
             "amount":"39.99",
             "image":"http://foo/image.jpg",
             "metas": [{
               "key": "Color",
               "value": "Red"
             }]
          }
       ],
       "subtotals":[
          {
             "description":"Delivery",
             "amount":"9.00"
          }
       ],
       "billing":{
          "address":{
             "firstName":"John",
             "lastName":"Doe",
             "company":"Acme Widgets",
             "addressLine1":"111 Main",
             "addressLine2":"Suite 101",
             "city":"New York",
             "state":"NY",
             "postcode":"10012",
             "country":"US"
          },
          "phone":"444-555-6464",
          "email":"john@acmewidgets.com"
       },
       "shipping":{
          "firstName":"John",
          "lastName":"Doe",
          "company":"Acme Widgets",
          "addressLine1":"111 Main",
          "addressLine2":"Suite 101",
          "city":"New York",
          "state":"NY",
          "postcode":"10012",
          "country":"US"
       },
       "customerIp":"145.145.145.145"
    },{
       "reference":"c_2e23d",
       "currency":"USD",
       "amount":"1.00",
       "amountNotes":"Includes 19$ VAT",
       "to":"customer@email.com",
       "from":"me@mybusiness.com",
       "date":1410715640,
       "status": "cancelled",
       "payment":{
          "type":"VISA",
          "last4":4242
       },
       "items":[
          {
             "reference":123,
             "description":"Receiptful subscription",
             "quantity":1,
             "amount":"39.99",
             "image":"http://foo/image.jpg",
             "metas": [{
               "key": "Color",
               "value": "Red"
             }]
          }
       ],
       "subtotals":[
          {
             "description":"Delivery",
             "amount":"9.00"
          }
       ],
       "billing":{
          "address":{
             "firstName":"John",
             "lastName":"Doe",
             "company":"Acme Widgets",
             "addressLine1":"111 Main",
             "addressLine2":"Suite 101",
             "city":"New York",
             "state":"NY",
             "postcode":"10012",
             "country":"US"
          },
          "phone":"444-555-6464",
          "email":"john@acmewidgets.com"
       },
       "shipping":{
          "firstName":"John",
          "lastName":"Doe",
          "company":"Acme Widgets",
          "addressLine1":"111 Main",
          "addressLine2":"Suite 101",
          "city":"New York",
          "state":"NY",
          "postcode":"10012",
          "country":"US"
       },
       "customerIp":"145.145.145.145"
    }]'
```

### Bulk upload [POST]

`https://app.receiptful.com/api/v1/receipts/bulk`

Upload many receipts at once *without sending the receipts*. This is useful for
synchronizing the receipt history and is used for the recommendation engine.

<aside class="notice">
You can upload 250 receipts per request.
</aside>

### Arguments

<aside class="notice">
The receipt structure is the same as for [Send](#send) except that you should
enclose the receipts in an array (see example request) and you can include a
`status` field to indicate if the historic order was actually completed or not.
See below.
</aside>

|Argument|Details|
|-------:|-----------|
|**status:**|**string, optional**|
||Status of the receipt, valid values are "pending", "completed", "cancelled" and "refunded"|

<aside class="success">
Response 200 (success)

All receipts are valid.
</aside>

<aside class="success">
Response 202 (partial success)

Some receipts are valid and some are invalid. The response specifies which
receipts failed to validate.

Valid receipts are accepted and processed and should *not* be re-uploaded.
</aside>
