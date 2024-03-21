DROP INDEX IF EXISTS "unique_idx";--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'airports'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "airports" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "airports" ALTER COLUMN "airportCode" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "airports" ADD COLUMN "airportId" serial NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_idx" ON "airports" ("airportId");