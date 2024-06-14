
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { flights } from "@/lib/schema";

export async function GET() {
  try {
    const allFlights = await db.select().from(flights);
    return NextResponse.json(allFlights);
  } catch (error) {
    console.error('Erro ao buscar voos:', error);
    return NextResponse.json({ error: 'Erro ao buscar voos' }, { status: 500 });
  }
}
