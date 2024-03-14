import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const flights = pgTable(
  "flights",
  {
    flightId: serial("flightId").primaryKey(),
    departureAirport: text("departureAirport").notNull(),
    arrivalAirport: text("arrivalAirport").notNull(),
    flightTime: text("flightTime").notNull(),
    flightPrice: text("flightPrice").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (flights) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(flights.flightId),
    };
  }
);
