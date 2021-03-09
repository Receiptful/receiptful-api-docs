# Coupons
Services related to retreiving coupons using the **Coupons API**

## All Coupons

```shell
# DEFINITION
GET https://commerce.campaignmonitor.com/api/v1/coupons

# EXAMPLE REQUEST
$ curl "https://commerce.campaignmonitor.com/api/v1/coupons" \
  -H "X-ApiKey: YOUR_API_KEY"
```

> EXAMPLE RESPONSE

```json
{
   "meta":{
      "_links":{
         "next":"...",
         "prev":"...",
         "last":"...",
         "first":"..."
      }
   },
   "data":[
      {
         "upsellType":"coupon",
         "active":true,
         "title":"Lorem ipsum",
         "freeShipping":true,
         "amount":"10",
         "couponCode":"55G2-DHM0-50NN"
      },
      {
         "upsellType":"coupon",
         "active":true,
         "title":"Lorem ipsum",
         "freeShipping":true,
         "amount":"10",
         "couponCode":"54G2-DHM0-50NL"
      }
   ]
}
```

`https://commerce.campaignmonitor.com/api/v1/coupons`

Get a list of all coupons

<aside class="success">
Response 200 (application/json)
</aside>

## Get a coupon

```shell
# DEFINITION
GET https://commerce.campaignmonitor.com/api/v1/coupons/1a2b3c4d

# EXAMPLE REQUEST
$ curl "https://commerce.campaignmonitor.com/api/v1/coupons/1a2b3c4d" \
  -H "X-ApiKey: YOUR_API_KEY"
```

> EXAMPLE RESPONSE

```json
{
   "upsellType":"coupon",
   "active":true,
   "title":"Lorem ipsum",
   "freeShipping":true,
   "amount":"10",
   "couponCode":"55G2-DHM0-50NN"
}
```

`https://commerce.campaignmonitor.com/api/v1/coupons/{COUPON_ID}`

A single coupon with all of its details

### Arguments

|Argument|Details|
|-------:|-----------|
|**id:**|**string, required**|
||String based `id` of the coupon supplied in the response from the send of a receipt.| 

<aside class="success">
Response 200 (application/json)
</aside>

## Delete a coupon

```shell
# DEFINITION
DELETE https://commerce.campaignmonitor.com/api/v1/coupons/1a2b3c4d

# EXAMPLE REQUEST
$ curl "https://commerce.campaignmonitor.com/api/v1/coupons/1a2b3c4d" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -X DELETE
```

`https://commerce.campaignmonitor.com/api/v1/coupons/{COUPON_ID}`

### Arguments

|Argument|Details|
|-------:|-----------|
|**id:**|**string, required**|
||String based `id` of the coupon supplied in the response from the send of a receipt.| 

<aside class="success">
Response 204 (application/json)
</aside>

## Mark coupon as used

```shell
# DEFINITION
PUT https://commerce.campaignmonitor.com/api/v1/coupons/1a2b3c4d/use

# EXAMPLE REQUEST
$ curl "https://commerce.campaignmonitor.com/api/v1/coupons/1a2b3c4d/use" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -X PUT
  -d '{
    "reference": "1234",
    "amount": 123,
    "currency": "USD"
  }'
```

> EXAMPLE RESPONSE

```json
{
   "upsellType":"coupon",
   "active":true,
   "title":"Lorem ipsum",
   "freeShipping":true,
   "amount":"10",
   "couponCode":"55G2-DHM0-50NN",
   "usage": {
     "usedAt": "1410788324",
     "order": {
       "reference": "1234",
       "amount": 123,
       "currency": "USD"
     }
   }
}
```

`https://commerce.campaignmonitor.com/api/v1/coupons/{COUPON_ID}/use`

### Arguments

|Argument|Details|
|-------:|-----------|
|**id:**|**string, required**|
||String based `id` of the coupon supplied in the response from the send of a receipt.|
|**reference:**|**string, required**|
||String based `id` of the generated order by the coupon.|
|**amount:**|**float, required**|
||Amount of the generated order.|
|**currency:**|**string, required**|
||Currency of the amount generated.|

<aside class="success">
Response 200 (application/json)
</aside>
