import { NextResponse } from "next/server";
import { getMediaById } from "@/lib/media/store";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    return NextResponse.json({ error: "Identifiant invalide" }, { status: 400 });
  }

  const media = await getMediaById(id);
  if (!media) {
    return NextResponse.json({ error: "Média introuvable" }, { status: 404 });
  }

  return new NextResponse(new Uint8Array(media.data), {
    status: 200,
    headers: {
      "Content-Type": media.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
