"use client";

import { useState, createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { MobileFloatingBar } from "@/components/navigation/MobileFloatingBar";
import { SearchModal } from "@/components/ui/SearchModal";
import { AdmissionModal } from "@/components/forms/AdmissionModal";
import { ScrollProgress } from "@/components/motion";

interface ModalContextType {
  openAdmissionModal: (defaultGrade?: string) => void;
  openSearchModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  openAdmissionModal: () => {},
  openSearchModal: () => {},
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
  const [admissionDefaultGrade, setAdmissionDefaultGrade] = useState("Nursery");

  const openAdmissionModal = (grade: string = "Nursery") => {
    setAdmissionDefaultGrade(grade);
    setIsAdmissionOpen(true);
  };

  const openSearchModal = () => setIsSearchOpen(true);

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-[#4E220F]">
        {children}
      </div>
    );
  }

  return (
    <ModalContext.Provider
      value={{
        openAdmissionModal,
        openSearchModal,
      }}
    >
      <div className="flex flex-col min-h-screen">
        <ScrollProgress />

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
      </div>
    </ModalContext.Provider>
  );
}
