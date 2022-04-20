import { PrismaClient, Prisma } from '@prisma/client'
import axios from "axios";

const prisma = new PrismaClient()
const api = axios.create({
  baseURL:
    "https://pokeapi.co/api/v2",
});

function transformTypeUrlToTypeId(url: String): Number {
    let typeId = null;
    
    if (url.length === 33) typeId = parseInt(url.slice(31, 32))
    
    if (url.length === 34) typeId = parseInt(url.slice(31, 33))
    
    
    return typeId
}  
async function getAllPokemons() {
  
  let pokemons = []
  for (let i = 1; i <= 151; i++) {
    const result = await api.get(`/pokemon/${i}/`)
    const pokemonsData = result.data
    pokemons = [...pokemons, {
      id: pokemonsData.id,
      name: pokemonsData.name,
      avatarUrl: pokemonsData.sprites.front_default,
      }]
  }

  return pokemons
}

async function getAllTypes() {
  let types = []
  
  const result = await api.get(`https://pokeapi.co/api/v2/generation/1`)
  const typesData = result.data.types
  typesData.map(type => {
    types = [...types, {
      id: transformTypeUrlToTypeId(type.url),
      name: type.name
    }]
  })
  return types;
}

async function seedTypes() {
    const typesData = getAllTypes()
    console.log(`Start seeding ...`)
    for (const t of await typesData) {
      const pokemon = await prisma.type.create({
        data: t,
      })
      console.log(`Created type with id: ${pokemon.id}`)
    }
    console.log(`Seeding finished.`)
  }

async function seedPokemons() {
    
    const pokemonsData = getAllPokemons()
    console.log(`Start seeding ...`)
    for (const p of await pokemonsData) {
      const pokemon = await prisma.pokemon.create({
        data: p,
      })
      console.log(`Created pokemon with id: ${pokemon.id}`)
    }
    console.log(`Seeding finished.`)
  }
  

async function main() {
  seedTypes()
  //seedPokemons() 
}


main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
