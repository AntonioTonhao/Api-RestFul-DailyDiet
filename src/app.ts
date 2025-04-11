import fastify from 'fastify'
import { mealRoutes, userRoutes } from './http/routes'
import FastifyCookie from '@fastify/cookie'

export const app = fastify()

app.register(FastifyCookie)

app.register(userRoutes)

app.register(mealRoutes)
