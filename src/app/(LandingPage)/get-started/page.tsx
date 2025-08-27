import { Footer } from "@/features/LandingPage/conponents";

export default function GetStartedPage() {
  return (
    <div className="">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold font-display text-[#2F2B36] mb-8">
          Get Started
        </h1>
        <p className="text-lg font-text text-gray-600">
          Ready to begin your journey? Sign up and start exploring opportunities on Strativa.
        </p>
      </div>
      <Footer />
    </div>
  );
}
