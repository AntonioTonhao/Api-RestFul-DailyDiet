import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../lib/prisma'
import z from 'zod'

export async function deleteMeal(request: FastifyRequest, reply: FastifyReply) {
  const schemaIdParams = z.object({
    idParams: z.string().uuid(),
  })

  const { idParams } = schemaIdParams.parse(request.params)

  const { sessionId } = request.cookies

  await prisma.meals.delete({
    where: { user_Id: sessionId, id: idParams },
  })

  return reply.status(200).send({
    message: 'Meal deleted',
  })
}
