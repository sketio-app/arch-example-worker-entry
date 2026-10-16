import { app } from "./app"
import type { Env } from "./env"
import { siteFetch } from "./site-fetch"

export default {
  fetch(request, env, ctx) {
    return siteFetch(request, env, ctx, (r, e, c) => app.fetch(r, e, c))
  },
} satisfies ExportedHandler<Env>
