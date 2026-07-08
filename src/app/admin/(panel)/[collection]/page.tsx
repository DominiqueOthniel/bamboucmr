import { notFound } from "next/navigation";
import { CollectionTable } from "@/components/admin/CollectionTable";
import { getCollectionMeta } from "@/lib/content/collections";
import { getCollection } from "@/lib/content/reader";
import type { CollectionName } from "@/lib/content/types";

type Props = { params: Promise<{ collection: string }> };

export default async function AdminCollectionPage({ params }: Props) {
  const { collection } = await params;
  const meta = getCollectionMeta(collection);
  if (!meta || meta.name === "site-settings") notFound();

  const items = await getCollection(meta.name as CollectionName);

  return (
    <CollectionTable
      meta={meta}
      items={items as unknown as Record<string, unknown>[]}
    />
  );
}
