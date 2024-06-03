import { PrismaClient } from '@prisma/client';
import { Hono } from 'hono'

const client = new PrismaClient()

const app = new Hono()

type ArticleQuery = {
  id?: number,
  title?: string,
  description?: string,
  content?: string,
  from?: string,
  to?: string,
  limit?: string,
  offset?: string,
  orderBy?: Array<string>,
  order?: 'asc' | 'desc'
}

app.get('/articles', async (c) => {
  const q: ArticleQuery = c.req.query()
  const fromDate = q.from ? new Date(q.from) : undefined
  const toDate = q.to ? new Date(q.to) : undefined

  const articles = await client.articles.findMany({
    where: {
      id: q.id ? Number(q.id) : undefined,
      title: q.title ? { contains: q.title } : undefined,
      content: q.content ? { contains: q.content } : undefined,
      description: q.description ? { contains: q.description } : undefined,
      created_at: {
        gte: fromDate,
        lte: toDate,
      }
    },
    take: q.limit ? parseInt(q.limit) : undefined,
    skip: q.offset ? parseInt(q.offset) : undefined,
  })
  return c.json(articles)
})

app.put('/articles', async (c) => {
  const body = await c.req.parseBody()
  const newArticle = await client.articles.create({
    data: {
      title: (body.title as string),
      content: (body.content as string),
      description: (body.description as string),
    }
  })
  return c.json(newArticle)
})

export default app