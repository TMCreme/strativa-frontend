export default function Footer() {
  return (
    <footer className="flex flex-col container mx-auto py-6 mt-10">
      <div className="flex items-start justify-between gap-10 px-10">
        <div className="w-1/5">
          <h1 className="font-text font-medium text-[21px] leading-none tracking-[-0.015em] text-[#2F2B36] mb-7">
            Strativa
          </h1>
          <p className="text-base leading-[22px] font-text text-[#2F2B36]">
            Strativa is a private markets exchange powered by AI and data-driven
            insights. We connect institutional investors, accredited
            individuals, and promising businesses in a trusted digital
            environment. By integrating compliance,
          </p>
        </div>
        <div>
          <h1 className="font-text font-medium text-[21px] leading-none tracking-[-0.015em] text-[#2F2B36] mb-7">
            Contact
          </h1>
          <ul className="text-base leading-[22px] font-text text-[#2F2B36] space-y-2">
            <li>500 Accra, Ghana.</li>
            <li>East Legon Hills, CA 94158</li>
            <li>123-456-7890</li>
            <li>info@strativamarkets.com</li>
          </ul>
        </div>
        <div>
          <h1 className="font-text font-medium text-[21px] leading-none tracking-[-0.015em] text-[#2F2B36] mb-7">
            Menu
          </h1>
          <ul className="text-base leading-[22px] font-text text-[#2F2B36] space-y-2">
            <li>About</li>
            <li>Products</li>
            <li>Resources</li>
          </ul>
        </div>
        <div>
          <h1 className="font-text font-medium text-[21px] leading-none tracking-[-0.015em] text-[#2F2B36] mb-7">
            Policy
          </h1>
          <ul className="text-base leading-[22px] font-text text-[#2F2B36] space-y-2">
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Resources</li>
          </ul>
        </div>
        <div>
          <h1 className="font-text font-medium text-[21px] leading-none tracking-[-0.015em] text-[#2F2B36] mb-7">
            Socials
          </h1>
          <ul className="text-base leading-[22px] font-text text-[#2F2B36] space-y-2">
            <li>Facebook</li>
            <li>Twitter</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 px-10">
        <p className="text-base leading-[22px] font-text text-[#2F2B36]">
          © 2025 by Strativa.
        </p>
      </div>
    </footer>
  );
}
