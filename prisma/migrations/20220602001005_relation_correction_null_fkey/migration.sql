-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_vehicle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "userId" INTEGER,
    CONSTRAINT "vehicle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_vehicle" ("available", "brand", "id", "model", "type", "userId") SELECT "available", "brand", "id", "model", "type", "userId" FROM "vehicle";
DROP TABLE "vehicle";
ALTER TABLE "new_vehicle" RENAME TO "vehicle";
CREATE UNIQUE INDEX "vehicle_id_key" ON "vehicle"("id");
CREATE UNIQUE INDEX "vehicle_userId_key" ON "vehicle"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
