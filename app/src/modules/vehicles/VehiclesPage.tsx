import { Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { AppDialog, ShowQR, Search } from "../../shared/components";
import { AddVehicleForm, VehicleCard } from "./components";
import { StyledGrid, StyledHeader } from "./styles.tsx";
import { useVehiclesPage } from "./hooks/useVehiclesPage";

const VehiclesPage = () => {
  const { vehicleList, onSubmit, isLoading, onSearch } = useVehiclesPage();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
          {({ toggle }) => <AddVehicleForm onSubmit={(values) => onSubmit(values, toggle)} />}
        </AppDialog>
      </StyledHeader>
      <Search onSearch={onSearch} />
      <StyledGrid>
        {vehicleList.map((vehicles) => (
          <ShowQR key={vehicles._id} title={vehicles.name} value={vehicles._id}>
            {({ toggle }) => <VehicleCard onClick={() => toggle()} vehicle={vehicles} />}
          </ShowQR>
        ))}
      </StyledGrid>
    </div>
  );
};

export default VehiclesPage;
