import { FastifyInstance } from "fastify";
import { boolean, z } from 'zod';
import { prisma } from "../lib/prisma";

export async function memoriesRoutes(app: FastifyInstance) {
  app.get('/memories', async () => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        created_at: 'asc'
      }
    })

    return memories.map(memory => {
      return {
        id: memory.id,
        cover_url: memory.cover_url,
        excerpt: memory.content.length > 112 ? memory.content.substring(115).concat('...') : memory.content
      }
    })
  })

  app.get('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = paramsSchema.parse(request.params)
    
    const memory = await prisma.memory.findUniqueOrThrow({
      where: { id }
    })

    return memory
  })

  app.post('/memories', async (request) => {
    const bodySchema = z.object({
      content: z.string(),
      cover_url: z.string().url(),
      is_public: z.coerce.boolean().default(false)
    })

    const { content, is_public, cover_url } = bodySchema.parse(request.body)
    
    const memory = await prisma.memory.create({
      data: {
        content,
        cover_url,
        is_public,
        user_id: 'e00124fd-8336-4902-858c-0050dfda92b5'
      }
    })
  })

  app.put('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      content: z.string(),
      cover_url: z.string().url(),
      is_public: z.coerce.boolean().default(false)
    })

    const { content, is_public, cover_url } = bodySchema.parse(request.body)
    
    const memory = await prisma.memory.update({
      where: {
        id
      },
      data: {
        content,
        cover_url,
        is_public,
      }
    })

    return memory
  })

  app.delete('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = paramsSchema.parse(request.params)
    
    const memory = await prisma.memory.delete({
      where: { id }
    })
  })
}