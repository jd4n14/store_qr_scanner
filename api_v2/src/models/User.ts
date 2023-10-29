import database from "../config/mongo";

export interface Role {
  name: 'user' | 'admin';
}


export interface User {
  name: string;
  role: Role
}

export default database.collection<User>('users');
