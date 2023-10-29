import React from "react";
import { Button, Card, Icon, styled } from "@mui/material";
import { ShowQR } from "../../shared/components/qr";
import { AppDialog } from "../../shared/components/dialog";
import { Add } from "@mui/icons-material";
import { AddStoreForm } from "./component/AddStoreForm.tsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createNewStore, getAllStores } from "./api.ts";

interface Store {
  id: number | string;
  name: string;
  [key: string]: string | number;
}

const StyledGrid = styled("div")(({ theme }) => ({
  gap: theme.spacing(2),
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "repeat(1, 1fr)",
  },
}));

const TileTienda = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  textAlign: "center",
  color: theme.palette.text.secondary,
  cursor: "pointer",
}));

const TiendasPage: React.FC = () => {
  const queryClient = useQueryClient();
  const allStoresRequest = useQuery({
    queryKey: ["stores"],
    queryFn: getAllStores,
  });
  const createStoreRequest = useMutation({
    mutationFn: (values) => createNewStore(values),
    mutationKey: ["createStore"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
    },
  });
  if (allStoresRequest.isLoading) return <div>Loading...</div>;
  if (allStoresRequest.isError) return <div>Error</div>;
  const onSubmit = (values, toggle: () => void) => {
    toggle();
    createStoreRequest.mutate(values);
  };
  const tiendas = allStoresRequest.data?.stores || [];
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h1>Tiendas</h1>
        <AppDialog
          trigger={(toggleWithFn, toggle) => (
            <Button variant="contained" startIcon={<Add />} onClick={toggle}>
              Agregar
            </Button>
          )}
          title="Agregar tienda"
        >
          {(status, toggle) => <AddStoreForm onSubmit={(values) => onSubmit(values, toggle)} />}
        </AppDialog>
      </div>
      <StyledGrid>
        {tiendas.map((tienda) => (
          <ShowQR key={tienda._id} title={tienda.name} value={tienda._id}>
            {({ toggle }) => (
              <TileTienda
                variant="outlined"
                sx={(theme) => ({
                  padding: theme.spacing(2),
                })}
                onClick={toggle}
              >
                <h2>{tienda.name}</h2>
                <Icon>
                  <img src="/assets/icons/navbar/store_line.svg" alt="icon" />
                </Icon>
              </TileTienda>
            )}
          </ShowQR>
        ))}
      </StyledGrid>
    </div>
  );
};

export default TiendasPage;
