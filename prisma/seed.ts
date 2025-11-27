import { prisma } from "../src/lib/prisma";
import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

const POKEMON_NUMBER = 151;

// Gera array de IDs de 1 a POKEMON_NUMBER
const arrayOfIds: number[] = Array.from(
  { length: POKEMON_NUMBER },
  (_, i) => i + 1
);

interface PokemonData {
  id: number;
  name: string;
  avatarUrl: string;
  types: string[];
}

interface TypeData {
  id: number;
  name: string;
  url: string;
}

async function getAllPokemons(): Promise<PokemonData[]> {
  const promises = arrayOfIds.map((id) =>
    api.get(`/pokemon/${id}/`).catch((error) => {
      console.error(`Erro ao buscar Pokemon ${id}:`, error.message);
      return null;
    })
  );

  const results = await Promise.all(promises);

  const pokemons: PokemonData[] = [];

  results.forEach((result) => {
    if (!result || !result.data) return;

    const pokemonData = result.data;
    pokemons.push({
      id: pokemonData.id,
      name: pokemonData.name,
      avatarUrl: pokemonData.sprites.front_default || "",
      types: pokemonData.types.map((t: any) => t.type.name),
    });
  });

  return pokemons;
}

async function getAllTypes(): Promise<TypeData[]> {
  try {
    const result = await api.get(`/type`);
    const typesData = result.data.results;

    return typesData.map((type: any, index: number) => ({
      id: index + 1,
      name: type.name,
      url: type.url,
    }));
  } catch (error) {
    console.error("Erro ao buscar tipos:", error);
    throw error;
  }
}

async function seedTypes() {
  console.log(`Iniciando seed de tipos...`);

  try {
    const typesData = await getAllTypes();
    let created = 0;
    let skipped = 0;

    for (const typeData of typesData) {
      try {
        await prisma.type.upsert({
          where: { name: typeData.name },
          update: {
            id: typeData.id,
            url: typeData.url,
          },
          create: {
            id: typeData.id,
            name: typeData.name,
            url: typeData.url,
          },
        });
        created++;
        console.log(`✓ Tipo criado/atualizado: ${typeData.name}`);
      } catch (error) {
        console.error(`✗ Erro ao criar tipo ${typeData.name}:`, error);
        skipped++;
      }
    }

    console.log(`\nSeed de tipos concluído: ${created} criados/atualizados, ${skipped} com erro\n`);
  } catch (error) {
    console.error("Erro ao fazer seed de tipos:", error);
    throw error;
  }
}

async function seedPokemons() {
  console.log(`Iniciando seed de pokemons...`);

  try {
    const pokemonsData = await getAllPokemons();
    let created = 0;
    let skipped = 0;

    // Usa for...of para garantir que todas as operações sejam concluídas
    for (const data of pokemonsData) {
      try {
        // Prepara os tipos para conectar
        const typeConnections = data.types.map((typeName) => ({
          name: typeName,
        }));

        await prisma.pokemon.upsert({
          where: { id: data.id },
          update: {
            name: data.name,
            avatarUrl: data.avatarUrl,
            types: {
              set: typeConnections,
            },
          },
          create: {
            id: data.id,
            name: data.name,
            avatarUrl: data.avatarUrl,
            types: {
              connect: typeConnections,
            },
          },
        });

        created++;
        console.log(`✓ Pokemon criado/atualizado: ${data.name} (ID: ${data.id})`);
      } catch (error) {
        console.error(`✗ Erro ao criar Pokemon ${data.name} (ID: ${data.id}):`, error);
        skipped++;
      }
    }

    console.log(`\nSeed de pokemons concluído: ${created} criados/atualizados, ${skipped} com erro\n`);
  } catch (error) {
    console.error("Erro ao fazer seed de pokemons:", error);
    throw error;
  }
}

async function main() {
  console.log("=== Iniciando seed do banco de dados ===\n");

  try {
    await seedTypes();
    await seedPokemons();
    console.log("=== Seed concluído com sucesso! ===");
  } catch (error) {
    console.error("Erro durante o seed:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error("Erro fatal no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
