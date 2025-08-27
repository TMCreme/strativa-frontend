import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company - Strativa",
  description: "Company registration and management on Strativa",
};

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      {children}
    </div>
  );
}
