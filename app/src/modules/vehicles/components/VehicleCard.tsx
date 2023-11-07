import { styled, Card, IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Vehicle } from "../types";
import { useHover } from "@uidotdev/usehooks";
import { AppDialog } from "../../../shared/components";
import { VehicleForm } from "./VehicleForm";

export const CardWrapper = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  textAlign: "center",
  color: theme.palette.text.secondary,
  cursor: "pointer",
}));

const StyledActions = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  gap: theme.spacing(1),
  // the child with class delete-icon will be animated
  transition: "all 0.5s ease",
}));

interface VehicleCardProps {
  vehicle: Vehicle;
  onClick: () => void;
  onUpdate: (vehicle: Pick<Vehicle, "name">) => Promise<void>;
}

export const VehicleCard = (props: VehicleCardProps) => {
  const [ref, hovering] = useHover();
  return (
    <CardWrapper
      variant="outlined"
      sx={(theme) => ({
        padding: theme.spacing(2),
      })}
      ref={ref}
    >
      <div>
        <h2 onClick={props.onClick}>{props.vehicle.name}</h2>
      </div>
      <AppDialog
        title="Editar vehiculo"
        trigger={({ toggle }) =>
          hovering && (
            <StyledActions>
              <IconButton onClick={() => toggle()}>
                <Edit />
              </IconButton>
            </StyledActions>
          )
        }
      >
        {({ toggle }) => (
          <VehicleForm
            initialValues={{ name: props.vehicle.name }}
            onSubmit={async (values) => {
              toggle();
              await props.onUpdate({ name: values.name });
            }}
          />
        )}
      </AppDialog>
    </CardWrapper>
  );
};
