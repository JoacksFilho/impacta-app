CREATE TABLE IF NOT EXISTS "airports" (
	"airportCode" serial PRIMARY KEY NOT NULL,
	"airportCity" text NOT NULL,
	"airportName" text NOT NULL
);
--> statement-breakpoint
DROP TABLE "flights";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_idx" ON "airports" ("airportCode");