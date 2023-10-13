import React, { useState } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Card, Icon, styled } from "@mui/material";

interface Store {
  id: number;
  nombre: string;
  [key: string]: string | number;
}

const tiendas: Store[] = [
  { id: 1, nombre: "Tienda 1", col2: "World" },
  { id: 2, nombre: "Tienda 2", col2: "is Awesome" },
  { id: 3, nombre: "Tienda 3", col2: "is Amazing" },
];

const StyledGrid = styled('div')(({ theme }) => ({
  gap: theme.spacing(2),
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
}));

const TileTienda = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  cursor: 'pointer',
}));

const TiendasPage: React.FC = () => {
  return (
    <div>
      <h1>Tiendas</h1>
      <StyledGrid>
        {tiendas.map((tienda) => (
          <TileTienda key={tienda.id} variant="outlined" sx={(theme) => ({
            padding: theme.spacing(2),
          })}>
            <h2>{tienda.nombre}</h2>
            <Icon>
              <img src="/assets/icons/navbar/store_line.svg" alt="icon" />
            </Icon>
          </TileTienda>
        ))}
      </StyledGrid>
    </div>
  );
};

export default TiendasPage;
