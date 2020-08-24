const fastify = require("fastify")({
  logger: { prettyPrint: true },
})

fastify.register(require("fastify-swagger"), {
  routePrefix: "/docs",
  exposeRoute: true,
  swagger: {
    info: {
      title: "Fastify Demo API",
      description: "Testing the fastify swagger api",
      version: "0.1.0",
    },
    host: "localhost",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    securityDefinitions: {
      apiKey: {
        type: "apiKey",
        name: "apiKey",
        in: "header",
      },
    },
  },
})

fastify.route({
  method: "GET",
  url: "/superheroes",
  version: "1.2.0",
  schema: {
    tags: ["Superheroes"],
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
            // superpower: { type: "string", nullable: false },
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
