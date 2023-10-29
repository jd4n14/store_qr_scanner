import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { AppDialog, Search, ShowQR } from '../../shared/components'
import { AddUserForm, UserCard } from "./components";
import { StyledGrid, StyledHeader } from "./styles.tsx";
import { useUsersPage } from "./hooks/useUsersPage.ts";


const UsuariosPage = () => {
  const { allUsersRequest, onSubmit } = useUsersPage();

  if (allUsersRequest.isLoading) {
    return <div>Loading...</div>;
  }
  if (allUsersRequest.isError) {
    return <div>Error...</div>;
  }
  const users = allUsersRequest?.data?.users || [];
  return (
    <div>
      <StyledHeader>
        <h1>Usuarios</h1>
        <AppDialog
          trigger={({ toggle }) => (
            <Button variant="contained" startIcon={<Add />} onClick={() => toggle()}>
              Agregar
            </Button>
          )}
          title="Agregar usuario"
        >
          {({ toggle }) => <AddUserForm onSubmit={(values) => onSubmit(values, toggle)} />}
        </AppDialog>
      </StyledHeader>
      <Search />
      <StyledGrid>
        {users.map((users) => (
          <ShowQR key={users._id} title={users.name} value={users._id}>
            {({ toggle }) => (
              <UserCard onClick={() => toggle()} user={users} />
            )}
          </ShowQR>
        ))}
      </StyledGrid>
    </div>
  );
};

export default UsuariosPage;
