"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import '../styles/globals.css' // Certifique-se de que o caminho está correto

const columns: GridColDef[] = [
    {
      field: 'airlineLog',
      headerName: '',
      width: 80,
      renderCell: (params) => (
        <img src={params.value} alt="Cia. Aérea" style={{ width: '100%', height: 'auto' }} />
      )
    },
    { field: 'flightCompany', headerName: 'Cia. Aérea', width: 180, editable: false },
    { field: 'flightNumber', headerName: 'Número Voo', width: 150, editable: true },
    { field: 'departureAirport', headerName: 'Origem', width: 180, editable: true },
    { field: 'arrivalAirport', headerName: 'Destino', width: 180, editable: true },
    { field: 'flightTime', headerName: 'Horário do Voo', width: 180 },
    { field: 'flightPrice', headerName: 'Preço', width: 120 },
    { field: 'createdAt', headerName: 'Criado em', width: 180 },
  ];
const Dashboard = () => {
  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch('/api/getSavedFlights');
        const data = await response.json();
        setFlights(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar voos:", error);
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  return (
    <div>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Voos Salvos
        </Typography>
        <Paper sx={{ p: 3 }}>
          <DataGrid
            rows={flights}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            loading={loading}
            getRowId={(row) => row.flightId} // Use flightId como id da linha
          />
        </Paper>
      </Box>
    </div>
  );
};

export default Dashboard;
