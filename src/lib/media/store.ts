import "server-only";

import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { Binary } from "mongodb";
import { getDb, isMongoEnabled, markMongoUnavailable } from "@/lib/db/mongodb";

export const MEDIA_COLLECTION = "media";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

type MediaDoc = {
  _id: string;
  filename: string;
  contentType: string;
  data: Binary;
  createdAt: Date;
};

function extensionFor(contentType: string, filename: string): string {
  const fromName = path.extname(filename).toLowerCase();
  if (fromName && fromName.length <= 5) return fromName;
  switch (contentType) {
    case "image/jpeg":
      return ".jpg";
    case "image/png":
      return ".png";
    case "image/webp":
      return ".webp";
    case "image/gif":
      return ".gif";
    default:
      return ".bin";
  }
}

export function assertValidImageFile(file: File): string | null {
  if (!ALLOWED_TYPES.has(file.type)) {
    return "Format non supporté. Utilisez JPG, PNG, WebP ou GIF.";
  }
  if (file.size > MAX_BYTES) {
    return "Fichier trop volumineux (max. 5 Mo).";
  }
  return null;
}

async function saveToDisk(
  filename: string,
  buffer: Buffer
): Promise<{ url: string }> {
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });
  await writeFile(path.join(uploadsDir, filename), buffer);
  return { url: `/uploads/${filename}` };
}

export async function saveUploadedImage(file: File): Promise<{ url: string }> {
  const validationError = assertValidImageFile(file);
  if (validationError) {
    throw new Error(validationError);
  }

  const id = randomUUID();
  const ext = extensionFor(file.type, file.name);
  const filename = `${id}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  if (isMongoEnabled()) {
    try {
      const db = await getDb();
      const doc: MediaDoc = {
        _id: id,
        filename: file.name || filename,
        contentType: file.type,
        data: new Binary(buffer),
        createdAt: new Date(),
      };
      await db.collection<MediaDoc>(MEDIA_COLLECTION).insertOne(doc);
      return { url: `/api/media/${id}` };
    } catch (err) {
      markMongoUnavailable();
      console.warn(
        "[media] MongoDB indisponible, upload local",
        err instanceof Error ? err.message : err
      );
      return saveToDisk(filename, buffer);
    }
  }

  return saveToDisk(filename, buffer);
}

export async function getMediaById(
  id: string
): Promise<{ contentType: string; data: Buffer } | null> {
  if (!isMongoEnabled()) return null;

  try {
    const db = await getDb();
    const doc = await db.collection<MediaDoc>(MEDIA_COLLECTION).findOne({ _id: id });
    if (!doc) return null;

    return {
      contentType: doc.contentType,
      data: Buffer.from(doc.data.buffer),
    };
  } catch (err) {
    markMongoUnavailable();
    console.warn(
      "[media] MongoDB indisponible",
      err instanceof Error ? err.message : err
    );
    return null;
  }
}
