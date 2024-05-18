import "@/lib/config";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { airports } from "./schema";
import { flights } from "./schema";
import * as schema from "./schema";

export const db = drizzle(sql, { schema });

export const getAirports = async () => {
  const selectResult = await db.select().from(airports);
  console.log("Results", selectResult);
  return selectResult;
};

export type newAirport = typeof airports.$inferInsert;

export const insertAirport = async (airport: newAirport) => {
  return db.insert(airports).values(airport).returning();
};


export const getFlights = async () => {
  const selectResult = await db.select().from(flights);
  console.log("Results", selectResult);
  return selectResult;
};

export type newFlight = typeof flights.$inferInsert;

export const insertFlight = async (flight: newFlight) => {
  return db.insert(flights).values(flight).returning();
};
