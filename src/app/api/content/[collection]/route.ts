import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";
import { COLLECTION_NAMES, getCollectionMeta } from "@/lib/content/collections";
import { getCollection } from "@/lib/content/reader";
import { newId, writeCollection } from "@/lib/content/writer";
import type { CollectionName } from "@/lib/content/types";

async function requireAuth() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(token))) {
    return false;
  }
  return true;
}

function parseCollection(name: string): CollectionName | null {
  return (COLLECTION_NAMES as readonly string[]).includes(name)
    ? (name as CollectionName)
    : null;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params;
  const meta = getCollectionMeta(collection);
  if (!meta || collection === "site-settings") {
    return NextResponse.json({ error: "Collection introuvable" }, { status: 404 });
  }

  const items = await getCollection(collection as CollectionName);
  return NextResponse.json(items);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { collection } = await params;
  const col = parseCollection(collection);
  if (!col) {
    return NextResponse.json({ error: "Collection introuvable" }, { status: 404 });
  }

  const body = (await request.json()) as Record<string, unknown>;
  const items = await getCollection(col);
  const prefix = col.split("-")[0] ?? col;
  const item = { ...body, id: newId(prefix) };
  items.push(item as (typeof items)[number]);
  await writeCollection(col, items);
  return NextResponse.json(item, { status: 201 });
}
