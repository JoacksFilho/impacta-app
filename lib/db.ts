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

// export const insertFlight = async (flight: newFlight) => {
//   return db.insert(flights).values(flight).returning();
// };

export async function insertFlight(flightData: any) {
  try {
    const result = await db
      .insert(flights)
      .values({
        departureAirport: flightData.departure_airport,
        arrivalAirport: flightData.arrival_airport,
        flightTime: `${flightData.departure_time} - ${flightData.arrival_time}`, // Combina departure_time e arrival_time
        flightPrice: flightData.price.toString(), // Certifique-se de que flightPrice é um texto
        flightCompany: flightData.airline, // Use o valor correto para flightCompany
        flightNumber: flightData.flight_number, // Use o valor correto para flightNumber
        airlineLog: flightData.logo_cia // Use o valor correto para airlineLogo
      })
      .returning();

    return result;
  } catch (error) {
    console.error('Erro na função insertFlight:', error);
    throw new Error('Erro ao inserir voo no banco de dados');
  }
}
