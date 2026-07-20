import fs from "fs";
import path from "path";
import { MongoClient } from "mongodb";

function loadEnvFile(filename) {
  const filePath = path.join(process.cwd(), filename);
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME ?? "bamboucamer";
const contentDir = path.join(process.cwd(), "content");
const collectionName = "content";

const collectionFiles = [
  "news",
  "news-categories",
  "stats",
  "impact-bars",
  "partners",
  "about-questions",
  "nav-links",
  "pillars",
  "solutions",
  "rse-items",
  "faq",
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
