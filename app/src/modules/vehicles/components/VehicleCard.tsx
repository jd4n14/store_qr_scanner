import { styled, Card, Icon } from "@mui/material";
import { CarRentalSharp } from "@mui/icons-material";
import { Vehicle } from "../types";

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

interface VehicleCardProps {
  vehicle: Vehicle;
  onClick: () => void;
}

export const VehicleCard = (props: VehicleCardProps) => {
  return (
    <CardWrapper
      variant="outlined"
      sx={(theme) => ({
        padding: theme.spacing(2),
      })}
      onClick={props.onClick}
    >
      <h2>{props.vehicle.name}</h2>
      <Icon>
        <CarRentalSharp />
      </Icon>
    </CardWrapper>
  );
};
