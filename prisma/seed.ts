import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();
const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

const POKEMON_NUMBER = 151;

const arrayOfIds = [];

for (let i = 1; i <= POKEMON_NUMBER; i++) {
  arrayOfIds.push(i);
}

async function getAllPokemons() {
  let pokemons = [];

  const promises = arrayOfIds.map((i) => api.get(`/pokemon/${i}/`));

  const result = await Promise.all(promises);

  result.forEach((r) => {
    const pokemonsData = r.data;

    pokemons = [
      ...pokemons,
      {
        id: pokemonsData.id,
        name: pokemonsData.name,
        avatarUrl: pokemonsData.sprites.front_default,
        types: pokemonsData.types.map((t) => t.type["name"]),
      },
    ];
  });

  return pokemons;
}

async function getAllTypes() {
  let types = [];

  const result = await api.get(`https://pokeapi.co/api/v2/type`);
  const typesData = result.data.results;
  typesData.map((type, index) => {
    types = [
      ...types,
      {
        id: index,
        name: type.name,
        url: type.url,
      },
    ];
  });
  return types;
}

async function seedTypes() {
  const typesData = getAllTypes();
  console.log(`Start seeding ...`);
  for (const t of await typesData) {
    const type = await prisma.type.create({
      data: t,
    });
    console.log(`Created type with id: ${type.id}`);
  }
  console.log(`Seeding finished.`);
}

async function seedPokemons() {
  const pokemonsData = await getAllPokemons();

  console.log(`Start seeding ...`);

  pokemonsData.forEach(async (data) => {
    await prisma.pokemon.create({
      data: {
        id: data.id,
        name: data.name,
        avatarUrl: data.avatarUrl,
        types: {
          connect: !data.types[1]
            ? { name: data.types[0] }
            : [{ name: data.types[0] }, { name: data.types[1] }],
        },
      },
    });
    console.log(`Create Pokemon with id ${data.id}`);
  });
  console.log(`Create all Pokemons`);
}

async function main() {
  await seedTypes();
  await seedPokemons();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
