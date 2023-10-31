import database from "../config/mongo";
import {User} from "./User";
import {Store} from "./Store";
import {Vehicle} from "./Vehicle";


export interface Record {
  user: User;
  store: Store;
  vehicle: Vehicle;
  type: 'in' | 'out';
  date?: Date;
}

export default database.collection<Record>('records');
