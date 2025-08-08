/*
  Warnings:

  - You are about to drop the column `UserID` on the `comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."comment" DROP CONSTRAINT "comment_UserID_fkey";

-- AlterTable
ALTER TABLE "public"."comment" DROP COLUMN "UserID";
