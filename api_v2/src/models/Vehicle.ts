import database from "../config/mongo";

export interface Vehicle {
  name: string;
}

export default database.collection<Vehicle>('vehicles');
