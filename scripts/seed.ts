import Airports from "@/app/enums/airports";
import { newAirport, insertAirport } from "@/lib/db";

interface NewAirport {
  airportId: number;
  airportCode: string;
  airportCity: string;
  airportName: string;
}

let airportId = 0;

async function main() {
  for (const [code, name] of Object.entries(Airports)) {
    const newAirport: NewAirport = {
      airportId: airportId++,
      airportCode: code,
      airportCity: name.split(",")[0],
      airportName: name.split(",")[1],
    };

    const res = await insertAirport(newAirport);
    console.log("Insert data success:", res);
  }
  process.exit();
}

main();
