import { getUsers } from "@/lib/db";
import { useState } from "react";

const { getJson } = require("serpapi");
const util = require("util");

export default async function Home() {
  // const [apiResult, setApiResult] = useState();

  let aaa = {};

  const data = await getJson(
    {
      api_key:
        "fac25df631c63558122ebb31dc2132f84ad14b265f25934b34899ed36ba4574c",
      engine: "google_flights",
      departure_id: "CGH",
      arrival_id: "SDU",
      hl: "pt-br",
      currency: "BRL",
      outbound_date: "2024-04-20",
      return_date: "2024-04-25",
      stops: "0",
      type: "1",
    },
    (results: JSON) => {
      aaa = util.inspect(results, { depth: null, colors: true });
    }
  );

  return (
    <div>
      {data.best_flights.map((flight: any) => (
        <div className="mt-5">
          {
          JSON.stringify(flight.flights[0].departure_airport)} - {JSON.stringify(flight.flights[0].arrival_airport)}
          {/* {flight.map((flightDetail: any) => (
            <div>{flightDetail.departure_airport}</div>
          ))} */}
        </div>
      ))}
      {/* <div>sql-like: {JSON.stringify()}</div> */}
      {/* <div>relational: {JSON.stringify(data)}</div> */}
    </div>
  );
}
