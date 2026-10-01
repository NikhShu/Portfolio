import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getPersonalInfo, navLinks } from "@/lib/content";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personalInfo = await getPersonalInfo();

  return (
    <>
      <Suspense fallback={null}>
        <Navbar
          links={navLinks.map(({ label, href }) => ({ label, href }))}
          resumePath={personalInfo.resumePath}
        />
      </Suspense>
      <main className="flex-1">{children}</main>
      <Footer
        contact={{
          email: personalInfo.email,
          linkedin: personalInfo.linkedin,
          github: personalInfo.github,
        }}
      />
    </>
  );
}
