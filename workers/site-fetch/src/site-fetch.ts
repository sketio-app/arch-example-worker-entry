import type { Env } from "./env"

type Handler = (request: Request, env: Env, ctx: ExecutionContext) => Response | Promise<Response>

// A wrapper that adds headers (and could add logging) around any handler.
export async function siteFetch(request: Request, env: Env, ctx: ExecutionContext, handler: Handler): Promise<Response> {
  const response = await handler(request, env, ctx)
  const wrapped = new Response(response.body, response)
  wrapped.headers.set("x-frame-options", "DENY")
  return wrapped
}
