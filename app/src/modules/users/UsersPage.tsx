import { Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { AppDialog, Search } from '../../shared/components'
import { AddUserForm } from "./components";
import { StyledHeader } from "./styles.tsx";
import { useUsersPage } from "./hooks/useUsersPage.ts";
import { UserList } from "./components/UserList.tsx";


const UsuariosPage = () => {
  const { isLoadaing, onSubmit, userList, setSearch } = useUsersPage();

  if (isLoadaing) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <StyledHeader>
        <Typography variant="h3">Usuarios</Typography>
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
      <Search onSearch={setSearch} />
      <UserList users={userList} />
    </div>
  );
};

export default UsuariosPage;
