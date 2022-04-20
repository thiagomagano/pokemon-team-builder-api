import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()


app.use(express.json())

// Porta do servidor
const PORT = process.env.PORT || 3333


app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

app.post('/users', async (req, res) => {
  const { name, email } = req.body

    const result = await prisma.user.create({
      data: {
        name,
        email
      },
    }).catch(err => console.log(err))
    
  res.json(result)
})

app.get('/pokemons', async (req, res) => {
  const pokemons = await prisma.pokemon.findMany()
  res.json(pokemons)
})


// Inicia o sevidor
app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso http://localhost:${PORT}`)
})