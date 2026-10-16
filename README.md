# arch-example-worker-entry

[日本語](#日本語) | [English](#english)

## 日本語

[Sketio Arch](https://arch.sketio.app) のパーサー検証用サンプルです。実際に動くアプリではなく、Worker の入口の書き方の見本です。

含んでいる書き方（`workers/` の下に 1 つの Worker ずつ入っています）:

- `auth-wrapped`: Hono のアプリを default export せず、認証チェックのあとに自分の `fetch` の中で `app.fetch(request, env, ctx)` を呼ぶ。`app` は別ファイル（`app.ts`）から import。wrangler.jsonc に D1 と KV の binding
- `site-fetch`: `siteFetch(request, env, ctx, (r, e, c) => app.fetch(r, e, c))` のように、包む関数を通して `app.fetch` を呼ぶ
- `cron`: `scheduled` ハンドラと、wrangler.jsonc の `triggers.crons`
- `itty`: Hono ではなく itty-router で書いた別の Worker（R2 の binding）

`wrangler.jsonc` の `database_id` と KV の `id` は見本のためのダミーの値です。

ライセンスは MIT です。

## English

A sample for testing the parsers of [Sketio Arch](https://arch.sketio.app). It is not a working app; it is a reference for the different ways a Worker entry can be written.

What it covers (one Worker per folder under `workers/`):

- `auth-wrapped`: the Hono app is not the default export; the Worker's own `fetch` checks the session and then calls `app.fetch(request, env, ctx)`. `app` is imported from another file (`app.ts`). D1 and KV bindings in wrangler.jsonc
- `site-fetch`: `app.fetch` is called through a wrapper function, `siteFetch(request, env, ctx, (r, e, c) => app.fetch(r, e, c))`
- `cron`: a `scheduled` handler, with `triggers.crons` in wrangler.jsonc
- `itty`: a separate Worker written with itty-router instead of Hono (an R2 binding)

The `database_id` and the KV `id` in the wrangler files are dummy values for the sample.

MIT licensed.
