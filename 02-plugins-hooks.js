const fastify = require("fastify")({
  logger: { prettyPrint: true },
})

// const helmet = require("fastify-helmet")
// fastify.register(helmet)

// fastify.addHook("preHandler", (request, reply, done) => {
//   reply.header("Powered-By", 'PHP 4.2.0')
//   done()
// })

// fastify.register((instance, opts, done) => {
//   done()
// })

fastify.get("/", async (request, reply) => {
  return { hello: "world" }
})

const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
