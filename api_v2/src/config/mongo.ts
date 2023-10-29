import { MongoClient } from "mongodb";

// @ts-ignore
const client = new MongoClient(process.env.MONGO_URL);
const database = client.db('px');
export default database;
