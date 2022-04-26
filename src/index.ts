import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

// Porta do servidor
const PORT = process.env.PORT || 3333;

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/signup", async (req, res) => {
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

app.get("/login", async (req, res) => {
  const email = req.query.email as string;
  if (email) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });
      user
        ? res.status(200).json(user)
        : res.status(404).json({ msg: "not found" });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(400).json({ msg: "You Should Pass a Email" });
  }
});

app.get("/pokemons", async (req, res) => {
  const pokemons = await prisma.pokemon.findMany({
    include: {
      types: true,
    },
  });
  res.json(pokemons);
});

app.post("/party", async (req, res) => {
  const MAX_NUMBER_OF_POKEMONS = 5;
  const { title, pokemonList, userId } = req.body;

  if (pokemonList.length > MAX_NUMBER_OF_POKEMONS) {
    res.status(400).json({
      msg: `Error to many pokemons in your party: ${MAX_NUMBER_OF_POKEMONS}`,
    });
    return;
  }
  if (pokemonList.length === 0) {
    res.status(400).json({
      msg: `Error your party needs to have at least one pokemon!`,
    });
    return;
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
