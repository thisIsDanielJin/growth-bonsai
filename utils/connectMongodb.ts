import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;

const options = {};

let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment");
}

clientPromise = new MongoClient(uri, options).connect();

export default clientPromise;
