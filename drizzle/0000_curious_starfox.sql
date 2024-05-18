CREATE TABLE IF NOT EXISTS "airports" (
	"airportId" serial PRIMARY KEY NOT NULL,
	"airportCode" text NOT NULL,
	"airportCity" text NOT NULL,
	"airportName" text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_idx" ON "airports" ("airportId");