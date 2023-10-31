import React from "react";
import { Button, Typography, styled } from "@mui/material";
import { ShowQR } from "../../shared/components/qr/index.ts";
import { AppDialog } from "../../shared/components/dialog/index.tsx";
import { Add } from "@mui/icons-material";
import { AddStoreForm } from "./component/AddStoreForm.tsx";
import { useStorePage } from "./hooks/useStorePage.ts";
import { StoreCard } from "./component/StoreCard.tsx";
import { Search } from "../../shared/components/index.ts";
import { Helmet } from "react-helmet-async";

const StyledGrid = styled("div")(({ theme }) => ({
  gap: theme.spacing(2),
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "repeat(1, 1fr)",
  },
}));

const StorePage: React.FC = () => {
  const { isLoading, onSubmit, storeList, onSearch } = useStorePage();
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Helmet>
        <title> Tiendas </title>
      </Helmet>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h3">Tiendas</Typography>
        <AppDialog
          trigger={({ toggle }) => (
            <Button variant="contained" startIcon={<Add />} onClick={() => toggle()}>
              Agregar
            </Button>
          )}
          title="Agregar tienda"
        >
          {({ toggle }) => <AddStoreForm onSubmit={(values) => onSubmit(values, toggle)} />}
        </AppDialog>
      </div>
      <Search onSearch={onSearch} />
      <StyledGrid>
        {storeList.map((store) => (
          <ShowQR key={store._id} title={store.name} value={store._id}>
            {({ toggle }) => <StoreCard store={store} onClick={toggle} key={store._id} />}
          </ShowQR>
        ))}
      </StyledGrid>
    </div>
  );
};

export default StorePage;
