/*
  Warnings:

  - Added the required column `ImgUrl` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentUrl` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "News" ADD COLUMN     "ImgUrl" TEXT NOT NULL,
ADD COLUMN     "contentUrl" TEXT NOT NULL;
