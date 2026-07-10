import { NextResponse } from "next/server";
import { getMissingAuthEnv } from "@/lib/auth";
import { isMongoEnabled } from "@/lib/db/mongodb";

function envLength(name: "ADMIN_PASSWORD" | "ADMIN_SESSION_SECRET"): number {
  const raw = process.env[name]?.trim().replace(/^["']|["']$/g, "");
  return raw?.length ?? 0;
}

/** Diagnostic public : indique si les variables sont présentes (sans révéler les valeurs). */
export async function GET() {
  const missing = getMissingAuthEnv();

  return NextResponse.json({
    configured: missing.length === 0,
    missing,
    passwordLength: envLength("ADMIN_PASSWORD"),
    sessionSecretLength: envLength("ADMIN_SESSION_SECRET"),
    mongodb: isMongoEnabled(),
  });
}
