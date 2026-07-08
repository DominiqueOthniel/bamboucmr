import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";
import { getSiteSettings } from "@/lib/content/reader";
import { writeSiteSettings } from "@/lib/content/writer";
import type { SiteSettings } from "@/lib/content/types";

async function requireAuth() {
  const jar = await cookies();
  return await verifySessionToken(jar.get(SESSION_COOKIE)?.value);
}

export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = (await request.json()) as SiteSettings;
  await writeSiteSettings(body);
  return NextResponse.json(body);
}
