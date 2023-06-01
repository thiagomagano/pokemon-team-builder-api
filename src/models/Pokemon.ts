import { Pokemon, Type } from "@prisma/client";

export interface IPokemon extends Pokemon {
  Types: Type[];
}
