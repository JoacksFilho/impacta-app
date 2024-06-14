CREATE TABLE IF NOT EXISTS "airports" (
	"airportId" serial PRIMARY KEY NOT NULL,
	"airportCode" text NOT NULL,
	"airportCity" text NOT NULL,
	"airportName" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "flights" (
	"flightId" serial PRIMARY KEY NOT NULL,
	"flightCompany" text NOT NULL,
	"flightNumber" text NOT NULL,
	"departureAirport" text NOT NULL,
	"arrivalAirport" text NOT NULL,
	"flightTime" text NOT NULL,
	"flightPrice" text NOT NULL,
	"airlineLog" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_idx" ON "airports" ("airportId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "flight_unique_idx" ON "flights" ("flightId");