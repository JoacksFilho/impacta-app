import { NextResponse, NextRequest } from "next/server";
import { db, newAirport, insertAirport, getAirports } from "@/lib/db";
import {airports} from "@/lib/schema";

export async function GET(request: NextRequest){
    const allAirports = await db.select().from(airports);
    return NextResponse.json({allAirports})
}

export async function POST(request: NextRequest){
    const newAirportInsert = async (flight: newAirport) => {
        return db.insert(airports).values(flight).returning();
      };

    return NextResponse.json({newAirportInsert})
}

export async function PUT(request: NextRequest){
    return NextResponse.json({})
}

export async function DELETE(request: NextRequest){
    return NextResponse.json({})
}