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

export default function Home() {

  const [aeroportosArray, setAeroportosArray] = useState<any[]>([]); // Defina o estado para armazenar os aeroportos
  const [selectedAirport, setSelectedAirport] = useState<any>({ ida: null, volta: null});
  const [flights, setFlights] = useState<any>(null)

  useEffect(() => {
      const fetchAeroportos = async () => {
          try {
        
              const response = await fetch(encodedUri);
              const data = await response.json();
              console.log(data);
              setAeroportosArray(data.allAirports.map((item) => ({ id: item.airportId, label: `${item.airportCity} - ${item.airportName}`, ...item}))); // Define os aeroportos no estado
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

 async function searchFlightSubmit(event){
  event.preventDefault()
  const data = fetch(`http://localhost:3000/api/getflights?ida=${selectedAirport.ida?.airportCode}&volta=${selectedAirport.volta?.airportCode}`).then((res) => res.json()).then((res) => setFlights(res));
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



  return (
    <form 
     onSubmit={searchFlightSubmit}
    >
      <div>
        <AutocompleteInput options={aeroportosArray?? null} label="Origem" value={selectedAirport.ida} onChange={(e, value) => setSelectedAirport((prev) => ({...prev, ida: value}))} /><div>{`${selectedAirport?.ida?.airportCode}`}</div>
        <AutocompleteInput options={aeroportosArray?? null} label="Destino"value={selectedAirport.volta} onChange={(e, value) => setSelectedAirport((prev) => ({...prev, volta: value}))} /><div>{`${selectedAirport?.volta?.airportCode}`}</div>
        <AutocompleteInput options={flightTypes} label="Tipo de Voo" />
        <div>{`${JSON.stringify(selectedAirport)}`}</div>
        <Button
          type="submit"
          variant="outlined"
          onClick={(OnclickHandler)}
        >
          Buscar
        </Button>
        <div>{flights ? JSON.stringify(flights) : null}</div>
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
