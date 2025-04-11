import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkSessionExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionId = request.cookies.sessionId

  if (!sessionId) {
    return reply.status(401).send({
      message: 'Unauthorized / Try to log in first',
    })
  }
}
