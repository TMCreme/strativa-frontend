import { Navbar, Footer } from "@/features/LandingPage/conponents";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main>
      <Navbar />

      {/* Hero Section - Mobile First */}
      <section className="px-4 py-8 md:flex md:flex-col md:items-center md:justify-center md:container md:mx-auto md:py-6 md:mt-10">
        {/* Mobile Hero */}
        <div className="md:hidden">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-display text-[#2F2B36] mb-4 leading-tight">
              Invest or raise capital for private companies
            </h1>
            <p className="text-sm leading-6 font-text text-[#2F2B36] text-center max-w-sm mx-auto">
              This is a space to welcome visitors to the site. Grab their
              attention with copy that clearly states what the site is about,
              and add an engaging image or video.
            </p>
          </div>

          {/* Mobile CTA Buttons */}
          <div className="flex flex-col gap-3 mb-8">
            <Link
              href="/investor/register"
              className="w-full bg-[#0A1F44] text-white px-6 py-4 rounded-xl text-center font-medium hover:bg-[#081a3a] transition-all duration-200"
            >
              Register as an investor
            </Link>
            <Link
              href="/company/register"
              className="w-full border-2 border-[#2F2B36] px-6 py-4 rounded-xl text-[#2F2B36] text-center font-medium hover:bg-[#2F2B36] hover:text-white transition-all duration-200"
            >
              Register as a company
            </Link>
          </div>

          {/* Mobile Hero Image */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 text-center">
            <Image
              src="/images/Frame 3985.svg"
              width={300}
              height={300}
              alt="Hero"
              className="mx-auto mb-4"
            />
            <p className="text-xs text-gray-600">
              Discover investment opportunities
            </p>
          </div>
        </div>

        {/* Desktop Hero */}
        <div className="hidden md:block">
          <h1 className="text-5xl font-bold font-display text-[#2F2B36] mb-8 text-center text-wrap max-w-2xl">
            Invest or raise capital for private companies
          </h1>
          <p className="text-base leading-[22px] font-text text-[#2F2B36] text-center max-w-2xl">
            This is a space to welcome visitors to the site. Grab their
            attention with copy that clearly states what the site is about, and
            add an engaging image or video.
          </p>
          <div className="flex items-center justify-center gap-7 mt-10">
            <Link
              href="/company/register"
              className="border border-[#2F2B36] px-4 py-3 rounded-full text-[#2F2B36] hover:bg-[#0A1F44] hover:text-white hover:border-[#0A1F44] transition-all duration-200 inline-block"
            >
              Register as Issuer
            </Link>
            <Link
              href="/investor/register"
              className="border border-[#2F2B36] px-4 py-3 rounded-full text-[#2F2B36] hover:bg-[#0A1F44] hover:text-white hover:border-[#0A1F44] transition-all duration-200 inline-block"
            >
              Register as an investor
            </Link>
          </div>
        </div>
      </section>

      {/* Vision Section - Mobile First */}
      <section className="px-4 py-12 md:container md:mx-auto md:px-4 md:py-16">
        {/* Mobile Vision */}
        <div className="md:hidden">
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold font-display text-[#2F2B36] mb-4">
              Vision
            </h2>
            <p className="text-sm leading-6 font-text text-[#2F2B36] mb-6">
              This is a space to welcome visitors to the site. Grab their
              attention with copy that clearly states what the site is about,
              and add an engaging image or video.
            </p>
            <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-4">
              <Image
                src="/images/Light - Big Horizontal image 3.svg"
                width={400}
                height={300}
                alt="Vision"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Desktop Vision */}
        <div className="hidden md:flex md:flex-col md:mt-20">
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/images/Frame 3985.svg"
              width={1000}
              height={1000}
              alt="Vision Side"
            />
          </div>
          <div className="md:flex md:items-center md:justify-between md:mx-32 md:mt-20">
            <div>
              <h2 className="text-4xl font-bold font-display text-[#2F2B36] mb-8">
                Vision
              </h2>
              <p className="text-base leading-[22px] font-text text-[#2F2B36] max-w-2xl">
                This is a space to welcome visitors to the site. Grab their
                attention with copy that clearly states what the site is about,
                  and add an engaging image or video.
                </p>
            </div>
            <div>
              <Image
                src="/images/Light - Big Horizontal image 3.svg"
                width={1000}
                height={1000}
                alt="Vision Side"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            </div>
        </div>
      </section>

      {/* About Section - Mobile First */}
      <section className="px-4 py-12 md:px-0">
        {/* Mobile About */}
        <div className="md:hidden">
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold font-display text-[#2F2B36] mb-4">
              About
            </h2>
            <p className="text-sm leading-6 font-text text-[#2F2B36]">
              Strativa is a private markets exchange powered by AI and
              data-driven insights. We connect institutional investors,
              accredited individuals, and promising businesses in a trusted
              digital environment.
            </p>
          </div>

          {/* Mobile Values Grid */}
          <div className="space-y-4">
            {[
              { title: "Trust", icon: "🛡️" },
              { title: "Innovation", icon: "💡" },
              { title: "Access", icon: "🔓" },
              { title: "Integrity", icon: "⚖️" },
              { title: "Impact", icon: "🚀" },
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl">{value.icon}</span>
                  <h3 className="text-lg font-bold font-display text-[#2F2B36]">
                    {value.title}
                  </h3>
                </div>
                <p className="text-sm leading-6 font-text text-[#2F2B36]">
                  Our mission is to create a transparent, efficient, and
                  accessible private markets exchange that connects
                  institutional investors, accredited individuals, and promising
                  businesses in a trusted digital environment.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop About */}
        <div className="hidden md:block">
          <div className="flex flex-col mx-32 mt-20">
            <div>
              <h2 className="text-4xl font-bold font-display text-[#2F2B36] mb-8">
                About
              </h2>
              <p className="text-base leading-[22px] font-text text-[#2F2B36]">
                Strativa is a private markets exchange powered by AI and
                data-driven insights. We connect institutional investors,
                accredited individuals, and promising businesses in a trusted
                digital environment. By integrating compliance, secure
                communications, and intelligent matchmaking, we make private
                investing transparent, efficient, and accessible. Our vision
                extends beyond Ghana to redefine how capital flows across Africa
                and the rest of the world, creating opportunities for wealth
                creation and economic growth.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-7 mx-32 mt-20">
            <div>
              <h2 className="text-4xl font-bold font-display text-[#2F2B36] mb-8">
                Trust
              </h2>
              <p className="text-base leading-[22px] font-text text-[#2F2B36]">
                Our mission is to create a transparent, efficient, and
                accessible private markets exchange that connects institutional
                investors, accredited individuals, and promising businesses in a
                trusted digital environment.
              </p>
            </div>
            <div>
              <h2 className="text-4xl font-bold font-display text-[#2F2B36] mb-8">
                Innovation
              </h2>
              <p className="text-base leading-[22px] font-text text-[#2F2B36]">
                Our mission is to create a transparent, efficient, and
                accessible private markets exchange that connects institutional
                investors, accredited individuals, and promising businesses in a
                trusted digital environment.
              </p>
            </div>
            <div>
              <h2 className="text-4xl font-bold font-display text-[#2F2B36] mb-8">
                Access
              </h2>
              <p className="text-base leading-[22px] font-text text-[#2F2B36]">
                Our mission is to create a transparent, efficient, and
                accessible private markets exchange that connects institutional
                investors, accredited individuals, and promising businesses in a
                trusted digital environment.
              </p>
            </div>
            <div>
              <h2 className="text-4xl font-bold font-display text-[#2F2B36] mb-8">
                Integrity
              </h2>
              <p className="text-base leading-[22px] font-text text-[#2F2B36]">
                Our mission is to create a transparent, efficient, and
                accessible private markets exchange that connects institutional
                investors, accredited individuals, and promising businesses in a
                trusted digital environment.
              </p>
            </div>
            <div className="mt-10">
              <h2 className="text-4xl font-bold font-display text-[#2F2B36] mb-8">
                Impact
              </h2>
              <p className="text-base leading-[22px] font-text text-[#2F2B36]">
                Our mission is to create a transparent, efficient, and
                accessible private markets exchange that connects institutional
                investors, accredited individuals, and promising businesses in a
                trusted digital environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section - Mobile First */}
      <section className="bg-[#FFFFFF] px-4 py-12 md:px-0">
        {/* Mobile Mission */}
        <div className="md:hidden">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 mb-8">
            <div className="text-center mb-6">
              <Image
                src="/images/Icon & Text (1) 1.svg"
                width={200}
                height={200}
                alt="Logo"
                className="mx-auto mb-4"
              />
            </div>
            <h2 className="text-2xl font-bold font-display text-[#2F2B36] mb-4 text-center">
              Mission Statement
            </h2>
            <p className="text-sm leading-6 font-text text-[#2F2B36] text-center mb-6">
              To democratize access to private capital by building the most
              secure, intelligent, and connected platform for investors and
              businesses across Africa and beyond.
            </p>
            <div className="text-center">
              <button className="bg-[#0A1F44] text-white px-6 py-3 rounded-xl font-medium hover:scale-105 transition-all duration-200">
                Learn more
              </button>
            </div>
          </div>

          {/* Mobile Messaging Pillars */}
          <div className="bg-[#F7F7F7] rounded-2xl p-6">
            <h2 className="text-2xl font-bold font-display text-[#2F2B36] mb-6 text-center">
              Messaging Pillars
            </h2>
            <div className="space-y-4">
              {[
                "Empowerment: Giving businesses access to capital that drives growth.",
                "Intelligence: AI-driven insights for smarter investment decisions.",
                "Connectivity: Bringing investors and businesses together on one secure platform.",
                "Compliance & Trust: Building confidence through robust regulatory and security frameworks.",
              ].map((pillar, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-sm leading-6 font-text text-[#2F2B36] text-center">
                    {pillar}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Mission */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between gap-32 mx-32 mt-20">
            <div className="w-full flex justify-center">
              <Image
                src="/images/Icon & Text (1) 1.svg"
                width={600}
                height={600}
                alt="Vision Side"
                className="w-[400px] h-[400px]"
              />
            </div>
            <div className="w-full">
              <h2 className="text-5xl font-bold font-display text-[#2F2B36] mb-8">
                Mission Statement
              </h2>
              <p className="text-base leading-[22px] font-text text-[#2F2B36]">
                To democratize access to private capital by building the most
                secure, intelligent, and connected platform for investors and
                businesses across Africa and beyond. Our mission is to eliminate
                barriers to capital and create a future where funding innovation
                is seamless, trusted, and efficient.
              </p>
              <button className="border border-[#2F2B36] px-4 py-3 rounded-full bg-[#0A1F44] text-white hover:scale-105 transition-all duration-200 mt-10">
                Learn more
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center bg-[#F7F7F7] container mx-auto py-6 mt-10">
            <h1 className="text-5xl font-bold font-display text-[#2F2B36] mb-8 text-center text-wrap max-w-2xl">
              Messaging Pillars
            </h1>
            <div className="flex flex-col gap-4">
              <li className="text-base leading-[22px] font-text text-[#2F2B36] text-center max-w-2xl">
                Empowerment: Giving businesses access to capital that drives
                growth.
              </li>
              <li className="text-base leading-[22px] font-text text-[#2F2B36] text-center max-w-2xl">
                Intelligence: AI-driven insights for smarter investment
                decisions.
              </li>
              <li className="text-base leading-[22px] font-text text-[#2F2B36] text-center max-w-2xl">
                Connectivity: Bringing investors and businesses together on one
                secure platform.
              </li>
              <li className="text-base leading-[22px] font-text text-[#2F2B36] text-center max-w-2xl">
                Compliance & Trust: Building confidence through robust
                regulatory and security frameworks.
              </li>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </main>
  );
}
