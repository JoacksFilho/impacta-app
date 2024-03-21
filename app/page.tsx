"use client";

// import { getUsers } from "@/lib/db";
// import { useState } from "react";

const { getJson } = require("serpapi");
const util = require("util");

import { useEffect, useMemo, useState } from "react";
import AutocompleteInput from "./components/autocompleteAirports";
import { Airports } from "./enums/airportsEnum";
import { airportsService } from "./shared/services/api/axios-config/airports/airportsService";
import { Button } from "@mui/material";
import { getAirports } from "@/lib/db";
import { GET } from "./api/connections/route";

const uri: string = "http://localhost:3000/api/connections";
const encodedUri: string = encodeURI(uri);

const flightTypes: string[] = ["Ida", "Ida e volta"];

export default async function Home() {

  const [aeroportosArray, setAeroportosArray] = useState<any[]>([]); // Defina o estado para armazenar os aeroportos

  useEffect(() => {
      const fetchAeroportos = async () => {
          try {
        
              const response = await fetch(encodedUri);
              const data = await response.json();
              setAeroportosArray(data); // Define os aeroportos no estado
          } catch (error) {
              console.error('Erro ao buscar aeroportos:', error);
          }
      };

      fetchAeroportos(); // Chame a função de busca dos aeroportos ao montar o componente
  }, []); // UseEffect com array vazio como segundo argumento para executar apenas uma vez ao montar o componente

  let aaa = {};

 function OnclickHandler(){
  console.log('teste onClick')
 }

 function searchFlightSubmit(){
  console.log('teste subit')
 }
  // useEffect(() => {
  //   airportsService.getAll(1, flightSearch).then((result) => {
  //     if (result instanceof Error) {
  //       alert(result.message);
  //       return;
  //     }
  //     console.log(result);
  //   });
  // }, [flightSearch]);

  // const data = await getJson(
  //   {
  //     api_key:
  //       "fac25df631c63558122ebb31dc2132f84ad14b265f25934b34899ed36ba4574c",
  //     engine: "google_flights",
  //     departure_id: "CGH",
  //     arrival_id: "SDU",
  //     hl: "pt-br",
  //     currency: "BRL",
  //     outbound_date: "2024-04-20",
  //     return_date: "2024-04-25",
  //     stops: "0",
  //     type: "1",
  //   },
  //   (results: JSON) => {
  //     aaa = util.inspect(results, { depth: null, colors: true });
  //   }
  // );

  return (
    <form 
     onSubmit={searchFlightSubmit}
    >
      <div>
        <AutocompleteInput options={aeroportosArray} label="Origem" />
        <AutocompleteInput options={aeroportosArray} label="Destino" />
        <AutocompleteInput options={flightTypes} label="Tipo de Voo" />

        <Button
          type="submit"
          variant="outlined"
          onClick={(OnclickHandler)}
        >
          Buscar
        </Button>
      </div>
      {/* 
      {data.best_flights.map((flight: any) => (
        <div className="mt-5">
          {JSON.stringify(flight.flights[0].departure_airport)} -{" "}
          {JSON.stringify(flight.flights[0].arrival_airport)}
          {flight.map((flightDetail: any) => (
            <div>{flightDetail.departure_airport}</div>
          ))}
        </div>
      ))} */}
      {/* <div>sql-like: {JSON.stringify()}</div>  */}
      {/* <div>relational: {JSON.stringify(data)}</div> */}
    </form>
  );
}
