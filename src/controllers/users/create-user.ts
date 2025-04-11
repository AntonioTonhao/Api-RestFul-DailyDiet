import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { randomUUID } from 'node:crypto'

export async function createCoookie(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const id = randomUUID()

  const user = await prisma.user.create({
    data: { user_id: id },
  })

  reply.setCookie('sessionId', id, {
    httpOnly: true,
    path: '/',
  })

  reply.status(201).send({
    message: `Session active: ${user.user_id}`,
  })
}
