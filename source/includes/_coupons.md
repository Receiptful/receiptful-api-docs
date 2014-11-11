# Coupons
Services related to retreiving coupons using the **Coupons API**

## All Coupons

```shell
# EXAMPLE REQUEST
$ curl "https://app.receiptful.com/api/v1/receipt/coupons" \
  -H "X-ApiKey: YOUR_API_KEY" \
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

### List all Coupons [GET]

`https://app.receiptful.com/api/v1/coupons`

Get a list of all coupons

<aside class="success">
Response 200 (application/json)
</aside>

## Coupon

```shell
# EXAMPLE REQUEST
$ curl "https://app.receiptful.com/api/v1/receipt/coupon/1a2b3c4d" \
  -H "X-ApiKey: YOUR_API_KEY" \
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

### Retrieve A Coupon [GET]

`https://app.receiptful.com/api/v1/coupon/{COUPON_ID}`

A single coupon with all of its details

### Arguments

|Argument|Details|
|-------:|-----------|
|**id:**|**string, required**|
||String based `id` of the coupon supplied in the response from the send of a receipt.| 

<aside class="success">
Response 200 (application/json)
</aside>

### Delete a Coupon [DELETE]

`https://app.receiptful.com/api/v1/coupon/{COUPON_ID}`

### Arguments

|Argument|Details|
|-------:|-----------|
|**id:**|**string, required**|
||String based `id` of the coupon supplied in the response from the send of a receipt.| 

<aside class="success">
Response 204 (application/json)
</aside>
