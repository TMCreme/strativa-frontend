import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investor - Strativa",
  description: "Investor registration and management on Strativa",
};

export default function InvestorLayout({
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
