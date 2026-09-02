"use client";

import { useState, createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { MobileFloatingBar } from "@/components/navigation/MobileFloatingBar";
import { SearchModal } from "@/components/ui/SearchModal";
import { AdmissionModal } from "@/components/forms/AdmissionModal";
import { ProspectusDownloadModal } from "@/components/forms/ProspectusDownloadModal";
import { ScrollProgress, CustomCursor } from "@/components/motion";

interface ModalContextType {
  openAdmissionModal: (defaultGrade?: string) => void;
  openSearchModal: () => void;
  openProspectusModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  openAdmissionModal: () => {},
  openSearchModal: () => {},
  openProspectusModal: () => {},
});

export const useAppModals = () => useContext(ModalContext);

export function ClientAppWrapper({ 
  children,
  siteSettings,
}: { 
  children: React.ReactNode;
  siteSettings?: any;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [isProspectusOpen, setIsProspectusOpen] = useState(false);
  const [admissionDefaultGrade, setAdmissionDefaultGrade] = useState("Nursery");

  const openAdmissionModal = (grade: string = "Nursery") => {
    setAdmissionDefaultGrade(grade);
    setIsAdmissionOpen(true);
  };

  const openSearchModal = () => setIsSearchOpen(true);
  const openProspectusModal = () => setIsProspectusOpen(true);

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-[#060F1E]">
        {children}
      </div>
    );
  }

  return (
    <ModalContext.Provider
      value={{
        openAdmissionModal,
        openSearchModal,
        openProspectusModal,
      }}
    >
      <div className="flex flex-col min-h-screen">
        <ScrollProgress />
        <CustomCursor />

        <Navbar
          siteSettings={siteSettings}
          onOpenSearch={openSearchModal}
          onOpenAdmissionModal={() => openAdmissionModal("Nursery")}
        />

        <main className="flex-1 pb-16 sm:pb-0">
          {children}
        </main>

        <Footer
          siteSettings={siteSettings}
          onOpenAdmissionModal={() => openAdmissionModal("Nursery")}
        />

        <MobileFloatingBar
          onOpenAdmissionModal={() => openAdmissionModal("Nursery")}
        />

        {/* Global Modals */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />

        <AdmissionModal
          isOpen={isAdmissionOpen}
          onClose={() => setIsAdmissionOpen(false)}
          defaultGrade={admissionDefaultGrade}
        />

        <ProspectusDownloadModal
          isOpen={isProspectusOpen}
          onClose={() => setIsProspectusOpen(false)}
        />
      </div>
    </ModalContext.Provider>
  );
}
