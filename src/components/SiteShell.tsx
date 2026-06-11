import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { I18nProvider } from "@/lib/i18n";
import { Toaster } from "@/components/ui/sonner";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster theme="dark" position="bottom-right" />
      </div>
    </I18nProvider>
  );
}
