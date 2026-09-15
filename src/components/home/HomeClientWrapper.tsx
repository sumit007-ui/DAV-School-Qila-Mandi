"use client";

import { useAppModals } from "@/components/layout/ClientAppWrapper";
import { HeroSection } from "@/components/sections/HeroSection";
import { EditorialStatement } from "@/components/sections/EditorialStatement";
import { StatsSection } from "@/components/sections/StatsSection";
import { PrincipalMessageSection } from "@/components/sections/PrincipalMessageSection";
import { LearningJourneySection } from "@/components/sections/LearningJourneySection";
import { WhyDavSection } from "@/components/sections/WhyDavSection";
import { NewsAndEventsSection } from "@/components/sections/NewsAndEventsSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";

interface HomeClientWrapperProps {
  principalMessage: any;
  academicStages: any[];
  facilities: any[];
  achievements: any[];
  news: any[];
  events: any[];
  gallery: any[];
  testimonials?: any[];
}

export function HomeClientWrapper({
  principalMessage,
  academicStages,
  news,
  events,
}: HomeClientWrapperProps) {
  const { openAdmissionModal } = useAppModals();

  return (
    <div className="w-full bg-[#F7F1DE]">
      {/* 01. Cinematic Hero */}
      <HeroSection
        onOpenAdmissionModal={() => openAdmissionModal("Nursery")}
      />

      {/* 02. School Introduction & Ethos */}
      <EditorialStatement />

      {/* 03. Verified Statistics */}
      <StatsSection />

      {/* 04. Principal's Perspective */}
      <PrincipalMessageSection principal={principalMessage} />

      {/* 05. Learning Journey - Nursery to Class 10 Progression */}
      <LearningJourneySection stages={academicStages} />

      {/* 06. WHY DAV - Key Distinctions */}
      <WhyDavSection />

      {/* 07. News & Events Calendar */}
      <NewsAndEventsSection news={news} events={events} />

      {/* 08. Admissions Call to Action */}
      <FinalCtaSection
        onOpenAdmissionModal={() => openAdmissionModal("Nursery")}
      />
    </div>
  );
}
