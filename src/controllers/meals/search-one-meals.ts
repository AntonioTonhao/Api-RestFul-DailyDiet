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

  const requestParams = schemaIdParams.safeParse(request.params)

  if (!requestParams.success) {
    return reply.status(400).send({
      message: 'Params not found',
    })
  }

  const { idParams } = requestParams.data

  const { sessionId } = request.cookies

  const meal = await prisma.meals.findFirst({
    where: { user_Id: sessionId, id: idParams },
  })

  if (!meal) {
    return reply.status(401).send()
  }

  return reply.status(200).send({ meal })
}
