import { styled, Card, Icon } from "@mui/material";
import { StoreSharp } from "@mui/icons-material";
import { Store } from "../types";

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

interface StoreCardProps {
  store: Store;
  onClick: () => void;
}

export const StoreCard = (props: StoreCardProps) => {
  return (
    <CardWrapper
      variant="outlined"
      sx={(theme) => ({
        padding: theme.spacing(2),
      })}
      onClick={props.onClick}
    >
      <h2>{props.store.name}</h2>
      <Icon>
        <StoreSharp />
      </Icon>
    </CardWrapper>
  );
};
