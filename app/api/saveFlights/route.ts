
// import { NextApiRequest, NextApiResponse } from 'next';
// import { drizzle } from "drizzle-orm/vercel-postgres";


// const { Pool } = require('pg')
// require('dotenv').config()

// const pool = new Pool({
//   connectionString: "postgres://default:YQ9UWBitEZk8@ep-icy-boat-a4h1vxjc-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require?sslmode=require",
// })

// const db = drizzle(pool);

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const flightData = req.body;

//     try {
//       const query = `
//         INSERT INTO flights (airline, flight_number, departure_airport, departure_time, arrival_airport, arrival_time, total_duration, price)
//         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
//       `;
//       const values = [
//         flightData.airline,
//         flightData.flight_number,
//         flightData.departure_airport,
//         flightData.departure_time,
//         flightData.arrival_airport,
//         flightData.arrival_time,
//         flightData.total_duration,
//         flightData.price,
//       ];

//       await db.query(query, values);

//       res.status(200).json({ message: 'Dados salvos com sucesso' });
//     } catch (error) {
//       console.error('Erro ao salvar dados no PostgreSQL:', error);
//       res.status(500).json({ error: 'Erro ao salvar dados no PostgreSQL' });
//     }
//   } else {
//     res.status(405).json({ error: 'Método não permitido' });
//   }
// }

import { NextApiRequest, NextApiResponse } from 'next';
import { sql, Client } from '@vercel/postgres';
import { flights } from '../../../lib/schema';

// Crie uma instância do cliente do Vercel PostgreSQL
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const flightData = req.body;

    try {
      // Conecte ao banco de dados
      await client.connect();

      // Crie a consulta SQL usando a função sql e faça uma conversão de tipo explícita para string
      const query = (sql`
        INSERT INTO flights (airline, flight_number, departure_airport, departure_time, arrival_airport, arrival_time, total_duration, price)
        VALUES (${flightData.airline}, ${flightData.flight_number}, ${flightData.departure_airport}, ${flightData.departure_time}, ${flightData.arrival_airport}, ${flightData.arrival_time}, ${flightData.total_duration}, ${flightData.price})
      `) as unknown as string;

      // Executa a consulta de inserção
      await client.query(query);

      res.status(200).json({ message: 'Dados salvos com sucesso' });
    } catch (error) {
      console.error('Erro ao salvar dados no PostgreSQL:', error);
      res.status(500).json({ error: 'Erro ao salvar dados no PostgreSQL' });
    } finally {
      // Certifique-se de fechar a conexão
      await client.end();
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}







