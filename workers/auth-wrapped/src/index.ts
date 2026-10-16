import { app } from "./app"
import type { Env } from "./env"

// The Hono app is not the default export. The Worker's own fetch checks the session first,
// then hands the request to `app.fetch`.
export default {
  async fetch(request, env, ctx) {
    const session = request.headers.get("cookie")?.match(/session=([^;]+)/)?.[1]
    if (!session || !(await env.SESSIONS.get(session))) return new Response("Sign in first", { status: 401 })
    return app.fetch(request, env, ctx)
  },
} satisfies ExportedHandler<Env>
