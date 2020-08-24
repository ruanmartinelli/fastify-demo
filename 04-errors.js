const fastify = require("fastify")({
  logger: { prettyPrint: true },
})

// fastify.setErrorHandler(async (error, request, reply) => {
//   return {
//     isError: "yeppers",
//     code: "MY_CUSTOM_ERROR_CODE",
//     status: "🥀",
//   }
// })

fastify.get("/", async (request, reply) => {
  return { hello: "world" }
})

fastify.get("/err1", () => {
  throw new Error("error!")
})

fastify.get("/err2", async () => {
  throw new Error("error, but async")
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
