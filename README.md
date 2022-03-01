# GCS download

Create a `wrangler.toml`

    cp wrangler.sample.toml wrangler.toml

Set the account ID.

Generate TOKEN KV namespaces using wrangler for example

    wrangler kv:namespace create "TOKEN"

and

    wrangler kv:namespace create "TOKEN" --preview

Set environmental variables in `wrangler.toml` and/or Cloudflare Dash.

* `GCS_BUCKET`
  * Name of your bucket
* `GCS_KEY`
  * Service account HMAC access key from [Cloud Storage --> Settings --> Interoperability](https://console.cloud.google.com/storage/settings;tab=interoperability)
* `GCS_SECRET`
  * Service account HMAC access secret

Run dev version using

    wrangler dev

Publish to Cloudflare using

    wrangler publish
