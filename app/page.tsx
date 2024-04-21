"use client";

import { useEffect, useState } from "react";
import AutocompleteInput from "./components/autocompleteAirports";
import { Button } from "@mui/material";
import DatePickerFormated from "./components/datePicker";
import dayjs, { Dayjs } from "dayjs";
import * as React from "react";
import Stack from "@mui/material/Stack";
import { DataGrid, GridColDef } from "@mui/x-data-grid"; // Importe o componente DataGrid
import {Box, Typography} from '@mui/material'
import AppBarMenu from "./components/AppBar";
import './styles.css';
import { Skeleton } from '@mui/material';
import Image from "next/image";

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

  const [selectedFlightType, setSelectedFlightType] = useState<string | null>(null);

  const handleFlightTypeChange = (selectedType: string | null) => {
    setSelectedFlightType(selectedType);
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);

  

  async function searchFlightSubmit(event: React.FormEvent) {
    setIsLoading(true);
    event.preventDefault();
    try {
      const typeString = selectedFlightType === 'Ida' ? "2" : "1";
      const response = await fetch(`http://localhost:3000/api/getFlights?ida=${selectedAirport.ida?.airportCode}&volta=${selectedAirport.volta?.airportCode}&dataIda=${selectedDateIda}&dataVolta=${selectedDateVolta}&tipoVoo=${typeString}`);
      const data = await response.json();
      console.log('Dados recebidos:', data); // Verificar os dados recebidos
  
      // Verificar se 'best_flights' existe nos dados recebidos
      if (data && data.best_flights && Array.isArray(data.best_flights)) {
        setFlights(data.best_flights);
        setIsLoading(false);
      } else {
        console.error("Dados de voos recebidos estão incorretos:", data);
        setIsLoading(false);
      }
      
      console.log('Tipo selecionado:', typeString);
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
    { field: 'airline', headerName: 'Cia. Aérea', width: 180, editable: false },
    { field: 'flight_number', headerName: 'Número Voo', width: 150, editable: true },
    { field: 'departure_airport', headerName: 'Origem', width: 180, editable: true },
    { field: 'departure_time', headerName: 'Departure Time', width: 150 },
    { field: 'arrival_airport', headerName: 'Destino', width: 180, editable: true },
    { field: 'arrival_time', headerName: 'Arrival Time', width: 180 },
    { field: 'total_duration', headerName: 'Duração (min)', width: 150 },
    { field: 'price', headerName: 'Preço', width: 120 },
  ];

const headerClass = 'custom-header';
const cellClass = 'custom-cell'

  const rows = flights.flatMap((flight: any, index: number) => {
    return flight.flights.map((flightSegment: any, segmentIndex: number) => ({
      id: `${index}-${segmentIndex}`, // Use um ID único para cada segmento de voo
      logo_cia: flightSegment.airline_logo,
      airline: flightSegment.airline,
      flight_number: flightSegment.flight_number,
      airplane: flightSegment.airplane,
      price: flight.price,
      total_duration: flight.total_duration,
      departure_airport: flightSegment.departure_airport.id,
      departure_time: flightSegment.departure_airport.time.split(" ")[1],
      arrival_airport: flightSegment.arrival_airport.id,
      arrival_time: flightSegment.arrival_airport.time.split(" ")[1],
    }));
  });
  
  return (   
    <div>
      <AppBarMenu/>       
    <div className="container mx-auto mt-14">
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
        <AutocompleteInput 
        options={flightTypes} 
        label="Tipo de Voo" 
        onChange={handleFlightTypeChange} />
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
      <Box sx={{ position: 'relative', height: 500, width: "100%", marginBottom: '10px' }}>
        {isLoading ? ( 
          <Skeleton animation="wave" height={500} /> 
        ) : flights.length > 0 ? ( 
          <>
            <Typography variant="h5" align="center" mb={3}>        
            </Typography>
            <DataGrid 
              columns={columns} 
              rows={rows}  
              headerClassName={headerClass}        
              cellClassName={cellClass} 
            />
          </>
        ) : ( 
          <div style={{ position: 'relative', width: '100%', height: '100%', marginBottom: '10px'}}>
            <Image src="/background.png" alt="Logo" layout="fill" objectFit="contain" />
          </div>
        )}
      </Box>
      </div>     
    </div>
    </div>    
  );
}
