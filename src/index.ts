import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import userRoutes from "./routes/userRoutes.js";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

// Porta do servidor
const PORT = process.env.NODE_LOCAL_PORT || 6868;

app.use("/users", userRoutes);

app.post("/login", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        msg: "Email field is required"
      });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        msg: "User not found"
      });
    }

    return res.status(200).json(user);

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      msg: "Internal server error",
      error: error
    });
  }
});

// Helper function to find user by email
async function findUserByEmail(email: string) {
  return await prisma.user.findFirst({
    where: { email }
  });
}

app.get("/pokemons", async (req, res) => {
  const pokemons = await prisma.pokemon.findMany({
    orderBy: [
      {
        id: "asc",
      },
    ],
    include: {
      types: true,
    },
  });
  res.json(pokemons);
});

app.post("/team", async (req, res) => {
  const MAX_NUMBER_OF_POKEMONS = 6;
  const { title, pokemonList, userId } = req.body;

  if (pokemonList.length > MAX_NUMBER_OF_POKEMONS) {
    res.status(400).json({
      msg: `Error to many pokemons in your team: ${MAX_NUMBER_OF_POKEMONS}`,
    });
    return;
  }
  if (pokemonList.length === 0) {
    res.status(400).json({
      msg: `Error your team needs to have at least one pokemon!`,
    });
    return;
  }

  const team = await prisma.team.create({
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
  res.json(team);
});

app.get("/team", async (req, res) => {
  let userId = parseInt(req.query.userId as string);

  const teams = await prisma.team.findMany({
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
  res.status(200).json(teams);
});

app.delete("/team", async (req, res) => {
  // let userId = parseInt(req.query.userId as string);
  let { teamId } = req.body;

  const deleteTeam = await prisma.team.delete({
    where: {
      id: teamId,
    },
  });

  res.status(200).json(deleteTeam);
});

app.get("/types", async (req, res) => {
  const types = await prisma.type.findMany();
  res.json(types);
});

// Inicia o sevidor
app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso PORTA: ${PORT}`);
});
