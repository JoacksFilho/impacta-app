"use client";

import { useEffect, useState } from "react";
import AutocompleteInput from "./components/autocompleteAirports";
import { Button } from "@mui/material";
import DatePickerFormated from "./components/datePicker";
import dayjs, { Dayjs } from "dayjs";
import * as React from "react";
import Stack from "@mui/material/Stack";
import { flights } from "./../lib/schema";
import { DataGrid, GridColDef } from "@mui/x-data-grid"; // Importe o componente DataGrid
import {Box, Typography} from '@mui/material'


const uri: string = "http://localhost:3000/api/connections";
const encodedUri: string = encodeURI(uri);

const flightTypes: string[] = ["Ida", "Ida e volta"];

export default function Home() {
  const [aeroportosArray, setAeroportosArray] = useState<any[]>([]);
  const [selectedAirport, setSelectedAirport] = useState<any>({
    ida: null,
    volta: null,
  });
  const [flights, setFlights] = useState<any[]>([]);
  const [selectedDateIda, setSelectedDateIda] = useState<string | null>(null);
  const [selectedDateVolta, setSelectedDateVolta] = useState<string | null>(null);

  const dateFormatAux = (date: Date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = "" + d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const dateFormat = (date: Date) => {
    console.log(new Date(date));

    let formatYearMonthDay = dateFormatAux(date);
    return formatYearMonthDay;
    console.log(formatYearMonthDay);
  };

  const handleDateChangeIda = (date: Date) => {
    const formattedDate = dateFormat(date);
    setSelectedDateIda(formattedDate);
    console.log("Formatted Date Ida:", formattedDate);
  };

  const handleDateChangeVolta = (date: Date) => {
    const formattedDate = dateFormat(date);
    setSelectedDateVolta(formattedDate);
    console.log("Formatted Date :", formattedDate);
  };

  useEffect(() => {
    const fetchAeroportos = async () => {
      try {
        const response = await fetch(encodedUri);
        const data = await response.json();
        setAeroportosArray(data.allAirports.map((item: any) => ({
          id: item.airportId,
          label: `${item.airportCity} - ${item.airportName}`,
          ...item,
        })));
      } catch (error) {
        console.error("Erro ao buscar aeroportos:", error);
      }
    };

    fetchAeroportos();
  }, []);

  async function searchFlightSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/getFlights?ida=${selectedAirport.ida?.airportCode}&volta=${selectedAirport.volta?.airportCode}&dataIda=${selectedDateIda}&dataVolta=${selectedDateVolta}`);
      const data = await response.json();
      setFlights(data.best_flights);
    } catch (error) {
      console.error("Erro ao buscar voos:", error);
    }
  }

  const columns: GridColDef[] = [
    {
      field: 'logo_cia',
      headerName: '',
      width: 80,
      renderCell: (params) => (
        <img src={params.row.logo_cia} alt="Cia. Aérea" style={{ width: '100%', height: 'auto' }} />
      )
    },
    { field: 'airline', headerName: 'Cia. Aérea', width: 150, editable: false },
    { field: 'flight_number', headerName: 'Número Voo', width: 150, editable: true },
    { field: 'departure_airport', headerName: 'Origem', width: 150, editable: true },
    { field: 'departure_time', headerName: 'Departure Time', width: 180 },
    { field: 'arrival_airport', headerName: 'Destino', width: 110, editable: true },
    { field: 'arrival_time', headerName: 'Arrival Time', width: 180 },
    { field: 'total_duration', headerName: 'Duração (min)', width: 150 },
    { field: 'price', headerName: 'Preço', width: 120 },
  ];

  const rows = flights.map((flight: any, index: number) => ({
    id: index,
    logo_cia: flight.airline_logo,
    airline: flight.flights[0].airline,
    flight_number: flight.flights[0].flight_number,
    airplane: flight.flights[0].airplane,
    price: flight.price,
    total_duration: flight.total_duration,
    departure_airport: flight.flights[0].departure_airport.id,
    departure_time: flight.flights[0].departure_airport.time.split(" ")[1],
    arrival_airport: flight.flights[0].arrival_airport.id,
    arrival_time: flight.flights[0].arrival_airport.time.split(" ")[1],
  }));

  return (
    <div className="container mx-auto mt-10">
      <div className="flex flex-col justify-evenly"> 
      <form onSubmit={searchFlightSubmit} className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-row items-center justify-center gap-4">
        {/* <div className="flex items-center"> */}
          <AutocompleteInput 
            options={aeroportosArray ?? null}
            label="Origem"
            value={selectedAirport.ida}
            onChange={(e: any, value: any) =>
              setSelectedAirport((prev: any) => ({ ...prev, ida: value }))
            }
          />
        {/* </div> */}
        {/* <div className="flex items-center"> */}
        <AutocompleteInput
            options={aeroportosArray ?? null}
            label="Destino"
            value={selectedAirport.volta}
            onChange={(e: any, value: any) =>
              setSelectedAirport((prev: any) => ({ ...prev, volta: value }))
            }
          />   
        {/* </div> */}
        {/* <div className="flex items-center"> */}
        <AutocompleteInput options={flightTypes} label="Tipo de Voo" />
        {/* </div>                    */}
          {/* <div className="flex items-center"> */}
          <DatePickerFormated
            label="Data Ida"
            value={selectedDateIda}
            onChange={handleDateChangeIda}
          />
          {/* </div> */}
          {/* <div className="flex items-center"> */}
          <DatePickerFormated
            label="Data Volta"
            value={selectedDateVolta}
            onChange={handleDateChangeVolta}
          />              
          {/* </div>                        */}
          {/* <div className="flex items-center"> */}
          <Button type="submit" variant="outlined" color="primary" size="large">
          Buscar
          </Button>
          {/* </div>             */}
        </div>                    
      </form>
      <Box sx={{ height: 600, width: "100%"}}>
        <Typography variant="h5" align="center" mb={3}>        
        </Typography>
        <DataGrid columns={columns} rows={rows} />
      </Box>
      </div>     
    </div>
  );
}
