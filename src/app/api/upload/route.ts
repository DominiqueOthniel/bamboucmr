import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { assertValidImageFile, saveUploadedImage } from "@/lib/media/store";

async function requireAuth() {
  const jar = await cookies();
  return verifySessionToken(jar.get(SESSION_COOKIE)?.value);
}

export async function POST(request: Request) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json(
        { error: "Aucun fichier fourni" },
        { status: 400 }
      );
    }

    const validationError = assertValidImageFile(file);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const { url } = await saveUploadedImage(file);
    return NextResponse.json({ url });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Échec de l'upload";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
