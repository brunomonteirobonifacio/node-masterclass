import fastify from 'fastify';
import { memoriesRoutes } from './routes/memories';
import cors from '@fastify/cors';

const app = fastify()

app.register(cors, {
  origin: '*'
})

app.register(memoriesRoutes)

app.listen({ port: 3333 }).then(() => {
  console.log('Server running!')
})