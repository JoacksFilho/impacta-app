CREATE TABLE IF NOT EXISTS "flights" (
	"flightId" serial PRIMARY KEY NOT NULL,
	"departureAirport" text NOT NULL,
	"arrivalAirport" text NOT NULL,
	"flightTime" text NOT NULL,
	"flightPrice" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "users";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_idx" ON "flights" ("flightId");
