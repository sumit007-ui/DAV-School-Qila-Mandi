import { getEvents } from "@/sanity/lib/fetch";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, Clock } from "lucide-react";
import { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface EventDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const events = await getEvents();
  const event = events.find((e) => e.slug === params.slug || e.id === params.slug);

  if (!event) {
    return { title: "Event Not Found | DAV Public School Qilla Mandi" };
  }

  return {
    title: `${event.title} | DAV Public School Qilla Mandi`,
    description: event.description,
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const events = await getEvents();
  const event = events.find((e) => e.slug === params.slug || e.id === params.slug);

  if (!event) {
    notFound();
  }

  return (
    <article className="w-full bg-cream-50 min-h-screen text-navy-950">
      <section className="relative py-16 lg:py-24 bg-navy-950 text-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-gold-400 hover:text-gold-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Events & News Calendar</span>
          </Link>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-mono font-bold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>{event.category}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-normal leading-tight">
              {event.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-cream-200 pt-2">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gold-400" />
                {event.startDate}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-400" />
                {event.time}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-400" />
                {event.venue}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="bg-white p-8 sm:p-12 rounded-2xl border border-cream-200 shadow-sm space-y-6">
            <h3 className="font-serif text-2xl font-normal text-navy-950">
              Event Overview
            </h3>
            <p className="text-sm sm:text-base text-navy-800 leading-relaxed font-light">
              {event.description}
            </p>

            {event.highlights && event.highlights.length > 0 && (
              <div className="pt-4 border-t border-cream-200 space-y-3">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-navy-900">
                  Event Highlights & Schedule:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-navy-700 list-disc list-inside">
                  {event.highlights.map((h: string, idx: number) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </article>
  );
}
