import "@/lib/config";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { airports } from "./schema";
import * as schema from "./schema";



export const db = drizzle(sql, { schema });

export const getAirports = async () => {
  const selectResult = await db.select().from(airports);
  console.log("Results", selectResult);
  return selectResult;
};

export type newAirport = typeof airports.$inferInsert;

export const insertAirport = async (flight: newAirport) => {
  return db.insert(airports).values(flight).returning();
};

// export const getUsers2 = async () => {
//   const result = await db.query.flights.findMany();
//   return result;
// };