
// "use client";

// import { useEffect, useState } from "react";
// import AutocompleteInput from "../components/autocompleteAirports";
// import { Button } from "@mui/material";
// import DatePickerFormated from "../components/datePicker";
// import dayjs, { Dayjs } from "dayjs";
// import * as React from "react";
// import Stack from "@mui/material/Stack";
// import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
// import { Box, Typography } from '@mui/material';
// import AppBarMenu from "../components/AppBar";
// import { Skeleton } from '@mui/material';
// import Image from "next/image";
// import { toast } from 'react-toastify';
// import '../styles/styles.css';

// const uri: string = "http://localhost:3000/api/connections";
// const encodedUri: string = encodeURI(uri);

// const flightTypes: string[] = ["Ida", "Ida e volta"];

// export default function Home() {
//   const [aeroportosArray, setAeroportosArray] = useState<any[]>([]);
//   const [selectedAirport, setSelectedAirport] = useState<any>({
//     ida: null,
//     volta: null,
//   });
//   const [flights, setFlights] = useState<any[]>([]);
//   const [selectedDateIda, setSelectedDateIda] = useState<string | null>(null);
//   const [selectedDateVolta, setSelectedDateVolta] = useState<string | null>(null);

//   const dateFormatAux = (date: Date) => {
//     var d = new Date(date),
//       month = "" + (d.getMonth() + 1),
//       day = "" + d.getDate(),
//       year = "" + d.getFullYear();

//     if (month.length < 2) month = "0" + month;
//     if (day.length < 2) day = "0" + day;

//     return [year, month, day].join("-");
//   };

//   const dateFormat = (date: Date) => {
//     console.log(new Date(date));

//     let formatYearMonthDay = dateFormatAux(date);
//     return formatYearMonthDay;
//     console.log(formatYearMonthDay);
//   };

//   const handleDateChangeIda = (date: Date) => {
//     const formattedDate = dateFormat(date);
//     setSelectedDateIda(formattedDate);
//     console.log("Formatted Date Ida:", formattedDate);
//   };

//   const handleDateChangeVolta = (date: Date) => {
//     const formattedDate = dateFormat(date);
//     setSelectedDateVolta(formattedDate);
//     console.log("Formatted Date :", formattedDate);
//   };

//   useEffect(() => {
//     const fetchAeroportos = async () => {
//       try {
//         const response = await fetch(encodedUri);
//         const data = await response.json();
//         setAeroportosArray(data.allAirports.map((item: any) => ({
//           id: item.airportId,
//           label: `${item.airportCity} - ${item.airportName}`,
//           ...item,
//         })));
//       } catch (error) {
//         console.error("Erro ao buscar aeroportos:", error);
//       }
//     };

//     fetchAeroportos();
//   }, []);

//   const [selectedFlightType, setSelectedFlightType] = useState<string | null>(null);

//   const handleFlightTypeChange = (selectedType: string | null) => {
//     setSelectedFlightType(selectedType);
//   };

//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   async function searchFlightSubmit(event: React.FormEvent) {
//     setIsLoading(true);
//     event.preventDefault();
//     try {
//       const typeString = selectedFlightType === 'Ida' ? "2" : "1";
//       const response = await fetch(`http://localhost:3000/api/getFlights?ida=${selectedAirport.ida?.airportCode}&volta=${selectedAirport.volta?.airportCode}&dataIda=${selectedDateIda}&dataVolta=${selectedDateVolta}&tipoVoo=${typeString}`);
//       const data = await response.json();
//       console.log('Dados recebidos:', data);

//       if (data && data.best_flights && Array.isArray(data.best_flights)) {
//         setFlights(data.best_flights);
//         setIsLoading(false);
//       } else {
//         console.error("Dados de voos recebidos estão incorretos:", data);
//         setIsLoading(false);
//       }
//     } catch (error) {
//       console.error("Erro ao buscar voos:", error);
//     }
//   }

//   const columns: GridColDef[] = [
//     {
//       field: 'logo_cia',
//       headerName: '',
//       width: 80,
//       renderCell: (params) => (
//         <img src={params.row.logo_cia} alt="Cia. Aérea" style={{ width: '100%', height: 'auto' }} />
//       )
//     },
//     { field: 'airline', headerName: 'Cia. Aérea', width: 180, editable: false },
//     { field: 'flight_number', headerName: 'Número Voo', width: 150, editable: true },
//     { field: 'departure_airport', headerName: 'Origem', width: 180, editable: true },
//     { field: 'departure_time', headerName: 'Departure Time', width: 150 },
//     { field: 'arrival_airport', headerName: 'Destino', width: 180, editable: true },
//     { field: 'arrival_time', headerName: 'Arrival Time', width: 180 },
//     { field: 'total_duration', headerName: 'Duração (min)', width: 150 },
//     { field: 'price', headerName: 'Preço', width: 120 },
//   ];

