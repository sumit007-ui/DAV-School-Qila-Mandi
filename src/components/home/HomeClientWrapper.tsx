"use client";

import { useAppModals } from "@/components/layout/ClientAppWrapper";
import { HeroSection } from "@/components/sections/HeroSection";
import { EditorialStatement } from "@/components/sections/EditorialStatement";
import { StatsSection } from "@/components/sections/StatsSection";
import { PrincipalMessageSection } from "@/components/sections/PrincipalMessageSection";
import { LearningJourneySection } from "@/components/sections/LearningJourneySection";
import { WhyDavSection } from "@/components/sections/WhyDavSection";
import { ImmersiveCampusSection } from "@/components/sections/ImmersiveCampusSection";
import { StudentLifeSection } from "@/components/sections/StudentLifeSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { AdmissionsConversionSection } from "@/components/sections/AdmissionsConversionSection";
import { NewsAndEventsSection } from "@/components/sections/NewsAndEventsSection";
import { EditorialGallerySection } from "@/components/sections/EditorialGallerySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";

interface HomeClientWrapperProps {
  principalMessage: any;
  academicStages: any[];
  facilities: any[];
  achievements: any[];
  news: any[];
  events: any[];
  gallery: any[];
  testimonials: any[];
}

export function HomeClientWrapper({
  principalMessage,
  academicStages,
  facilities,
  achievements,
  news,
  events,
  gallery,
  testimonials,
}: HomeClientWrapperProps) {
  const { openAdmissionModal, openProspectusModal } = useAppModals();

  return (
    <div className="w-full">
      {/* 01. Cinematic Hero */}
      <HeroSection
        onOpenAdmissionModal={() => openAdmissionModal("Nursery")}
        onOpenProspectusModal={openProspectusModal}
      />

      {/* 02. School Introduction - MORE THAN A CLASSROOM */}
      <EditorialStatement />

      {/* 03. Verified Statistics */}
      <StatsSection />

      {/* 04. Principal's Perspective */}
      <PrincipalMessageSection principal={principalMessage} />

      {/* 05. Learning Journey - Nursery to Class 10 Progression */}
      <LearningJourneySection stages={academicStages} />

      {/* 06. WHY DAV - Editorial Feature List */}
      <WhyDavSection />

      {/* 07. Campus & Facilities */}
      <ImmersiveCampusSection facilities={facilities} />

      {/* 08. Student Life & Culture */}
      <StudentLifeSection />

      {/* 09. Achievements Showcase */}
      <AchievementsSection achievements={achievements} />

      {/* 10. Admissions Conversion Section */}
      <AdmissionsConversionSection
        onOpenAdmissionModal={() => openAdmissionModal("Nursery")}
        onOpenProspectusModal={openProspectusModal}
      />

      {/* 11. News & Events Calendar */}
      <NewsAndEventsSection news={news} events={events} />

      {/* 12. Editorial Gallery with Lightbox */}
      <EditorialGallerySection gallery={gallery} />

      {/* 13. Testimonials */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 14. Large Editorial Final CTA */}
      <FinalCtaSection
        onOpenAdmissionModal={() => openAdmissionModal("Nursery")}
        onOpenProspectusModal={openProspectusModal}
      />
    </div>
  );
}
