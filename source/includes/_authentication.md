# Authentication

```shell
# With shell, you can just pass the correct header with each request
$ curl "api_endpoint_here" \
  -H "X-ApiKey: YOUR_API_KEY"
```

Authentication with Conversio can be done through API key or OAuth. If you're a store owner or affiliated with a store who uses Conversio, your best (and fastest) bet is to use API Key authentication.

OAuth is more complex and should be used by Partner Apps that want to authenticate with their user's accounts in Conversio. Use of API Key Authentication by other Apps on behalf of Conversio's users is discouraged.

## API Key Authentication

All paths should prefixed with https://app.conversio.com/api/v1 and will need the following HTTP header:

`X-ApiKey: YOUR_API_KEY`

<aside class="notice">
Your API Key can be found in your store's [profile page](https://app.conversio.com/profile).
</aside>

## OAuth

Conversio implements the Authorization Code Grant of the [OAuth v2.0](https://tools.ietf.org/html/rfc6749) standard, with [PoP Tokens](https://tools.ietf.org/html/draft-ietf-oauth-signed-http-request-03) (Proof of Possession).

The standard is followed to spec, except for these cases:

* Access Tokens do not expire.
* `responseType` is not a required query parameter.
* `accessType` is not a required query parameter.
* `state` is required and must have a minimum length.

In general terms, the OAuth process involves a Partner App getting authorization from the User to access their account. When authorized, an Access Token must be requested from Conversio. This token can then be included in requests to Conversio to Authenticate & Authorize the App to access a User's account.

This section has the following structure:

* [Terminology](#terminology)
* [Issuing Access Token](#issuing-access-token):
  1. [Get User Authorization](#step-1-get-user-authorization)
  2. [Receive Authorization Code](#step-2-receive-authorization-code)
  3. [Exchange Code for Access Token](#step-3-exchange-code-for-access-token)
* [Authorizing Requests](#authorizing-requests)
* [Scopes](#scopes)

### Terminology

* User: Someone who owns an account in Conversio, and on whose behalf the API is used;
* Partner App: An app, authorized by Conversio, that can access a User's API when authorized by that User;
* Access Token: A 30 character string that, when included in an API request, Authenticates its associated User and Authorizes access according to it associated scopes.
* Scope: A string that represents permission to access a resource. Listed [here](#scopes).
* PoP Token: Proof of Possession Token. The only type of Access Token issued by Conversio.
* Code: A short-lived 60 character string that can be exchanged for an Access Token.
* Client Secret: A 60 character string that acts as password when Authenticating a Partner App and as symmetric key when signing a PoP Token.
* JWS: [JSON Web Signature](https://tools.ietf.org/html/rfc7515)

### Issuing Access Token

Conversio uses the Authorization Code Grant flow from OAuth 2.0 to issue Access Tokens. This involves three requests:

1. Redirecting the User to Conversio, where they can authorize the Partner App
2. Conversio redirects the User back to the Partner App, including a `code`
3. The Partner App exchanges the `code` for an `access_token`

These three steps are described in detail below.

#### Step 1: Get User Authorization

```shell
# EXAMPLE REQUEST
$ curl "https://app.conversio.com/oauth/authorize" \
  -G \
  -X GET \
  -d client_id=57b5aa3b046abfb053d80b52 \
  -d redirect_uri=https%3A%2F%2Fwww.partner-app.com%2Fcallback \
  -d scope=read_webhook%20write_newsletter_email \
  -d state=2034590283
```

To begin the OAuth flow, the User is redirected to Conversio's authorize endpoint:

`https://app.conversio.com/oauth/authorize`

Including the following parameters in the URL query string:

|Parameter        |Details|
|----------------:|-----------|
|**client_id:**   |**string** |
|                 |The Partner App's ID. Should be provided by Conversio.|
|**redirect_uri:**|**string** |
|                 |Where the User will be redirected. Must match the value saved for the Partner App.|
|**scope:**       |**string, optional** |
|                 |The scopes that the App wishes to access on behalf of the User. Space separated values.|
|**state:**       |**string** |
|                 |A random string, at least 10 characters long, that is unique. This will be passed on to `redirect_uri` when the User accepts or rejects the authorization, and should be validated to be the same.|

The User will be required to log-in to Conversio as needed.

If all required parameters are present and valid, the User can then review what permissions (scopes) are requested by which App. Conversely, any missing or invalid parameters will instead show an error page with a description of each problem.

At this point the User can Authorize or Reject the Authorization Request. When rejecting, the User will be redirected to `redirect_uri` with the following parameters in the URL query string:

|Parameter             |Details|
|---------------------:|-----------|
|**error:**            |**string** |
|                      |As per spec, will have the value "access_denied".|
|**error_description:**|**string** |
|                      |Will be "The user refused to authorize your App.".|
|**state:**            |**string** |
|                      |Will be the same `state` value sent on the first request.|

This ends the OAuth flow prematurely.

Conversely, when the User authorizes the App, an authorization `code` is generated that is bound to that User, the requested scopes and `redirect_uri`. The User is then redirected to `redirect_uri` with the `code` in the query params, and the same `state` that was received in the request, starting step 2.

#### Step 2: Receive Authorization Code

```shell
# EXAMPLE REQUEST
$ curl "https://www.partner-app.com/callback" \
  -G \
  -X GET \
  -d code=f85b6db85f79310aee955bf104caa2dfcb50e6a565f8f8837f44c6ded306 \
  -d state=2034590283
```

At this point the User has authorized the Partner App to access their account on their behalf. They will be redirected to `redirect_uri` and the URL query will include the following parameters:

|Parameter             |Details|
|---------------------:|-----------|
|**code:**             |**string** |
|                      |A 60 character hex string. This code represents the user's authorization and must be used to get an Access Token in step 3. It is single-use and short-lived, expiring in 3 minutes.|
|**state:**            |**string** |
|                      |Must be the same value sent in the first request.|

The `state` param's value should be validated. It is exactly the same value as was sent in the first step. This ensures that the User is coming from the original request, and that the `code` isn't from an earlier request intercepted by an attacker.

The `code` can now be used to request an Access Token from Conversio.

#### Step 3: Exchange Code for Access Token

```shell
# EXAMPLE REQUEST
$ curl "https://app.conversio.com/oauth/access-token" \
  -H "Authorization: Basic NTdiNWFhM2IwNDZhYmZiMDUzZDgwYjUyOndhdGNodS1sb29raW4tYXQ=" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -X POST \
  -d code=f85b6db85f79310aee955bf104caa2dfcb50e6a565f8f8837f44c6ded306 \
  -d redirect_uri=https%3A%2F%2Fwww.partner-app.com%2Fcallback
```

> EXAMPLE RESPONSE

```json
{
  "access_token": "0aee955bf104caa2dfcb50e6a565f8",
  "token_type": "pop"
}
```

To issue an `access_token`, the received `code` must be `POST`ed to Conversio.

This request must use HTTPS and be Authenticated using [Basic Access Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) using the App's ID as the username and the App's Client Secret as password. Both are provided by Conversio.

The POST body must have the `application/x-www-form-urlencoded` MIME type and the following parameters:

|Parameter             |Details|
|---------------------:|-----------|
|**code:**             |**string** |
|                      |The 60 character code received in Step 2 of the flow.|
|**redirect_uri:**     |**string** |
|                      |The Partner App's redirect URI. It must be the exact same value as used to generate the `code`.|

If the App is successfully authenticated, the `redirect_uri` matches the App and the `code` is valid, Conversio will return a new `access_token` in JSON:

|Parameter             |Details|
|---------------------:|-----------|
|**access_token:**     |**string** |
|                      |A 30 character token bound to the User and requested Scopes. Must be kept secret.|
|**token_type:**       |**string** |
|                      |Indicate's the token's type. Is "pop".|

This `access_token` can then be used to [authorize](#authorizing-requests) any client when accessing the User's data.

### Authorizing Requests

As mentioned above, Conversio issues [PoP Access Tokens](https://tools.ietf.org/html/draft-ietf-oauth-signed-http-request-03). These add a layer of security on top of Bearer tokens, requiring Partner Apps to sign every request using their Client Secret.

Reading the Tokens draft & JWS RFC will provide deeper understanding of what's going on, but to get started quickly we'd recommend using a lib for the language being used. Some examples:

1. JavaScript -> [`npm install jws`](https://github.com/brianloveswords/node-jws)
2. Ruby -> [`gem install jwt`](https://github.com/jwt/ruby-jwt)

If the language used isn't listed, get in touch with us and we'll help out finding an appropriate alternative.

#### Generating the PoP Token

```ruby
# Ruby
require 'jwt'

client_secret = 'partner-app-client-secret'
payload = { at: 'pop-access-token', ts: Time.now.to_i }

pop_token = JWT.encode payload, client_secret, 'HS256'
# > "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdCI6IjEyMzQ1NiIsInRzIjoxMjM0NTY3OH0.J6DUAy9TopLOfIJHFbY2BNDankWID9ZvJ-ylHoV_a6k"
```

```javascript
// JavaScript
const jws = require('jws');

const clientSecret = 'partner-app-client-secret';
const header = { typ: 'JWT', alg: 'HS256' };
const payload = { at: 'pop-access-token', ts: Math.floor(Date.now() / 1000) };

const popToken = jws.sign({ header, payload, secret: clientSecret });
// > 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdCI6IjEyMzQ1NiIsInRzIjoxMjM0NTY3OH0.Pocf1CzRha25nwCfoZynProYLcV1UE5SlcRGa3qzZXo'
```

As a first step, the Access Token received from Conversio must be included in an Object (Hash for Ruby) at the key `at`. In that object, the current Unix time must be defined at the key `ts`. This timestamp is validated by Conversio to be within 3 minutes of current time, in an effort to prevent header reuse by attackers.

This object is then signed with HMAC, generating 3 Base64 encoded strings, separated by a period. This is the PoP Token.

We support three HMAC algorithms, `HS256`, `HS384` and `HS512`.

```shell
# Example authorized request
$ curl https://app.conversio.com/api/v1 \
  -H "Authorization: PoP eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdCI6IjEyMzQ1NiIsInRzIjoxMjM0NTY3OH0.Pocf1CzRha25nwCfoZynProYLcV1UE5SlcRGa3qzZXo
```

The PoP Token can then be included in a request's Authorization header, prefixed with the string "PoP".

The server then decodes the PoP Token and validates the signature to both Authenticate the Partner App and Authorize its access to a User's account through the included Access Token.

### Scopes

Below is a table of the recognized scopes. Scopes that are prefixed with `write_` provide read & write access, while those with the `read_` prefix provide access to read-only endpoints.

* `read_webhook`/`write_webhook`: These allow accessing the registered webhooks for a User's account. With `write_` one can also register new webhooks & endpoints.
* `read_newsletter_template`: Provides access to a User's Newsletter Templates. This includes contents and sending stats.
* `read_newsletter_email`: Provides access to the list of emails associated with a sent Newsletter Template. Includes action timestamps (sentAt, openedAt, etc.) and email address info.
* `read_async_job`: Provides access to Async Jobs, their statuses and results.