//   const headerClass = 'custom-header';
//   const cellClass = 'custom-cell';

//   const rows = flights.flatMap((flight: any, index: number) => {
//     return flight.flights.map((flightSegment: any, segmentIndex: number) => ({
//       id: `${index}-${segmentIndex}`,
//       logo_cia: flightSegment.airline_logo,
//       airline: flightSegment.airline,
//       flight_number: flightSegment.flight_number,
//       airplane: flightSegment.airplane,
//       price: flight.price,
//       total_duration: flight.total_duration,
//       departure_airport: flightSegment.departure_airport.id,
//       departure_time: flightSegment.departure_airport.time.split(" ")[1],
//       arrival_airport: flightSegment.arrival_airport.id,
//       arrival_time: flightSegment.arrival_airport.time.split(" ")[1],
//     }));
//   });

//   const [selectedRow, setSelectedRow] = useState<any | null>(null);

//   const handleRowSelection = (selectionModel: GridRowSelectionModel) => {
//     if (selectionModel.length > 0) {
//       const selectedId = selectionModel[0];
//       const selectedRowData = rows.find((row) => row.id === selectedId);
//       setSelectedRow(selectedRowData);
//     } else {
//       setSelectedRow(null);
//     }
//   };

//   const saveSelectedRow = async () => {
//     if (!selectedRow) {
//       console.error('Nenhuma linha selecionada');
//       return;
//     }

//     try {     
//       console.log(selectedRow);
//       const response = await fetch('/api/saveFlights', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(selectedRow),
//       });

//       if (response.ok) {
//         // toast.success(`O voo ${selectedRow.flight_number} foi salvo com sucesso!`);
//         alert(`O voo da Cia ${selectedRow.airline} - ${selectedRow.flight_number},  foi salvo com sucesso!`);
//       } else {
//         toast.error('Erro ao salvar o voo');
//       }
//     } catch (error) {
//       toast.error('Erro ao salvar o voo');
//     }
//   };

