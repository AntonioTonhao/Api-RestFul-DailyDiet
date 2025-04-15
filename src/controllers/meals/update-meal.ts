import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../lib/prisma'
import z from 'zod'

export async function updateMeal(request: FastifyRequest, reply: FastifyReply) {
  const schemaUpdateData = z.object({
    title: z.string(),
    description: z.string(),
  })

  const { title, description } = schemaUpdateData.parse(request.body)

  const { idParams } = request.params as { idParams: string }

  await prisma.meals.update({
    where: { id: idParams },
    data: {
      title,
      description,
    },
  })

  return reply.status(200).send({
    message: 'Task actualized',
  })
}
