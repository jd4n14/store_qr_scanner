import {Helmet} from "react-helmet-async";
import {Card, CardContent, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {useAuth} from "../../hooks/useAuth.ts";
import {ReactNode} from "react";
import {QRReader} from "../../shared/components/qr";
import {useMutation} from "@tanstack/react-query";
import {createRecordApi} from "./api.ts";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import React from "react";

const StyledGrid = styled("div")(({theme}) => ({
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

const StyledTile = styled(Card)(({theme}) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),
  cursor: "pointer",
}));

type Role = "admin" | "user";

type TileMapType = {
  onClick?: () => void;
  role: Role;
  component: () => ReactNode;
};


const Tile = ({ title, onClick, background = backgrounds.dashboard }: {
  title: string;
  onClick: () => void;
  background?: string;
}) => {
  const onClickTile = () => {
    onClick();
  };
  return (
    <StyledTile sx={{background}} onClick={onClickTile}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
      </CardContent>
    </StyledTile>
  );
};


const TileMap: TileMapType[] = [
  {
    role: "admin",
    component: function () {
      const navigate = useNavigate();
      return <Tile
        title="Dashboard"
        onClick={() => navigate('/home')}
        background={backgrounds.dashboard}
      />
    }
  },
  {
    role: "admin",
    component: function () {
      const navigate = useNavigate();
      return <Tile
        title="Usuarios"
        onClick={() => navigate('/users')}
        background={backgrounds.users}
      />
    }
  },
  {
    role: "admin",
    component: function () {
      const navigate = useNavigate();
      return <Tile
        title="Tiendas"
        onClick={() => navigate('/stores')}
        background={backgrounds.stores}
      />
    }
  },
  {
    role: "admin",
    component: function () {
      const navigate = useNavigate();
      return <Tile
        title="Reportes"
        onClick={() => navigate('/reports')}
        background={backgrounds.reports}
      />
    }
  },
  {
    role: "user",
    component: function () {
      const { vehicleId } = useAuth();
      const createRecordRequest = useMutation({
        mutationFn: (values) => createRecordApi(values as any),
        onSuccess: () => {
          toast.success("Registro creado", {icon: '🚀'});
        },
        onError: (error) => {
          toast.error(error.message, {icon: '🚨'});
        }
      })
      const onSubmitRecord = (storeId: string) => {
        createRecordRequest.mutate({
          vehicleId: vehicleId!,
          storeId
        } as any)
      }
      return <QRReader onScan={(value) => onSubmitRecord(value)}>
        {(status, toggle) => (
          <Tile
            title="Escanear tienda"
            onClick={toggle}
            background={backgrounds.scan}
          />
        )}
      </QRReader>
    }
  },
  {
    role: "user",
    component: function () {
      const { vehicleId, setVehicleId } = useAuth();
      if (vehicleId) return null;
      return <QRReader onScan={(value) => setVehicleId(value)}>
        {(status, toggle) => (
          <Tile
            title="Escanear vehiculo"
            onClick={toggle}
            background={backgrounds.reports}
          />
        )}
      </QRReader>
    }
  },
];

const HomePage = () => {
  const {user} = useAuth();
  return (
    <>
      <Helmet>
        <title> Inicio </title>
      </Helmet>
      <StyledGrid>
        {TileMap.filter((tile) => tile.role === user.role.name).map((tile, index) => (
          <React.Fragment key={index}>
            {tile.component!()}
          </React.Fragment>
        ))}
      </StyledGrid>
    </>
  );
};

export default HomePage;
