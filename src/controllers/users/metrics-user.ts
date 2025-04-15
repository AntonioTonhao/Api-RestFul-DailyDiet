import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../lib/prisma'

export async function metricsUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { idParams } = request.params as { idParams: string }

  const countMeals = await prisma.meals.count({
    where: {
      user_Id: idParams,
    },
  })

  const countMealOnDiet = await prisma.meals.count({
    where: {
      user_Id: idParams,
      is_on_diet: true,
    },
  })

  const countMealOffDiet = await prisma.meals.count({
    where: {
      user_Id: idParams,
      is_on_diet: false,
    },
    orderBy: {
      created_at: 'asc',
    },
  })

  let sequenceMeal = 0
  let currentSequenceMeal = 0

  const meals = await prisma.meals.findMany({
    where: {
      user_Id: idParams,
    },
  })

  for (const meal of meals) {
    if (meal.is_on_diet === true) {
      currentSequenceMeal++
      if (currentSequenceMeal > sequenceMeal) {
        sequenceMeal = currentSequenceMeal
      }
    } else {
      currentSequenceMeal = 0 // quebra a sequência só quando sair da dieta
    }
  }

  return reply.status(200).send({
    metrics: {
      totalMeals: countMeals,
      mealsOnDiet: countMealOnDiet,
      mealsOffDiet: countMealOffDiet,
      bestSequence: sequenceMeal,
      currenteSequence: currentSequenceMeal,
    },
  })
}
