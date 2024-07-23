/*
  Warnings:

  - Added the required column `avatar_url` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `github_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `login` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "memories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cover_url" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "memories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "github_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL
);
INSERT INTO "new_users" ("id", "name") SELECT "id", "name" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_github_id_key" ON "users"("github_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
