import { ShowQR } from "../../../shared/components";
import { StyledGrid } from "../styles";
import { User } from "../types";
import { UserCard } from "./UserCard";

interface UserListProps {
  users: User[];
}
export const UserList = ({ users }: UserListProps) => {
  
  if (users.length === 0) {
    return <div>No hay usuarios</div>;
  }

  return (
    <StyledGrid>
      {users.map((users) => (
        <ShowQR key={users._id} title={users.name} value={users._id}>
          {({ toggle }) => <UserCard onClick={() => toggle()} user={users} />}
        </ShowQR>
      ))}
    </StyledGrid>
  );
};
