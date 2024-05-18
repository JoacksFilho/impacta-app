import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import {InferModel} from "drizzle-orm"

// export const flights = pgTable(
//   "flights",
//   {
//     flightId: serial("flightId").primaryKey(),
//     departureAirport: text("departureAirport").notNull(),
//     arrivalAirport: text("arrivalAirport").notNull(),
//     flightTime: text("flightTime").notNull(),
//     flightPrice: text("flightPrice").notNull(),
//     createdAt: timestamp("createdAt").defaultNow().notNull(),
//   },
//   (flights) => {
//     return {
//       uniqueIdx: uniqueIndex("unique_idx").on(flights.flightId),
//     };
//   }
// );

export const airports = pgTable(
  "airports",
  {
    airportId: serial("airportId").primaryKey(),
    airportCode: text("airportCode").notNull(),
    airportCity: text("airportCity").notNull(),
    airportName: text("airportName").notNull(),
  },
  (airports) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(airports.airportId),
    };
  }
);

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

// export type Airport = InferModel<typeof airports>
// export type newAirportType = InferModel<typeof airports, "insert">


