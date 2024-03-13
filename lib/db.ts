import "@/lib/config";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { flights } from "./schema";
import * as schema from "./schema";



export const db = drizzle(sql, { schema });

export const getUsers = async () => {
  const selectResult = await db.select().from(flights);
  console.log("Results", selectResult);
  return selectResult;
};

export type NewFlight = typeof flights.$inferInsert;

export const insertUser = async (flight: NewFlight) => {
  return db.insert(flights).values(flight).returning();
};

// export const getUsers2 = async () => {
//   const result = await db.query.flights.findMany();
//   return result;
// };