import { Navbar, Footer } from "@/features/LandingPage/conponents";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <section className="flex flex-col items-center justify-center container mx-auto py-6 mt-10">
        <h1 className="text-5xl font-bold font-display text-[#2F2B36] mb-8 text-center text-wrap max-w-2xl">
        Invest or raise capital for private companies
        </h1>
        <p className="text-base leading-[22px] font-text text-[#2F2B36] text-center max-w-2xl">
        This is a space to welcome visitors to the site. Grab their attention with copy that clearly states what the site is about, and add an engaging image or video.
        </p> 
        <div className="flex gap-7 mt-10">
          <Link 
            href="/investor/register"
            className="border border-[#2F2B36] px-4 py-3 rounded-full text-[#2F2B36] hover:bg-[#0A1F44] hover:text-white hover:border-[#0A1F44] transition-all duration-200 inline-block"
          >
            Register as an investor
          </Link>
          <Link 
            href="/company/register"
            className="border border-[#2F2B36] px-4 py-3 rounded-full text-[#2F2B36] hover:bg-[#0A1F44] hover:text-white hover:border-[#0A1F44] transition-all duration-200 inline-block"
          >
            Register as a company
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center">
          <Image src="/images/Frame 3985.svg" width={1000} height={1000} alt="Vision Side" />
        </div>


        <div className="flex items-center justify-between mx-32 mt-20">
          <div>
            <h2 className="text-4xl font-bold font-display text-[#2F2B36] mb-8">
              Vision
            </h2>
            <p className="text-base leading-[22px] font-text text-[#2F2B36] max-w-2xl">
              This is a space to welcome visitors to the site. Grab their attention with copy that clearly states what the site is about, and add an engaging image or video.
            </p>

          </div>
          <div>
            <Image 
                src="/images/Light - Big Horizontal image 3.svg" 
                width={1000} 
                height={1000} 
                alt="Vision Side" 
                className="w-full h-full object-cover"
                />
          </div>
        </div>
        
      </section>
      <section>
        <div className="flex flex-col mx-32 mt-20">
          <div>
            <h2 className="text-4xl font-bold font-display text-[#2F2B36] mb-8">
              About
            </h2>
            <p className="text-base leading-[22px] font-text text-[#2F2B36]">
            Strativa is a private markets exchange powered by AI 
            and data-driven insights. We connect institutional 
            investors, accredited individuals, and promising businesses 
            in a trusted digital environment. By integrating compliance, 
            secure communications, and intelligent matchmaking, we make private 
            investing transparent, efficient, and accessible. Our vision extends 
            beyond Ghana to redefine how capital flows across Africa and 
            the rest of the world, creating opportunities for wealth creation 
            and economic growth.
            </p>

          </div>
        </div>
        <div className= "grid grid-cols-4 gap-7 mx-32 mt-20">
          <div>
          <h2 className="text-4xl font-bold font-display text-[#2F2B36] mb-8">
              Trust
            </h2>
            <p className="text-base leading-[22px] font-text text-[#2F2B36]">
              Our mission is to create a transparent, efficient, and accessible private markets exchange that connects institutional investors, accredited individuals, and promising businesses in a trusted digital environment.
            </p>
          </div>
          <div>
          <h2 className="text-4xl font-bold font-display text-[#2F2B36] mb-8">
              Innovation
            </h2>
            <p className="text-base leading-[22px] font-text text-[#2F2B36]">
              Our mission is to create a transparent, efficient, and accessible private markets exchange that connects institutional investors, accredited individuals, and promising businesses in a trusted digital environment.
            </p>
          </div>
          <div>
          <h2 className="text-4xl font-bold font-display text-[#2F2B36] mb-8">
              Access
            </h2>
            <p className="text-base leading-[22px] font-text text-[#2F2B36]">
              Our mission is to create a transparent, efficient, and accessible private markets exchange that connects institutional investors, accredited individuals, and promising businesses in a trusted digital environment.
            </p>
          </div>
          <div>
          <h2 className="text-4xl font-bold font-display text-[#2F2B36] mb-8">
              Integrity
            </h2>
            <p className="text-base leading-[22px] font-text text-[#2F2B36]">
              Our mission is to create a transparent, efficient, and accessible private markets exchange that connects institutional investors, accredited individuals, and promising businesses in a trusted digital environment.
            </p>
          </div>
          <div className="mt-10">
            <h2 className="text-4xl font-bold font-display text-[#2F2B36] mb-8">
              Impact
            </h2>
            <p className="text-base leading-[22px] font-text text-[#2F2B36]">
              Our mission is to create a transparent, efficient, and accessible private markets exchange that connects institutional investors, accredited individuals, and promising businesses in a trusted digital environment.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#FFFFFF]">
        <div className="flex items-center justify-between gap-32 mx-32 mt-20">
          <div className="w-full flex justify-center">
            <Image src="/images/Icon & Text (1) 1.svg" width={600} height={600} alt="Vision Side" className="w-[400px] h-[400px]" />
          </div>
          <div className="w-full">
            <h2 className="text-5xl font-bold font-display text-[#2F2B36] mb-8">
            Mission Statement
            </h2>
            <p className="text-base leading-[22px] font-text text-[#2F2B36]">
            To democratize access to private capital by building the most secure, intelligent, 
            and connected platform for investors and businesses across Africa and beyond. 
            Our mission is to eliminate barriers to capital and create a future where funding 
            innovation is seamless, trusted, and efficient.
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
          Empowerment: Giving businesses access to capital that drives growth.
          </li>
          <li className="text-base leading-[22px] font-text text-[#2F2B36] text-center max-w-2xl">
          Intelligence: AI-driven insights for smarter investment decisions.
          </li>
          <li className="text-base leading-[22px] font-text text-[#2F2B36] text-center max-w-2xl">
          Connectivity: Bringing investors and businesses together on one secure
            platform.
          </li>
          <li className="text-base leading-[22px] font-text text-[#2F2B36] text-center max-w-2xl">
          Compliance & Trust: Building confidence through robust regulatory and security frameworks.
          </li>

        </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
