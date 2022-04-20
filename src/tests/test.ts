import axios from "axios";
import { PrismaClient } from '@prisma/client'

//const prisma = new PrismaClient()

const api = axios.create({
  baseURL:
    "https://pokeapi.co/api/v2",
});

let pokemons = []
let types = []

function transformTypeUrlToTypeId(url: String): Number {
    let typeId = null;
    
    if (url.length === 33) typeId = parseInt(url.slice(31, 32))
    
    if (url.length === 34) typeId = parseInt(url.slice(31, 33))
    
    
    return typeId
  }  

async function getAllPokemons() {
  
  
  for (let i = 10; i <= 20; i++) {
    const result = await api.get(`/pokemon/${i}/`)
    const pokemonsData = result.data
    pokemons = [...pokemons, {
      id: pokemonsData.id,
      name: pokemonsData.name,
      sprite: pokemonsData.sprites.front_default,
      types: pokemonsData.types.map(type => transformTypeUrlToTypeId(type.type.url))
      }]
    }

  console.dir(pokemons)
  
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

getAllTypes()

