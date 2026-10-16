import { AutoRouter } from "itty-router"
import type { Env } from "./env"

const router = AutoRouter()

router.get("/files/:key", async (request, env: Env) => {
  const object = await env.FILES.get(request.params.key)
  return object ? new Response(object.body) : new Response("Not found", { status: 404 })
})

router.put("/files/:key", async (request, env: Env) => {
  await env.FILES.put(request.params.key, request.body)
  return new Response(null, { status: 204 })
})

export default { fetch: router.fetch } satisfies ExportedHandler<Env>
