import express, { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router: Router = express.Router()

router.get('/drafts', async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany({
    where: { published: false },
    include: { author: true }
  })
  res.json(posts)
})

router.get('/filter', async (req: Request, res: Response) => {
  const { searchString }: { searchString?: string } = req.query
  const filteredPosts = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: searchString,
          },
        },
        {
          content: {
            contains: searchString,
          },
        },
      ],
    },
  })
  res.json(filteredPosts)
})

router.get('/feed', async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true }
  })
  res.json(posts)
})

router.post('/', async (req: Request, res: Response) => {
  const { title, content, authorEmail } = req.body
  const result = await prisma.post.create({
    data: {
      title,
      content,
      published: false,
      author: { connect: { email: authorEmail } },
    },
  })
  res.json(result)
})

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const post = await prisma.post.delete({
    where: {
      id: Number(id),
    },
  })
  res.json(post)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
    include: { author: true }
  })
  res.json(post)
})

router.put('/publish/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const post = await prisma.post.update({
    where: { id: Number(id) },
    data: { published: true },
  })
  res.json(post)
})

export default router