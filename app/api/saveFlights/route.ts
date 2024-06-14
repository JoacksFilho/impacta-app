// import { NextResponse, NextRequest } from "next/server";
// import { insertFlight, db, newFlight } from '@/lib/db';
// import {flights} from "@/lib/schema";
// import { NextApiRequest, NextApiResponse } from "next";

// // export async function POST(request: NextRequest){
// //   const saveFlightInsert = async (flight: newFlight) => {
// //       return db.insert(flights).values(flight).returning();
// //     };

// //   return NextResponse.json({saveFlightInsert})
// // }


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const flightData = req.body;

//     try {
//       // Insere o voo no banco de dados
//       const result = await insertFlight(flightData);
//       res.status(200).json({ message: 'Dados salvos com sucesso', result });
//     } catch (error) {
//       console.error('Erro ao salvar dados no PostgreSQL:', error);
//       res.status(500).json({ error: 'Erro ao salvar dados no PostgreSQL' });
//     }
//   } else {
//     res.status(405).json({ error: 'Método não permitido' });
//   }
// }



import { NextResponse, NextRequest } from "next/server";
import { insertFlight } from '@/lib/db'; // Certifique-se de que o caminho e a função estão corretos
import { newFlight } from "@/lib/db"; // Certifique-se de que o caminho e o tipo estão corretos

// // Função para lidar com o método POST
// export async function POST(request: NextRequest) {
//   console.log("Recebendo solicitação de POST...");

//   try {
//     const flightData: newFlight = await request.json();
//     console.log("Dados recebidos:", flightData);

//     // Insere o voo no banco de dados
//     const result = await insertFlight(flightData);
//     console.log("Resultado da inserção:", result);

//     return NextResponse.json({ message: 'Dados salvos com sucesso', result });
//   } catch (error) {
//     console.error('Erro ao salvar dados no PostgreSQL:', error);
//     return NextResponse.json({ error: 'Erro ao salvar dados no PostgreSQL' }, { status: 500 });
//   }
// }

export async function POST(request: NextRequest) {
  console.log("Recebendo solicitação de POST...");

  try {
    const flightData: newFlight = await request.json();
    console.log("Dados recebidos:", flightData);

    // Insere o voo no banco de dados
    const result = await insertFlight(flightData);
    console.log("Resultado da inserção:", result);

    return NextResponse.json({ message: 'Dados salvos com sucesso', result });
  } catch (error) {
    console.error('Erro ao salvar dados no PostgreSQL:', error);
    return NextResponse.json({ error: 'Erro ao salvar dados no PostgreSQL' }, { status: 500 });
  }
}
