import { notFound } from "next/navigation";
import { CollectionForm } from "@/components/admin/CollectionForm";
import { getCollectionMeta } from "@/lib/content/collections";

type Props = { params: Promise<{ collection: string }> };

export default async function AdminNewItemPage({ params }: Props) {
  const { collection } = await params;
  const meta = getCollectionMeta(collection);
  if (!meta || meta.name === "site-settings") notFound();

  const defaults: Record<string, unknown> = { published: true, order: 0 };

  return <CollectionForm meta={meta} initialData={defaults} isNew />;
}
