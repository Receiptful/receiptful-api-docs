# Receipts
Services related to sending using the **Receipts API**

## All Receipts

```shell
# EXAMPLE REQUEST
$ curl "http://app.receipftul.com/api/v1/receipts?page=1&limit=10" \
  -H "X-ApiKey: YOUR_API_KEY"
```
> Example Response

```json
{
   "meta":{
      "_links":{
         "first":"http://app.receiptful.com/api/v1/receipts?page=1",
         "next":"http://app.receiptful.com/api/v1/receipts?page=3",
         "prev":"http://app.receiptful.com/api/v1/receipts?page=1",
         "last":"http://app.receiptful.com/api/v1/receipts?page=5"
      }
   },
   "data":[
      {
         "_id":"1e23df04",
         "reference":"c_1e23d",
         "currency":"USD",
         "amount":"0.00",
         "to":"customer@email.com",
         "from":"me@mybusiness.com",
         "card":{
            "type":"VISA",
            "last4":4242
         },
         "items":[
            {
               "reference":123,
               "description":"Receiptful subscription",
               "quantity":1,
               "amount":"39.99"
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
         "sentAt":1410788324,
         "upsell":{
            "upsellType":"coupon",
            "active":true,
            "title":"Lorem ipsum",
            "freeShipping":true,
            "amount":"10",
            "couponCode":"55G2-DHM0-50NN"
         }
      },
      {
         "_id":"1e23df04",
         "reference":"c_1e23d",
         "currency":"USD",
         "amount":"0.00",
         "to":"customer@email.com",
         "from":"me@mybusiness.com",
         "card":{
            "type":"VISA",
            "last4":4242
         },
         "items":[
            {
               "reference":123,
               "description":"Receiptful subscription",
               "quantity":1,
               "amount":"39.99"
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
         "sentAt":1410788324,
         "upsell":{
            "upsellType":"coupon",
            "active":true,
            "title":"Lorem ipsum",
            "freeShipping":true,
            "amount":"10",
            "couponCode":"55G2-DHM0-50NN"
         }
      }
   ]
}
```

### List all Receipts [GET]

`http://app.receipftul.com/api/v1/receipts`

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
$ curl "http://app.receipftul.com/api/v1/receipts" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
       "reference":"c_1e23d",
       "currency":"USD",
       "amount":"0.00",
       "to":"customer@email.com",
       "from":"me@mybusiness.com",
       "card":{
          "type":"VISA",
          "last4":4242
       },
       "items":[
          {
             "reference":123,
             "description":"Receiptful subscription",
             "quantity":1,
             "amount":"39.99"
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
    }'
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
   "card":{
      "type":"VISA",
      "last4":4242
   },
   "items":[
      {
         "reference":123,
         "description":"Receiptful subscription",
         "quantity":1,
         "amount":"39.99"
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
   "sentAt":1410788324,
   "upsell":{
      "upsellType":"coupon",
      "active":true,
      "title":"Lorem ipsum",
      "freeShipping":true,
      "amount":"10",
      "couponCode":"55G2-DHM0-50NN"
   }
}
```

### Create a new receipt [POST]

`http://app.receipftul.com/api/v1/receipts`

### Arguments

|Argument|Details|
|-------:|-----------|
|**reference:**|**string, required**|
||Sale reference or unique identifier|
|**currency:**|**string, required**|
||ISO 4217 currency code|
|**amount:**|**string, required**|
||Receipt total, including deductions|
|**to:**|**string, required**|
||Receipt recipient's email address|
|**from:**|**string, required**|
||The email address to be displayed in the from field|
|**card:**|**object, optional**, *default is null*|
||The display details of the card that completed the sale. Children:<ul><li>**Type**, *VISA*</li><li>**Last4**, *4242*</li></ul>|
|**items:**|**array, required**|
||The items sold. Children:<ul><li>**reference**, *optional, c_123*</li><li>**description**, *Receiptful Hobby Plan*</li><li>**quantity**, *optional, 1*</li><li>**amount**, *29.00*</li></ul>|
|**subtotals:**|**array, optional**|
||any extra fields that are required before the total is displayed, e.g. discounts, delivery. Children:<ul><li>**description**, *Delivery*</li><li>**amount**, *9.99*</li></ul>|
|**billing:**|**object, optional**|
||the customer's billing details. Children:<ul><li>**address**<ul><li>**firstName**, *Joe*</li><li>**lastName**, *Smith*</li><li>**company**, *Receiptful*</li><li>**addressLine1**, *30 Broadway*</li><li>**AddressLine2**, *Manhattan*</li><li>**city**, *New York*</li><li>**state**, *New York*</li><li>**postcode**, *10001*</li><li>**country**, *USA*</li></ul></li><li>**phone**, *518-111-1111*</li><li>**email**, *help@receiptful.com*</li></ul>|
|**shipping:**|**object, optional**|
||the customer's shipping details. Children:<ul><li>**firstName**, *Joe*</li><li>**lastName**, *Smith*</li><li>**company**, *Receiptful*</li><li>**addressLine1**, *30 Broadway*</li><li>**AddressLine2**, *Manhattan*</li><li>**city**, *New York*</li><li>**state**, *New York*</li><li>**postcode**, *10001*</li><li>**country**, *USA*</li></ul>|
|**customerIp:**|**string, optional**|
||the IP Address of the connection that completed the sale|

<aside class="success">
Response 201 (application/json)
</aside>
        
## Receipt

```shell
# EXAMPLE REQUEST
$ curl "http://app.receipftul.com/api/v1/receipt/a1b2c3d4" \
  -H "X-ApiKey: YOUR_API_KEY" \
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
   "card":{
      "type":"VISA",
      "last4":4242
   },
   "items":[
      {
         "reference":123,
         "description":"Receiptful subscription",
         "quantity":1,
         "amount":"39.99"
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
   "sentAt":1410788324,
   "upsell":{
      "upsellType":"coupon",
      "active":true,
      "title":"Lorem ipsum",
      "freeShipping":true,
      "amount":"10",
      "couponCode":"55G2-DHM0-50NN"
   }
}
```

### Retrieve a receipt [GET]

`http://app.receipftul.com/api/v1/receipt/{RECEIPT_ID}`

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
$ curl "http://app.receipftul.com/api/v1/receipt/1a2b3c4d/send" \
  -H "X-ApiKey: YOUR_API_KEY" \
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
   "card":{
      "type":"VISA",
      "last4":4242
   },
   "items":[
      {
         "reference":123,
         "description":"Receiptful subscription",
         "quantity":1,
         "amount":"39.99"
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
   "sentAt":1410788324,
   "upsell":{
      "upsellType":"coupon",
      "active":true,
      "title":"Lorem ipsum",
      "freeShipping":true,
      "amount":"10",
      "couponCode":"55G2-DHM0-50NN"
   }
}
```

### Resend a Receipt [POST]

`http://app.receipftul.com/api/v1/receipt/{RECEIPT_ID}/send`

Resend a receipt using the id.

### Arguments

|Argument|Details|
|-------:|-----------|
|**id:**|**string, required**|
||String based `id` of the receipt supplied in the response from the send of a receipt.| 

<aside class="success">
Response 200 (application/json)
</aside>
