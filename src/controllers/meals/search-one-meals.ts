import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../lib/prisma'
import z from 'zod'

export async function searchOneMeals(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schemaIdParams = z.object({
    idParams: z.string().uuid(),
  })

  const { idParams } = schemaIdParams.parse(request.params)

  const meal = await prisma.meals.findUnique({
    where: { id: idParams },
  })

  return reply.status(200).send({ meal })
}
