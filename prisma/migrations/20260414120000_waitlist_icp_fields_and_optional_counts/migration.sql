-- AlterTable
ALTER TABLE "waitlist_entries" ALTER COLUMN "propertyCount" DROP NOT NULL;
ALTER TABLE "waitlist_entries" ALTER COLUMN "yearsInIndustry" DROP NOT NULL;

-- AlterTable
ALTER TABLE "waitlist_entries" ADD COLUMN "primaryZone" TEXT;
ALTER TABLE "waitlist_entries" ADD COLUMN "exclusiveListingsBucket" TEXT;
ALTER TABLE "waitlist_entries" ADD COLUMN "ticketAverageBucket" TEXT;
