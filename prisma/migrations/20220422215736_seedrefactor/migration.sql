/*
  Warnings:

  - The primary key for the `Type` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `url` to the `Type` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Party_userId_key";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Type" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL
);
INSERT INTO "new_Type" ("id", "name") SELECT "id", "name" FROM "Type";
DROP TABLE "Type";
ALTER TABLE "new_Type" RENAME TO "Type";
CREATE UNIQUE INDEX "Type_name_key" ON "Type"("name");
CREATE TABLE "new__PokemonToType" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Pokemon" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Type" ("name") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__PokemonToType" ("A", "B") SELECT "A", "B" FROM "_PokemonToType";
DROP TABLE "_PokemonToType";
ALTER TABLE "new__PokemonToType" RENAME TO "_PokemonToType";
CREATE UNIQUE INDEX "_PokemonToType_AB_unique" ON "_PokemonToType"("A", "B");
CREATE INDEX "_PokemonToType_B_index" ON "_PokemonToType"("B");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
