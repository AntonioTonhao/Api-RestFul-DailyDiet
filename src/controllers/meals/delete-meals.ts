import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../lib/prisma'
import z from 'zod'

export async function deleteMeal(request: FastifyRequest, reply: FastifyReply) {
  const schemaIdParams = z.object({
    idParams: z.string().uuid(),
  })

  const { idParams } = schemaIdParams.parse(request.params)

  await prisma.meals.delete({
    where: { id: idParams },
  })

  return reply.status(200).send({
    message: 'Meal deleted',
  })
}
