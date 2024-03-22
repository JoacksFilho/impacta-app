import { NextResponse, NextApiRequest } from "next/server";
import { getJson } from 'serpapi';
const util = require("util");

export async function GET(request: NextApiRequest){
    let aaa = {};
    const search = new URL(request.url).search;
    const urlParams = new URLSearchParams(search);

    const options = {
        ida_id: urlParams.get("ida"),
        volta_id: urlParams.get("volta")
    }
    console.log(urlParams.get("ida"))

    const allFlights = await getJson(
    {
        api_key:
        "fac25df631c63558122ebb31dc2132f84ad14b265f25934b34899ed36ba4574c",
        engine: "google_flights",
        departure_id: options.ida_id,
        arrival_id: options.volta_id,
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
    
    return NextResponse.json(allFlights)
}
