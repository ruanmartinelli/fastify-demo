const fastify = require("fastify")({
  logger: { prettyPrint: true },
})

fastify.route({
  // preParsing:(request, reply, done) => ...
  // preHandler: (request, reply, done) => ...
  // preValidation: (request, reply, done) => ...
  // onSend: (request, reply, payload, done) => ...
  // logLevel: ...
  method: "GET",
  url: "/superheroes",
  version: "1.2.0",
  schema: {
    querystring: {
      name: { type: "string" },
    },
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string", nullable: false },
            publisher: {
              type: "string",
              enum: ["dc", "marvel"],
              nullable: false,
            },
          },
        },
      },
    },
  },
  handler: async (request, reply) => {
    const { publisher } = request.query

    return [
      { name: "Green Lantern", publisher: "dc" },
      { name: "Iron Man", publisher: "marvel" },
      { name: "Aquaman", publisher: "dc" },
    ].filter((s) => (publisher ? s.publisher === publisher : true))
  },
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
