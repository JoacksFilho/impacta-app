import { getUsers } from "@/lib/db";

const { getJson } = require("serpapi");
const util = require('util');

export default async function Home() {

  const data = await getJson({
    api_key: "fac25df631c63558122ebb31dc2132f84ad14b265f25934b34899ed36ba4574c",
    engine: "google_flights",
    departure_id: "CGH",
    arrival_id: "SDU",
    hl: "pt-br",
    currency: "BRL",
    outbound_date: "2024-04-20",
    return_date: "2024-04-25",
    stops: "0",
    type: "1"
}, (results: JSON) => {
    console.log(util.inspect(results, { depth: null, colors: true }));
});

  return (
    <div>
      <div>sql-like: {JSON.stringify(data)}</div>
      {/* <div>relational: {JSON.stringify(data)}</div> */}
    </div>
  );
}