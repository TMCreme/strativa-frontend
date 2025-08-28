export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      {/* Mobile Footer */}
      <div className="md:hidden px-4 py-8">
        {/* Company Info */}
        <div className="mb-8">
          <h1 className="font-text font-medium text-xl leading-none tracking-[-0.015em] text-[#2F2B36] mb-4">
            Strativa
          </h1>
          <p className="text-sm leading-6 font-text text-[#2F2B36]">
            Strativa is a private markets exchange powered by AI and data-driven
            insights. We connect institutional investors, accredited
            individuals, and promising businesses in a trusted digital
            environment.
          </p>
        </div>

        {/* Mobile Links Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Contact */}
          <div>
            <h2 className="font-text font-medium text-lg leading-none tracking-[-0.015em] text-[#2F2B36] mb-4">
              Contact
            </h2>
            <ul className="text-sm leading-6 font-text text-[#2F2B36] space-y-2">
              <li>500 Accra, Ghana.</li>
              <li>East Legon Hills, CA 94158</li>
              <li>123-456-7890</li>
              <li>info@strativamarkets.com</li>
            </ul>
          </div>

          {/* Menu */}
          <div>
            <h2 className="font-text font-medium text-lg leading-none tracking-[-0.015em] text-[#2F2B36] mb-4">
              Menu
            </h2>
            <ul className="text-sm leading-6 font-text text-[#2F2B36] space-y-2">
              <li>About</li>
              <li>Products</li>
              <li>Resources</li>
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h2 className="font-text font-medium text-lg leading-none tracking-[-0.015em] text-[#2F2B36] mb-4">
              Policy
            </h2>
            <ul className="text-sm leading-6 font-text text-[#2F2B36] space-y-2">
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Resources</li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h2 className="font-text font-medium text-lg leading-none tracking-[-0.015em] text-[#2F2B36] mb-4">
              Socials
            </h2>
            <ul className="text-sm leading-6 font-text text-[#2F2B36] space-y-2">
              <li>Facebook</li>
              <li>Twitter</li>
            </ul>
          </div>
        </div>

        {/* Mobile Copyright */}
        <div className="pt-6 border-t border-gray-200">
          <p className="text-sm leading-6 font-text text-[#2F2B36] text-center">
            © 2025 by Strativa.
          </p>
        </div>
      </div>

      {/* Desktop Footer */}
      <div className="hidden md:flex md:flex-col md:container md:mx-auto md:py-6 md:mt-10">
        <div className="flex items-start justify-between gap-10 px-10">
          <div className="w-1/5">
            <h1 className="font-text font-medium text-[21px] leading-none tracking-[-0.015em] text-[#2F2B36] mb-7">
              Strativa
            </h1>
            <p className="text-base leading-[22px] font-text text-[#2F2B36]">
              Strativa is a private markets exchange powered by AI and
              data-driven insights. We connect institutional investors,
              accredited individuals, and promising businesses in a trusted
              digital environment. By integrating compliance,
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
      </div>
    </footer>
  );
}
