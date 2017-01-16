# Async Jobs

An Async Job is created on certain API endpoints and user actions that we expect will take a long time to complete. Generally, when a job is created, you'll receive a Job ID that you can poll using this API to:

  1. Check if the job's completed;
  2. Get the job's result; and
  3. Check the job for errors.

Due to the presumably large size of an Async Job's results and how they'll be less relevant as time advances, Async jobs expire 1 week after they've finished processing, being automatically removed.

## List Async Jobs

Returns all the Async Jobs created for the authenticated shop. When using OAuth, only jobs started by the authenticated app are returned.

```shell
# EXAMPLE REQUEST
$ curl "https://app.conversio.com/api/v1/async-jobs" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Accept: application/json" \
  -X GET
```

> EXAMPLE RESPONSE

```json
{
  "data": [
    {
      "id": "57b5aa3b046abfb053d80b52",
      "kind": "newsletter-recipients",
      "status": "done",
      "startedAt": "2017-01-03T16:32:27.741Z",
      "completedAt": "2017-01-03T16:37:20.417Z",
      "result": "https://app.conversio.com/async-jobs/57b5aa3b046abfb053d80b52.csv"
    },
    {
      "id": "57b5aa3b046abfb053d80b54",
      "kind": "newsletter-recipients",
      "status": "pending"
    },
    {
      "id": "57b5aa3b046abfb053d80b57",
      "kind": "newsletter-recipients",
      "status": "failed",
      "startedAt": "2017-01-02T05:33:22.123Z",
      "completedAt": "2017-01-02T05:33:45.412Z",
      "error": "Something terrible has happened. Get in touch with support tout de suite!"
    }
  ]
}
```

### List all Jobs [GET]

`https://app.conversio.com/api/v1/async-jobs`

_OAuth Scopes_: read_async_jobs

<aside class="success">
  Response 200 (application/json)
</aside>

### Response Body

The endpoint returns an object with a `data` key that is an Array with all the Async Jobs in the shop. It will limit output to the currently authenticated Partner App webhooks if authorized through OAuth.

Each Async Job includes the following info:

|Key               |Details    |
|-----------------:|-----------|
|**id:**           |**string**|
|                  |The Async Job ID. Use it when calling single-job endpoints.|
|**kind:**         |**string**|
|                  |What kind of job this is. Currently only supports "newsletters-recipients".|
|**status:**       |**string**|
|                  |The job's status. One of "pending", "done" or "failed".|
|**startedAt:**    |**string, optional**|
|                  |When this job started processing. Is an **ISO 8601** encoded date. Is `null` if it hasn't started yet.|
|**completedAt:**  |**string, optional**|
|                  |When this job completed. Is `null` if it hasn't finished yet. There's a `result` or `error` if set. Is an **ISO 8601** encoded date.|
|**error:**        |**string, optional**|
|                  |An error message that indicates a problem when processing the job. There is no `result` if this is present.|
|**result:**       |**string, optional**|
|                  |The final result from processing this job. Contents depend on job `kind`.|
|**partnerApp:**   |**string, optional**|
|                  |The ID of the Partner App that created this Async Job. Included only when authorization is made with the API key.|

## Get Async Job

Returns the requested Async Job. When using OAuth, only jobs started by the authenticated app can be accessed.

```shell
# EXAMPLE REQUEST
$ curl "https://app.conversio.com/api/v1/async-jobs/57b5aa3b046abfb053d80b52" \
  -H "X-ApiKey: YOUR_API_KEY" \
  -H "Accept: application/json" \
  -X GET
```

> EXAMPLE RESPONSE

```json
{
  "data": {
    "id": "57b5aa3b046abfb053d80b52",
    "kind": "newsletter-recipients",
    "status": "done",
    "startedAt": "2017-01-03T16:32:27.741Z",
    "completedAt": "2017-01-03T16:37:20.417Z",
    "result": "https://app.conversio.com/async-jobs/57b5aa3b046abfb053d80b52.csv"
  }
}
```

### Get an Async Job [GET]

`https://app.conversio.com/api/v1/async-jobs/{ASYNC_JOB_ID}`

_OAuth Scopes_: read_async_jobs

<aside class="success">
  Response 200
</aside>

<aside class="warning">
  Response 404 - Async Job not found. One of the following happened:
  <ul>
    <li>The given ID does not belong to an existing job</li>
    <li>The ID belongs to another shop's job</li>
    <li>The ID belongs to another Partner App's job</li>
    <li>The job has expired</li>
  </ul>
</aside>

### Response Body

The endpoint returns an object with a `data` key. The `data` key is an object with the Async Job's properties. It will include the Partner App if authorized with an API key. The following keys are returned:

|Key               |Details    |
|-----------------:|-----------|
|**id:**           |**string**|
|                  |The Async Job's ID. The ID used to call this endpoint.|
|**kind:**         |**string**|
|                  |What kind of job this is. Currently only supports "newsletters-recipients".|
|**status:**       |**string**|
|                  |The job's status. One of "pending", "done" or "failed".|
|**startedAt:**    |**string, optional**|
|                  |When this job started processing. Is an **ISO 8601** encoded date. Is `null` if it hasn't started yet.|
|**completedAt:**  |**string, optional**|
|                  |When this job completed. Is `null` if it hasn't finished yet. There's a `result` or `error` if set. Is an **ISO 8601** encoded date.|
|**error:**        |**string, optional**|
|                  |An error message that indicates a problem when processing the job. There is no `result` if this is present.|
|**result:**       |**string, optional**|
|                  |The final result from processing this job. Contents depend on job `kind`.|
|**partnerApp:**   |**string, optional**|
|                  |The ID of the Partner App that created this Async Job. Included only when authorization is made with the API key.|
