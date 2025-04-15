import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'

export async function createMeals(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userSchema = z.object({
    title: z.string(),
    description: z.string(),
    isondiet: z.boolean(),
  })

  const { title, description, isondiet } = userSchema.parse(request.body)

  const { sessionId } = request.cookies

  const meal = await prisma.meals.create({
    data: {
      title,
      description,
      user_Id: sessionId!,
      is_on_diet: isondiet,
    },
  })

  reply.status(201).send({
    message: `Meal created with ID: ${meal.id}`,
  })
}
