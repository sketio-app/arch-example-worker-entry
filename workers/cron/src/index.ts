import type { Env } from "./env"

export default {
  async fetch() {
    return new Response("cron worker")
  },
  // Runs every day at 03:00 UTC: removes notes older than 30 days.
  async scheduled(_controller, env, ctx) {
    ctx.waitUntil(env.DB.prepare("DELETE FROM notes WHERE created_at < unixepoch() - 2592000").run())
  },
} satisfies ExportedHandler<Env>
