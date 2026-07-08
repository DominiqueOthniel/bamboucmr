import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";
import { COLLECTION_NAMES } from "@/lib/content/collections";
import { getCollection } from "@/lib/content/reader";
import { writeCollection } from "@/lib/content/writer";
import type { CollectionName } from "@/lib/content/types";

async function requireAuth() {
  const jar = await cookies();
  return await verifySessionToken(jar.get(SESSION_COOKIE)?.value);
}

function parseCollection(name: string): CollectionName | null {
  return (COLLECTION_NAMES as readonly string[]).includes(name)
    ? (name as CollectionName)
    : null;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ collection: string; id: string }> }
) {
  const { collection, id } = await params;
  const col = parseCollection(collection);
  if (!col) {
    return NextResponse.json({ error: "Collection introuvable" }, { status: 404 });
  }

  const items = await getCollection(col);
  const item = items.find((i) => i.id === id);
  if (!item) {
    return NextResponse.json({ error: "Élément introuvable" }, { status: 404 });
  }
  return NextResponse.json(item);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ collection: string; id: string }> }
) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { collection, id } = await params;
  const col = parseCollection(collection);
  if (!col) {
    return NextResponse.json({ error: "Collection introuvable" }, { status: 404 });
  }

  const body = (await request.json()) as Record<string, unknown>;
  const items = await getCollection(col);
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Élément introuvable" }, { status: 404 });
  }

  const updated = { ...items[index], ...body, id };
  items[index] = updated as (typeof items)[number];
  await writeCollection(col, items);
  return NextResponse.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ collection: string; id: string }> }
) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { collection, id } = await params;
  const col = parseCollection(collection);
  if (!col) {
    return NextResponse.json({ error: "Collection introuvable" }, { status: 404 });
  }

  const items = await getCollection(col);
  const filtered = items.filter((i) => i.id !== id);
  if (filtered.length === items.length) {
    return NextResponse.json({ error: "Élément introuvable" }, { status: 404 });
  }

  await writeCollection(col, filtered);
  return NextResponse.json({ ok: true });
}
