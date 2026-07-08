import { CollectionForm } from "@/components/admin/CollectionForm";
import { SITE_SETTINGS_META } from "@/lib/content/collections";
import { getSiteSettings } from "@/lib/content/reader";

export default async function AdminSiteSettingsPage() {
  const settings = await getSiteSettings();
  return (
    <CollectionForm
      meta={SITE_SETTINGS_META}
      initialData={settings as unknown as Record<string, unknown>}
    />
  );
}
