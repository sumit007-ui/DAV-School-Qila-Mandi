import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Trophy, Award, Calendar } from "lucide-react";
import { getAchievements } from "@/sanity/lib/fetch";
import { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface AchievementDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: AchievementDetailPageProps): Promise<Metadata> {
  const list = await getAchievements();
  const item = list.find((a) => (a as any).slug === params.slug || a.id === params.slug);

  if (!item) {
    return { title: "Achievement Not Found | DAV Public School Qilla Mandi" };
  }

  return {
    title: `${item.title} | DAV Public School Qilla Mandi`,
    description: item.description,
  };
}

export default async function AchievementDetailPage({ params }: AchievementDetailPageProps) {
  const list = await getAchievements();
  const item = list.find((a) => (a as any).slug === params.slug || a.id === params.slug);

  if (!item) {
    notFound();
  }

  return (
    <article className="w-full bg-cream-50 min-h-screen text-navy-950">
      <section className="relative py-16 lg:py-24 bg-navy-950 text-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Link
            href="/achievements"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-gold-400 hover:text-gold-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Hall of Distinction</span>
          </Link>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-mono font-bold uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5" />
              <span>{item.category} • Session {item.year}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-normal leading-tight">
              {item.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-cream-200 pt-2">
              <span>Recipient / Squad: <strong>{item.studentOrTeam}</strong></span>
              {item.classOrGrade && <span>• Grade: {item.classOrGrade}</span>}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {item.image && (
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-md border border-cream-200">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 900px"
              />
            </div>
          )}

          <div className="bg-white p-8 sm:p-12 rounded-2xl border border-cream-200 shadow-sm space-y-6">
            <h3 className="font-serif text-2xl font-normal text-navy-950">
              Official Citation & Achievement Report
            </h3>
            <p className="text-sm sm:text-base text-navy-800 leading-relaxed font-light">
              {item.description}
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
