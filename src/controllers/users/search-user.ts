import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../lib/prisma'

export async function searchUser(request: FastifyRequest, reply: FastifyReply) {
  const user = await prisma.user.findMany()

  reply.status(200).send({ user })
}
