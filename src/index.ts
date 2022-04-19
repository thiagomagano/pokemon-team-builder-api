import express from 'express'
import cors from 'cors'
import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()


app.use(express.json())

// Porta do servidor
const PORT = process.env.PORT || 3333

// Endpoint raiz
app.get('/', (req, res) => {
    res.send('Bem-vindo, cria!')
})

// Resposta padrão para quaisquer outras requisições:
app.use((req, res) => {
    res.status(404)
})

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

//cia um novo usuário
// app.post('/signup', async (req, res) => {
//   const { name, email, partys } = req.body
//   console.log(partys)

//   const partyData = partys?.map((party: Prisma.PartyCreateInput) => {
//     return {tittle: party?.title, pokemonsIds: party?.pokemonsIds}
//   })

//     const result = await prisma.user.create({
//       data: {
//         name,
//         email,
//         partys: partyData
//       },
//     }).catch(err => console.log(err))
    
//   res.json(result)
// })

app.post('/pokemon', async (req, res) => {
  const { id, name, type, avatarUrl } = req.body
  
  try {
    const result = await prisma.pokemon.create({
      data: {
        id,
        name,
        type,
        avatarUrl
      }
    })
      res.json(result)
  } catch (err) {
    res.json({ error: err })
  }
})


// Inicia o sevidor
app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso http://localhost:${PORT}`)
})