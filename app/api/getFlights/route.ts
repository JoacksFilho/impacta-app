import { NextResponse, NextApiRequest } from "next/server";
import { getJson } from 'serpapi';
const util = require("util");


export async function GET(request: NextApiRequest){
    let resultSeach = {};
    const search = new URL(request.url).search;
    const urlParams = new URLSearchParams(search);

    const options = {
        Origem_code: urlParams.get("ida"),
        Destino_code: urlParams.get("volta"),
        data_Ida:  urlParams.get("dataIda"),
        data_Volta: urlParams.get("dataVolta"),
        tipo_Voo: urlParams.get("tipoVoo")
    }
    console.log(options);
    const allFlights = await getJson(
    {
        api_key:
        "fac25df631c63558122ebb31dc2132f84ad14b265f25934b34899ed36ba4574c",
        engine: "google_flights",
        departure_id: options.Origem_code,
        arrival_id: options.Destino_code,
        hl: "pt-br",
        currency: "BRL",
        outbound_date: options.data_Ida,
        return_date: options.data_Volta,
        stops: "0",
        type: options.tipo_Voo,
    },
    (results: JSON) => {
        resultSeach = util.inspect(results, { depth: null, colors: true });
    }
    );
    console.log(resultSeach)
    return NextResponse.json(allFlights)
}




// import { NextApiRequest } from "next";
// import { NextResponse } from "@next/server";
// import { getJson } from 'serpapi';
// import util from "util";

// export default async function GET(request: NextApiRequest): Promise<NextResponse> {
//     let resultSearch: any = {}; 
//     const search = new URL(request.url!).search;
//     const urlParams = new URLSearchParams(search);

//     const options = {
//         Origem_code: urlParams.get("ida"),
//         Destino_code: urlParams.get("volta"),
//         data_Ida: urlParams.get("dataIda"),
//         data_Volta: urlParams.get("dataVolta")
//     };

//     const allFlights = await getJson({
//         api_key: "fac25df631c63558122ebb31dc2132f84ad14b265f25934b34899ed36ba4574c",
//         engine: "google_flights",
//         departure_id: options.Origem_code,
//         arrival_id: options.Destino_code,
//         hl: "pt-br",
//         currency: "BRL",
//         outbound_date: options.data_Ida,
//         return_date: options.data_Volta,
//         stops: "0",
//         type: "1",
//     });

//     resultSearch = util.inspect(allFlights, { depth: null, colors: true });

//     return new NextResponse({ body: JSON.stringify(allFlights), status: 200 });
// }
