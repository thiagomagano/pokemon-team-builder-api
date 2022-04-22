import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { parse } from "querystring";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Porta do servidor
const PORT = process.env.PORT || 3333;

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const { name, email } = req.body;

  const result = await prisma.user
    .create({
      data: {
        name,
        email,
      },
    })
    .catch((err) => console.log(err));

  res.json(result);
});

app.get("/pokemons", async (req, res) => {
  const pokemons = await prisma.pokemon.findMany();
  res.json(pokemons);
});

app.post("/party", async (req, res) => {
  const MAX_NUMBER_OF_POKEMONS = 5;
  const { title, pokemonList, userId } = req.body;

  if (pokemonList.length > MAX_NUMBER_OF_POKEMONS) {
    res.status(400).json({
      msg: `Error to many pokemons in your party: ${MAX_NUMBER_OF_POKEMONS}`,
    });
  }
  if (pokemonList.length === 0) {
    res.status(400).json({
      msg: `Error your party needs to at least one pokemon!`,
    });
  }

  const party = await prisma.party.create({
    data: {
      title,
      pokemons: {
        connect: pokemonList.map((pokemon) => {
          return { id: pokemon };
        }),
      },
      userId: userId,
    },
    include: {
      pokemons: true,
    },
  });
  res.json(party);
});

app.get("/party", async (req, res) => {
  let userId = parseInt(req.query.userId as string);

  const partys = await prisma.party.findMany({
    where: {
      userId: userId,
    },
    include: {
      pokemons: {
        include: {
          types: true,
        },
      },
    },
  });
  res.status(200).json(partys);
});

// Inicia o sevidor
app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso http://localhost:${PORT}`);
});
