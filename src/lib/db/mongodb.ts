import { MongoClient, type Db } from "mongodb";

const dbName = process.env.MONGODB_DB_NAME ?? "bamboucamer";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function normalizeMongoUri(raw: string | undefined): string | undefined {
  if (!raw) return undefined;

  const uri = raw.trim().replace(/^["']|["']$/g, "");
  if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    return undefined;
  }

  return uri;
}

const uri = normalizeMongoUri(process.env.MONGODB_URI);

function createClient(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("MONGODB_URI manquant ou invalide");
  }
  const client = new MongoClient(uri, {
    maxPoolSize: 10,
  });
  return client.connect();
}

export function isMongoEnabled(): boolean {
  return Boolean(uri);
}

export function getMongoClient(): Promise<MongoClient> {
  if (!isMongoEnabled()) {
    throw new Error("MONGODB_URI manquant ou invalide");
  }

  if (!global._mongoClientPromise) {
    global._mongoClientPromise = createClient();
  }
  return global._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getMongoClient();
  return client.db(dbName);
}

export const CONTENT_COLLECTION = "content";
