-- AlterTable: ticket promedio único → venta + renta
ALTER TABLE "waitlist_entries" DROP COLUMN IF EXISTS "ticketAverageBucket";
ALTER TABLE "waitlist_entries" ADD COLUMN "ticketSaleBucket" TEXT;
ALTER TABLE "waitlist_entries" ADD COLUMN "ticketRentBucket" TEXT;
