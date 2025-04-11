import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../lib/prisma'

export async function searchMeals(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { sessionId } = request.cookies

  const meals = await prisma.meals.findMany({
    where: { user_Id: sessionId },
  })

  reply.status(200).send({ meals })
}
