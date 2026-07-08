import { notFound } from "next/navigation";
import { CollectionForm } from "@/components/admin/CollectionForm";
import { getCollectionMeta } from "@/lib/content/collections";
import { getCollectionItem } from "@/lib/content/reader";
import type { CollectionName } from "@/lib/content/types";

type Props = { params: Promise<{ collection: string; id: string }> };

export default async function AdminEditItemPage({ params }: Props) {
  const { collection, id } = await params;
  const meta = getCollectionMeta(collection);
  if (!meta || meta.name === "site-settings") notFound();

  const item = await getCollectionItem(meta.name as CollectionName, id);
  if (!item) notFound();

  return (
    <CollectionForm
      meta={meta}
      initialData={item as unknown as Record<string, unknown>}
    />
  );
}
