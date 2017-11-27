# Customer Segments

Services related to managing **Customer Segments** and subscriptions.

## Export Segment Customers

Starts an Async Job to export a Segment's customers. Once completed, the job's result will point ot a CSV file with email addresses and subscription status.

Refer to the [Async Jobs](#async-jobs) documentation on how to access the job's result.

```shell
# EXAMPLE REQUEST
$ curl "https://app.conversio.com/api/v1/segments/57b5aa3b046abfb053d80b52/async-export" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -X POST
```

> EXAMPLE RESPONSE

```json
{
  "data": {
    "id": "57b5aa3b046abfb053d80b68",
    "kind": "segments-export",
    "status": "pending"
  }
}
```

### Create Export Job [POST]

`https://app.conversio.com/api/v1/segments/{SEGMENT_ID}/async-export`

_OAuth Scopes_: read_customers, read_segments

<aside class="success">
  Response 201 - Job Created
</aside>

<aside class="warning">
  Response 404 - Customer Segment not found. One of the following happened:
  <ul>
    <li>The given ID does not belong to an existing Customer Segment</li>
    <li>The ID belongs to another shop's Customer Segment</li>
    <li>The Customer Segment has been deleted</li>
  </ul>
</aside>

### Response Body

The response body includes a `data` key which reflects the created Async Job's info:

|Key                |Details|
|------------------:|-----------|
|**id:**            |**string**|
|                   |The ID for the created AsyncJob. Use this to identify this export.|
|**kind:**          |**string**|
|                   |The kind of job created. Is always `segments-export` on this endpoint.|
|**status:**        |**string**|
|                   |The job's status. Always `pending`.|
