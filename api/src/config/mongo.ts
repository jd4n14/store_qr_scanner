import { MongoClient } from "mongodb";
import 'dotenv/config';
// @ts-ignore
const client = new MongoClient(process.env.MONGO_URL);
const database = client.db('px');
export default database;
