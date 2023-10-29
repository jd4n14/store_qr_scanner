import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { AppDialog, ShowQR , Search} from '../../shared/components'
import { AddVehicleForm, VehicleCard } from "./components";
import { StyledGrid, StyledHeader } from "./styles.tsx";
import { useVehiclesPage } from "./hooks/useVehiclesPage";


const VehiclesPage = () => {
  const { allVehiclesRequest, onSubmit } = useVehiclesPage();

  if (allVehiclesRequest.isLoading) {
    return <div>Loading...</div>;
  }
  if (allVehiclesRequest.isError) {
    return <div>Error...</div>;
  }
  const vehicles = allVehiclesRequest?.data?.vehicles || [];
  return (
    <div>
      <StyledHeader>
        <h1>Vehiculos</h1>
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
      <Search />
      <StyledGrid>
        {vehicles.map((vehicles) => (
          <ShowQR key={vehicles._id} title={vehicles.name} value={vehicles._id}>
            {({ toggle }) => (
              <VehicleCard onClick={() => toggle()} vehicle={vehicles} />
            )}
          </ShowQR>
        ))}
      </StyledGrid>
    </div>
  );
};

export default VehiclesPage;
