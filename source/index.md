---
title: Receiptful V1 API

language_tabs:
  - shell

toc_footers:
  - <a href='https://app.receiptful.com'>Sign Up for an API Key</a>
  - <a href='http://github.com/tripit/slate'>Documentation Powered by Slate</a>

includes:
  - errors

search: true
---

# Authentication

```shell
# With shell, you can just pass the correct header with each request
curl "api_endpoint_here"
  -H "X-ApiKey: YOUR_API_KEY"
```

> Your API Key can be found on the profile page in your Receiptful control panel

All paths should prefixed with http://app.recieptful.com/api/v1 and will need the following HTTP header:

`X-ApiKey: YOUR_API_KEY`

<aside class="notice">
Your API Key can be found on the profile page in your Receiptful control panel
</aside>

# Receipts
Services related to sending using the **Receipts API**

## Reciept Collection

```shell
# EXAMPLE REQUEST
curl "http://app.receipftul.com/api/v1/receipts"
  -H "X-ApiKey: YOUR_API_KEY"
  -d page=1
  -d limit=10
  -g
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

### Query Parameters

Parameter|Type|Required|Description
---------|----|--------|-----------
page|integer|optional|The page number
limit|integer|optional|Number of results per page

<aside class="success">
Response 200 (application/json)
</aside>
    
        

## Send [/receipts]
### Create a new receipt. It will send an email notification. [POST]
+ Request (application/json)

        {
            "reference": "c_1e23d",
            "currency": "USD",
            "amount": "0.00",
            "to": "customer@email.com",
            "from": "me@mybusiness.com",
            "card": {
                  "type": "VISA",
                  "last4": 4242
            },
            "items": [
                {
                    "reference": 123,
                    "description": "Receiptful subscription",
                    "quantity": 1,
                    "amount": "39.99"
                }
            ],
            "subtotals": [
                {
                    "description": "Delivery",
                    "amount": "9.00"
                }
            ],
            "billing": {
                "address": {
                    "firstName": "John",
                    "lastName": "Doe",
                    "company": "Acme Widgets",
                    "addressLine1": "111 Main",
                    "addressLine2": "Suite 101",
                    "city": "New York",
                    "state": "NY",
                    "postcode": "10012",
                    "country": "US"
                },
                "phone": "444-555-6464",
                "email": "john@acmewidgets.com"
            }
            "shipping": {
                "firstName": "John",
                "lastName": "Doe",
                "company": "Acme Widgets",
                "addressLine1": "111 Main",
                "addressLine2": "Suite 101",
                "city": "New York",
                "state": "NY",
                "postcode": "10012",
                "country": "US"
            },
            "customerIp": "145.145.145.145"
        }

+ Response 201 (application/json)

        {
            "_id": "1e23df04",
            "reference": "c_1e23d",
            "currency": "USD",
            "amount": "0.00",
            "to": "customer@email.com",
            "from": "me@mybusiness.com",
            "card": {
                  "type": "VISA",
                  "last4": 4242
            },
            "items": [
                {
                    "reference": 123,
                    "description": "Receiptful subscription",
                    "quantity": 1,
                    "amount": "39.99"
                }
            ],
            "subtotals": [
                {
                    "description": "Delivery",
                    "amount": "9.00"
                }
            ],
            "billing": {
                "address": {
                    "firstName": "John",
                    "lastName": "Doe",
                    "company": "Acme Widgets",
                    "addressLine1": "111 Main",
                    "addressLine2": "Suite 101",
                    "city": "New York",
                    "state": "NY",
                    "postcode": "10012",
                    "country": "US"
                },
                "phone": "444-555-6464",
                "email": "john@acmewidgets.com"
            },
            "shipping": {
                "firstName": "John",
                "lastName": "Doe",
                "company": "Acme Widgets",
                "addressLine1": "111 Main",
                "addressLine2": "Suite 101",
                "city": "New York",
                "state": "NY",
                "postcode": "10012",
                "country": "US"
            },
            "customerIp": "145.145.145.145",
            "status": "sent",
            "sentAt": 1410788324,
            "upsell": {
                "upsellType": "coupon",
                "active": true,
                "title": "Lorem ipsum",
                "freeShipping": true,
                "amount": "10",
                "couponCode": "55G2-DHM0-50NN"
            }
        }
        
## Reciept [/reciepts/{id}]
A single Reciept with all of its details

+ Parameters
    + id (required, string, `1enfk2k4nf`) ... String based `id` of the receipt supplied in the response from the send of a receipt. 

+ Model (application/json)
    
    + Body 
            
            {
                "_id": "1e23df04",
                "reference": "c_1e23d",
                "currency": "USD",
                "amount": "0.00",
                "to": "customer@email.com",
                "from": "me@mybusiness.com",
                "card": {
                      "type": "VISA",
                      "last4": 4242
                },
                "items": [
                    {
                        "reference": 123,
                        "description": "Receiptful subscription",
                        "quantity": 1,
                        "amount": "39.99"
                    }
                ],
                "subtotals": [
                    {
                        "description": "Delivery",
                        "amount": "9.00"
                    }
                ],
                "billing": {
                    "address": {
                        "firstName": "John",
                        "lastName": "Doe",
                        "company": "Acme Widgets",
                        "addressLine1": "111 Main",
                        "addressLine2": "Suite 101",
                        "city": "New York",
                        "state": "NY",
                        "postcode": "10012",
                        "country": "US"
                    },
                    "phone": "444-555-6464",
                    "email": "john@acmewidgets.com"
                },
                "shipping": {
                    "firstName": "John",
                    "lastName": "Doe",
                    "company": "Acme Widgets",
                    "addressLine1": "111 Main",
                    "addressLine2": "Suite 101",
                    "city": "New York",
                    "state": "NY",
                    "postcode": "10012",
                    "country": "US"
                },
                "customerIp": "145.145.145.145",
                "status": "sent",
                "sentAt": 1410788324,
                "upsell": {
                    "upsellType": "coupon",
                    "active": true,
                    "title": "Lorem ipsum",
                    "freeShipping": true,
                    "amount": "10",
                    "couponCode": "55G2-DHM0-50NN"
                }
            }

### Retrieve a Reciept [GET]
+ Response 200
    
    [Reciept][]

## Resend Receipt [/receipts/{id}/send]
Resend a receipt using the id.

+ Parameters
    + id (required, string, `1enfk2k4nf`) ... String based `id` of the receipt supplied in the response from the send of a receipt. 

### Resend a Reciept [POST]
+ Response 200
    
    [Reciept][]

# Group Coupons
Services related to retreiving coupons using the **Coupons API**

## Coupons Collection [/coupons]
### List all Coupons [GET]
+  Response 200 (application/json)
    
        {
            "meta": {
                "_links": {
                    "next": "...",
                    "prev": "...",
                    "last": "...",
                    "first": "..."
                }
            },
            "data": [{
                "upsellType": "coupon",
                "active": true,
                "title": "Lorem ipsum",
                "freeShipping": true,
                "amount": "10",
                "couponCode": "55G2-DHM0-50NN"
            },
            {
                "upsellType": "coupon",
                "active": true,
                "title": "Lorem ipsum",
                "freeShipping": true,
                "amount": "10",
                "couponCode": "54G2-DHM0-50NL"
            }]
        }

## Coupon [/coupons/{id}]
A single coupon with all of its details

+ Parameters
    + id (required, string, `1enfk2k4nf`) ... String based `_id` of the coupon supplied in the response from the send of a receipt. 

+ Model (application/json)
    
    + Body

            {
                "upsellType": "coupon",
                "active": true,
                "title": "Lorem ipsum",
                "freeShipping": true,
                "amount": "10",
                "couponCode": "55G2-DHM0-50NN"
            }

### Retrieve a Coupon [GET]
+ Response 200
    
    [Coupon][]

### Delete a Coupon [DELETE]
+ Response 204
