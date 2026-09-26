import { Metadata } from "next";
import { generateSchoolMetadata, generateBreadcrumbJsonLd } from "@/lib/seo/metadata";
import { getGallery } from "@/sanity/lib/fetch";
import { GalleryClientView } from "@/components/gallery/GalleryClientView";

export const metadata: Metadata = generateSchoolMetadata({
  title: "Campus & Event Photo Gallery | Life at DAV",
  description:
    "Explore photo highlights from annual functions, sports events, science exhibitions, celebrations, and classroom life at Dr. MRS Bhalla DAV School, Batala.",
  path: "/gallery",
  keywords: [
    "DAV School Batala Photos",
    "DAV Batala Events Gallery",
    "School Activities Batala",
  ],
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function GalleryPage() {
  const items = await getGallery();
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Gallery", path: "/gallery" }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <GalleryClientView items={items} />
    </>
  );
}
