// https://github.com/fastify/light-my-request

const Fastify = require("fastify")
const { test } = require("tap")

function buildFastify() {
  const fastify = Fastify()

  fastify.get("/", function (request, reply) {
    reply.send({ hello: "world" })
  })

  return fastify
}

test('requests the "/" route', async (t) => {
  const app = buildFastify()

  const response = await app.inject({
    method: "GET",
    url: "/",
  })

  t.strictEqual(response.statusCode, 200, "returns a status code of 200")
})
