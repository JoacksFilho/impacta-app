
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

// import { NextApiRequest, NextApiResponse } from 'next';
// import { sql, Client } from '@vercel/postgres';
// import { flights } from '../../../lib/schema';

// // Crie uma instância do cliente do Vercel PostgreSQL
// const client = new Client({
//   connectionString: "postgres://default:YQ9UWBitEZk8@ep-icy-boat-a4h1vxjc-pooler.us-east-1.aws.neon.tech/verceldb?sslmode=require",
// });

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const flightData = req.body;

//     try {
//       // Conecte ao banco de dados
//       await client.connect();

//       // Crie a consulta SQL usando a função sql e faça uma conversão de tipo explícita para string
//       const query = (sql`
//         INSERT INTO flights (airline, flight_number, departure_airport, departure_time, arrival_airport, arrival_time, total_duration, price)
//         VALUES (${flightData.airline}, ${flightData.flight_number}, ${flightData.departure_airport}, ${flightData.departure_time}, ${flightData.arrival_airport}, ${flightData.arrival_time}, ${flightData.total_duration}, ${flightData.price})
//       `) as unknown as string;

//       // Executa a consulta de inserção
//       await client.query(query);

//       res.status(200).json({ message: 'Dados salvos com sucesso' });
//     } catch (error) {
//       console.error('Erro ao salvar dados no PostgreSQL:', error);
//       res.status(500).json({ error: 'Erro ao salvar dados no PostgreSQL' });
//     } finally {
//       // Certifique-se de fechar a conexão
//       await client.end();
//     }
//   } else {
//     res.status(405).json({ error: 'Método não permitido' });
//   }
// }

// import { NextApiRequest, NextApiResponse } from 'next';
// import { insertFlight } from '@/lib/db';

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

import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

// Crie uma instância do cliente do Vercel PostgreSQL
const pool = new Pool({
  connectionString: "postgres://default:YQ9UWBitEZk8@ep-icy-boat-a4h1vxjc-pooler.us-east-1.aws.neon.tech/verceldb?sslmode=require",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const flightData = req.body;

    try {
      // Conecte ao banco de dados
      const client = await pool.connect();

      try {
        // Crie a consulta SQL usando parâmetros
        const query = `
          INSERT INTO flights (departureAirport, arrivalAirport, flightTime, flightPrice, createdAt)
          VALUES ($1, $2, $3, $4, $5)
        `;

        // Executa a consulta de inserção
        await client.query(query, [
          flightData.departureAirport,
          flightData.arrivalAirport,
          flightData.flightTime,
          flightData.flightPrice,
          flightData.createdAt,
        ]);

        res.status(200).json({ message: 'Dados salvos com sucesso' });
      } catch (queryError) {
        console.error('Erro ao executar a query:', queryError);
        res.status(500).json({ error: 'Erro ao executar a query' });
      } finally {
        // Certifique-se de liberar o cliente
        client.release();
      }
    } catch (connectionError) {
      console.error('Erro ao conectar ao PostgreSQL:', connectionError);
      res.status(500).json({ error: 'Erro ao conectar ao PostgreSQL' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}






