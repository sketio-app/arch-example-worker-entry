import { Hono } from "hono"
import type { Env } from "./env"

export const app = new Hono<{ Bindings: Env }>()

app.get("/pages/:slug", async (c) => {
  const html = await c.env.PAGES.get(c.req.param("slug"))
  return html ? c.html(html) : c.notFound()
})
