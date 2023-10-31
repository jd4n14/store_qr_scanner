import database from "../config/mongo";


export interface Store {
  name: string;
}

export default database.collection<Store>('stores');
