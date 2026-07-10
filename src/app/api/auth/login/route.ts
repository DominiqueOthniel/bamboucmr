import { NextResponse } from "next/server";
import {
  createSessionToken,
  getMissingAuthEnv,
  sessionCookieOptions,
  SESSION_COOKIE,
  verifyPassword,
} from "@/lib/auth";

export async function POST(request: Request) {
  const missing = getMissingAuthEnv();
  if (missing.length > 0) {
    return NextResponse.json(
      {
        error: `Configuration serveur incomplète. Ajoutez sur Netlify : ${missing.join(", ")}`,
      },
      { status: 500 }
    );
  }

  try {
    const body = (await request.json()) as { password?: string };
    if (!body.password || !verifyPassword(body.password)) {
      return NextResponse.json(
        { error: "Mot de passe incorrect" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(
      SESSION_COOKIE,
      await createSessionToken(),
      sessionCookieOptions
    );
    return response;
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur lors de la connexion" },
      { status: 500 }
    );
  }
}
