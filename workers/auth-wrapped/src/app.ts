import { Hono } from "hono"
import type { Env } from "./env"

export const app = new Hono<{ Bindings: Env }>()

app.get("/", (c) => c.text("auth-wrapped"))

app.get("/api/notes", async (c) => {
  const { results } = await c.env.DB.prepare("SELECT id, text FROM notes").all()
  return c.json(results)
})
