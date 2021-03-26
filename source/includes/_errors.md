# Errors

The CM Commerce API uses the following error codes:

Error Code | Meaning
---------- | -------
400 | Bad Request -- Something required is missing of the request is malformed
401 | Unauthorized -- Your API key is wrong
403 | Forbidden -- The requested resource is hidden for administrators only
404 | Not Found -- The specified endpoint, receipt or coupon could not be found
405 | Method Not Allowed -- You tried to access a resource with an invalid method
406 | Not Acceptable -- You requested a format that isn't json
413 | Request Entity Too Large -- You sent too much data to us
429 | Too Many Requests -- You're exceeding the API rate limit
500 | Internal Server Error -- We had a problem with our server. Try again later.
503 | Service Unavailable -- We're temporarially offline for maintenance. Please try again later.
