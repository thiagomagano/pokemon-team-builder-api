import { Pokemon, Team } from "@prisma/client";

export interface ITeam extends Team {
  Pokemons: Pokemon[];
}
