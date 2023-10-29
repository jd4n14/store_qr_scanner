import { styled, Card, Icon } from "@mui/material";
import { Person } from "@mui/icons-material";
import { User } from "../types";

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

interface UserCardProps {
  user: User;
  onClick: () => void;
}

export const UserCard = (props: UserCardProps) => {
  return (
    <CardWrapper
      variant="outlined"
      sx={(theme) => ({
        padding: theme.spacing(2),
      })}
      onClick={props.onClick}
    >
      <h2>{props.user.name}</h2>
      <Icon>
        <Person />
      </Icon>
    </CardWrapper>
  );
};