//   return (
//     <div>
//       <div className="container mx-auto mt-8">
//         <div className="flex flex-col justify-evenly">
//           <form onSubmit={searchFlightSubmit} className="flex flex-col md:flex-row gap-4">
//             <div className="flex flex-row items-center justify-center gap-4">
//               <AutocompleteInput
//                 options={aeroportosArray ?? null}
//                 label="Origem"
//                 value={selectedAirport.ida}
//                 onChange={(e: any, value: any) =>
//                   setSelectedAirport((prev: any) => ({ ...prev, ida: value }))
//                 }
//               />
//               <AutocompleteInput
//                 options={aeroportosArray ?? null}
//                 label="Destino"
//                 value={selectedAirport.volta}
//                 onChange={(e: any, value: any) =>
//                   setSelectedAirport((prev: any) => ({ ...prev, volta: value }))
//                 }
//               />
//               <AutocompleteInput
//                 options={flightTypes}
//                 label="Tipo de Voo"
//                 onChange={handleFlightTypeChange}
//               />
//               <DatePickerFormated
//                 label="Data Ida"
//                 value={selectedDateIda}
//                 onChange={handleDateChangeIda}
//               />
//               <DatePickerFormated
//                 label="Data Volta"
//                 value={selectedDateVolta}
//                 onChange={handleDateChangeVolta}
//               />
//               <Button type="submit" variant="outlined" color="primary" size="large">
//                 Buscar
//               </Button>
//             </div>
//           </form>
//           <div className="mt-8">
//             {isLoading ? (
//               <Skeleton variant="rectangular" width="100%" height={400} />
//             ) : (
//               flights.length > 0 && (
//                 <Box sx={{ height: 400, width: '100%' }}>
//                   <DataGrid
//                     rows={rows}
//                     columns={columns}
//                     pageSize={5}
//                     rowsPerPageOptions={[5]}
//                     checkboxSelection
//                     onRowSelectionModelChange={(selectionModel) =>
//                       handleRowSelection(selectionModel as GridRowSelectionModel)
//                     }
//                   />
//                   <div className="mt-4">
//                     <Button
//                       size="large"
//                       onClick={saveSelectedRow}
//                       variant="outlined"
//                       color="primary"
//                       disabled={!selectedRow}
//                     >
//                       Salvar Voo
//                     </Button>
//                   </div>
//                 </Box>
//               )
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import AutocompleteInput from "../components/autocompleteAirports";
import { Button } from "@mui/material";
import DatePickerFormated from "../components/datePicker";
import dayjs, { Dayjs } from "dayjs";
import * as React from "react";
import Stack from "@mui/material/Stack";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { Box, Typography } from '@mui/material';
import AppBarMenu from "../components/AppBar";
import { Skeleton } from '@mui/material';
import Image from "next/image";
import { toast } from 'react-toastify';
import '../styles/styles.css';

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
    let formatYearMonthDay = dateFormatAux(date);
    return formatYearMonthDay;
  };

  const handleDateChangeIda = (date: Date) => {
    const formattedDate = dateFormat(date);
    setSelectedDateIda(formattedDate);
    console.log("Formatted Date Ida:", formattedDate);
  };

  const handleDateChangeVolta = (date: Date) => {
    const formattedDate = dateFormat(date);
    setSelectedDateVolta(formattedDate);
    console.log("Formatted Date Volta:", formattedDate);
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
    event.preventDefault();

    console.log("Origem_code:", selectedAirport.ida?.airportCode);
    console.log("Destino_code:", selectedAirport.volta?.airportCode);
    console.log("data_Ida:", selectedDateIda);
    console.log("data_Volta:", selectedDateVolta);
    console.log("tipo_Voo:", selectedFlightType);

    if (!selectedAirport.ida || !selectedAirport.volta || !selectedDateIda || !selectedDateVolta || !selectedFlightType) {
      console.error("Todos os campos são obrigatórios");
      return;
    }

    setIsLoading(true);

    try {
      const typeString = selectedFlightType === 'Ida' ? "2" : "1";
      const response = await fetch(`http://localhost:3000/api/getFlights?ida=${selectedAirport.ida?.airportCode}&volta=${selectedAirport.volta?.airportCode}&dataIda=${selectedDateIda}&dataVolta=${selectedDateVolta}&tipoVoo=${typeString}`);
      const data = await response.json();
      console.log('Dados recebidos:', data);

      if (data && data.best_flights && Array.isArray(data.best_flights)) {
        setFlights(data.best_flights);
        setIsLoading(false);
      } else {
        console.error("Dados de voos recebidos estão incorretos:", data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Erro ao buscar voos:", error);
      setIsLoading(false);
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
  const cellClass = 'custom-cell';

  const rows = flights.flatMap((flight: any, index: number) => {
    return flight.flights.map((flightSegment: any, segmentIndex: number) => ({
      id: `${index}-${segmentIndex}`,
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

  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  const handleRowSelection = (selectionModel: GridRowSelectionModel) => {
    if (selectionModel.length > 0) {
      const selectedId = selectionModel[0];
      const selectedRowData = rows.find((row) => row.id === selectedId);
      setSelectedRow(selectedRowData);
    } else {
      setSelectedRow(null);
    }
  };

  const saveSelectedRow = async () => {
    if (!selectedRow) {
      console.error('Nenhuma linha selecionada');
      return;
    }

    try {     
      console.log(selectedRow);

      const response = await fetch('/api/saveFlights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedRow),
      });

      if (response.ok) {
        alert(`O voo da Cia ${selectedRow.airline} - ${selectedRow.flight_number},  foi salvo com sucesso!`);
      } else {
        toast.error('Erro ao salvar o voo');
      }
    } catch (error) {
      toast.error('Erro ao salvar o voo');
    }
  };

  return (
    <div>
      <div className="container mx-auto mt-8">
        <div className="flex flex-col justify-evenly">
          <form onSubmit={searchFlightSubmit} className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-row items-center justify-center gap-4">
              <AutocompleteInput
                options={aeroportosArray ?? null}
                label="Origem"
                value={selectedAirport.ida}
                onChange={(e: any, value: any) =>
                  setSelectedAirport((prev: any) => ({ ...prev, ida: value }))
                }
              />
              <AutocompleteInput
                options={aeroportosArray ?? null}
                label="Destino"
                value={selectedAirport.volta}
                onChange={(e: any, value: any) =>
                  setSelectedAirport((prev: any) => ({ ...prev, volta: value }))
                }
              />
              <AutocompleteInput
                options={flightTypes}
                label="Tipo de Voo"
                onChange={handleFlightTypeChange}
              />
              <DatePickerFormated
                label="Data Ida"
                value={selectedDateIda}
                onChange={handleDateChangeIda}
              />
              <DatePickerFormated
                label="Data Volta"
                value={selectedDateVolta}
                onChange={handleDateChangeVolta}
              />
              <Button type="submit" variant="outlined" color="primary" size="large">
                Buscar
              </Button>
            </div>
          </form>
          <div className="mt-8">
            {isLoading ? (
              <Skeleton variant="rectangular" width="100%" height={400} />
            ) : (
              flights.length > 0 && (
                <Box sx={{ height: 400, width: '100%' }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    onRowSelectionModelChange={(selectionModel) =>
                      handleRowSelection(selectionModel as GridRowSelectionModel)
                    }
                  />
                  <div className="mt-4">
                    <Button
                      size="large"
                      onClick={saveSelectedRow}
                      variant="outlined"
                      color="primary"
                      disabled={!selectedRow}
                    >
                      Salvar Voo
                    </Button>
                  </div>
                </Box>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
