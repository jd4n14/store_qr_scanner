import { Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { AppDialog, ShowQR, Search } from "../../shared/components";
import { VehicleForm, VehicleCard } from "./components";
import { StyledGrid, StyledHeader } from "./styles.tsx";
import { useVehiclesPage } from "./hooks/useVehiclesPage";
import { Helmet } from "react-helmet-async";

const VehiclesPage = () => {
  const { vehicleList, onSubmit, isLoading, onSearch, updateVehicle } = useVehiclesPage();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Helmet>
        <title> Vehiculos </title>
      </Helmet>
      <StyledHeader>
        <Typography variant="h3">Vehiculos</Typography>
        <AppDialog
          trigger={({ toggle }) => (
            <Button variant="contained" startIcon={<Add />} onClick={() => toggle()}>
              Agregar
            </Button>
          )}
          title="Agregar vehiculo"
        >
          {({ toggle }) => <VehicleForm onSubmit={(values) => onSubmit(values, toggle)} />}
        </AppDialog>
      </StyledHeader>
      <Search onSearch={onSearch} />
      <StyledGrid>
        {vehicleList.map((vehicles) => (
          <ShowQR key={vehicles._id} title={vehicles.name} value={vehicles._id}>
            {({ toggle }) => (
              <VehicleCard
                onClick={() => toggle()}
                vehicle={vehicles}
                onUpdate={async (values) => {
                  await updateVehicle({ name: values.name, id: vehicles._id });
                }}
              />
            )}
          </ShowQR>
        ))}
      </StyledGrid>
    </div>
  );
};

export default VehiclesPage;
