import { Footer } from "@/features/LandingPage/conponents";

export default function AboutPage() {
  return (
    <div className="">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold font-display text-[#2F2B36] mb-8">
          About
        </h1>
        <p className="text-lg font-text text-gray-600">
          Learn more about Strativa and our mission to connect investors with opportunities.
        </p>
      </div>
      <Footer />
    </div>
  );
}
