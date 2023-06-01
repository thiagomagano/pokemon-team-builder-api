/*
  Warnings:

  - You are about to drop the `Party` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PartyToPokemon` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Party" DROP CONSTRAINT "Party_userId_fkey";

-- DropForeignKey
ALTER TABLE "_PartyToPokemon" DROP CONSTRAINT "_PartyToPokemon_A_fkey";

-- DropForeignKey
ALTER TABLE "_PartyToPokemon" DROP CONSTRAINT "_PartyToPokemon_B_fkey";

-- DropTable
DROP TABLE "Party";

-- DropTable
DROP TABLE "_PartyToPokemon";

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PokemonToTeam" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PokemonToTeam_AB_unique" ON "_PokemonToTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_PokemonToTeam_B_index" ON "_PokemonToTeam"("B");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PokemonToTeam" ADD CONSTRAINT "_PokemonToTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PokemonToTeam" ADD CONSTRAINT "_PokemonToTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
