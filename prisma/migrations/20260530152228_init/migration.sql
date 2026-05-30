/*
  Warnings:

  - You are about to drop the column `ScheduleAt` on the `appointments` table. All the data in the column will be lost.
  - Added the required column `scheduleAt` to the `appointments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "ScheduleAt",
ADD COLUMN     "scheduleAt" TIMESTAMP(3) NOT NULL;
