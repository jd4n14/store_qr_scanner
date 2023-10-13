import { Helmet } from "react-helmet-async";
import { Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const StyledGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
}));

const backgrounds = {
  dashboard: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  users: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  stores: "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)",
  reports: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
  scan: "linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%)",
};

const StyledTile = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),
  cursor: "pointer",
}));

type Role = "admin" | "user";

type TileMapType = {
  title: string;
  link: string;
  background: string;
  role: Role;
};

const TileMap: TileMapType[] = [
  {
    title: "Dashboard",
    link: "/home",
    background: backgrounds.dashboard,
    role: "admin",
  },
  {
    title: "Usuarios",
    link: "/users",
    background: backgrounds.users,
    role: "admin",
  },
  {
    title: "Tiendas",
    link: "/settings",
    background: backgrounds.stores,
    role: "admin",
  },
  {
    title: "Reportes",
    link: "/settings",
    background: backgrounds.reports,
    role: "admin",
  },
  {
    title: "Escanear tienda",
    link: "/scan",
    background: backgrounds.scan,
    role: "user",
  },
  {
    title: "Escanear vehiculo",
    link: "/scan",
    background: backgrounds.reports,
    role: "user",
  },
];

const Tile = ({
  title,
  background = backgrounds.dashboard,
  link,
}: {
  title: string;
  link: string;
  background?: string;
}) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(link);
  };
  return (
    <StyledTile sx={{ background }} onClick={onClick}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
      </CardContent>
    </StyledTile>
  );
};
const DEFAULT_ROLE = "user";
const HomePage = () => {
  return (
    <>
      <Helmet>
        <title> Inicio </title>
      </Helmet>
      <StyledGrid>
        {TileMap.filter((tile) => tile.role === DEFAULT_ROLE).map((tile, index) => (
          <Tile key={index} title={tile.title} link={tile.link} background={tile.background} />
        ))}
      </StyledGrid>
    </>
  );
};

export default HomePage;
