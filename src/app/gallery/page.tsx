import { getGallery } from "@/sanity/lib/fetch";
import { GalleryClientView } from "@/components/gallery/GalleryClientView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function GalleryPage() {
  const items = await getGallery();

  return <GalleryClientView items={items} />;
}
