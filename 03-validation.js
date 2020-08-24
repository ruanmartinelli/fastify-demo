const fastify = require("fastify")({
  logger: { prettyPrint: true },
  ajv: { customOptions: { removeAdditional: "all" } },
})

fastify.get("/", async (request, reply) => {
  return { hello: "world" }
})

fastify.put("/user/:id", {
  handler: async (req, reply) => {
    return { id: req.params.id, ...req.body }
  },
  //   schema: {
  //     params: { id: { type: "integer" } },
  //     // body: { username: { type: "string", minLength: 3 } },
  //     // // response: {
  //     // //   200: { id: { type: "integer" } },
  //     // // },
  //   },
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
