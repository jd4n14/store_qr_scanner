import database from "../config/mongo";


export interface Record {
  userId: string;
  storeId: string;
  vehicleId: string;
  type: 'in' | 'out';
  date?: Date;
}

export default database.collection<Record>('records');
