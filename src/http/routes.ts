import { createCoookie } from '../controllers/users/create-user'
import { FastifyInstance } from 'fastify'
import { searchUser } from '../controllers/users/search-user'
import { createMeals } from '../controllers/meals/create-meals'
import { searchMeals } from '../controllers/meals/search-meals'
import { searchOneMeals } from '../controllers/meals/search-one-meals'
import { checkSessionExists } from '../middlewares/checkSessionIdExists'
import { deleteMeal } from '../controllers/meals/delete-meals'
import { verifyMealOwnership } from '../middlewares/verifyMealOwnership'
import { updateMeal } from '../controllers/meals/update-meal'
import { metricsUser } from '../controllers/users/metrics-user'

export async function userRoutes(app: FastifyInstance) {
  app.post('/session', createCoookie)
  app.get('/user', searchUser)
  app.get(
    '/user/metrics/:idParams',
    { preHandler: [checkSessionExists] },
    metricsUser,
  )
}

export async function mealRoutes(app: FastifyInstance) {
  app.post('/meal', { preHandler: checkSessionExists }, createMeals)
  app.get('/meal', { preHandler: checkSessionExists }, searchMeals)
  app.get(
    '/meal/:idParams',
    { preHandler: [checkSessionExists, verifyMealOwnership] },
    searchOneMeals,
  )
  app.delete(
    '/meal/:idParams',
    { preHandler: [checkSessionExists, verifyMealOwnership] },
    deleteMeal,
  )
  app.put(
    '/meal/:idParams',
    { preHandler: [checkSessionExists, verifyMealOwnership] },
    updateMeal,
  )
}
