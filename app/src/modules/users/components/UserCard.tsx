import { styled, Card, Icon, Typography } from "@mui/material";
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
      <div>
        <Typography variant="h6" sx={{ textAlign: "left" }}>
          {props.user.name}
        </Typography>
        <Typography variant="body2" sx={{ textAlign: "left" }}>
          {props.user?.role?.name === "admin" ? "Administrador" : "Usuario"}
        </Typography>
      </div>
      <Icon>
        <Person />
      </Icon>
    </CardWrapper>
  );
};
