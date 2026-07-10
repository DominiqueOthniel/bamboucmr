import fs from "fs";
import path from "path";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME ?? "bamboucamer";
const contentDir = path.join(process.cwd(), "content");
const collectionName = "content";

const collectionFiles = [
  "news",
  "stats",
  "impact-bars",
  "partners",
  "about-questions",
  "nav-links",
  "pillars",
  "solutions",
  "rse-items",
];

async function main() {
  if (!uri) {
    console.error("Définissez MONGODB_URI avant de lancer le seed.");
    console.error("Exemple : MONGODB_URI=mongodb+srv://... npm run db:seed");
    process.exit(1);
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  const col = db.collection(collectionName);

  await col.createIndex({ key: 1 }, { unique: true });

  for (const name of collectionFiles) {
    const filePath = path.join(contentDir, `${name}.json`);
    const items = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    await col.replaceOne({ key: name }, { key: name, items }, { upsert: true });
    console.log(`✓ ${name} (${items.length} éléments)`);
  }

  const settingsPath = path.join(contentDir, "site-settings.json");
  const settings = JSON.parse(fs.readFileSync(settingsPath, "utf-8"));
  await col.replaceOne(
    { key: "site-settings" },
    { key: "site-settings", ...settings },
    { upsert: true }
  );
  console.log("✓ site-settings");

  await client.close();
  console.log(`\nSeed terminé dans ${dbName}.${collectionName}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
