/*
  Warnings:

  - Added the required column `description` to the `snacks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `snacks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "snacks" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL;
