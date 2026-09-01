import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import { getGallery } from "@/sanity/lib/fetch";
import { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface GalleryDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: GalleryDetailPageProps): Promise<Metadata> {
  const items = await getGallery();
  const item = items.find((g) => g.id === params.slug || (g as any).slug === params.slug);

  if (!item) {
    return { title: "Photograph Not Found | DAV Public School Qilla Mandi" };
  }

  return {
    title: `${item.title} | DAV Public School Qilla Mandi`,
    description: item.caption || item.title,
  };
}

export default async function GalleryDetailPage({ params }: GalleryDetailPageProps) {
  const items = await getGallery();
  const item = items.find((g) => g.id === params.slug || (g as any).slug === params.slug);

  if (!item) {
    notFound();
  }

  return (
    <article className="w-full bg-cream-50 min-h-screen text-navy-950">
      <section className="relative py-16 lg:py-24 bg-navy-950 text-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-gold-400 hover:text-gold-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Photography Archive</span>
          </Link>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-mono font-bold uppercase tracking-wider">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>{item.category}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-normal leading-tight">
              {item.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg border border-cream-200">
            <Image
              src={item.imageUrl}
              alt={item.alt || item.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 900px"
              priority
            />
          </div>

          {item.caption && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-cream-200 shadow-sm text-sm sm:text-base text-navy-800 leading-relaxed font-light">
              <p>{item.caption}</p>
            </div>
          )}
        </div>
      </section>
    </article>
  );
}
