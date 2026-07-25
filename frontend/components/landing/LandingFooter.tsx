import Link from "next/link";

const footerLinks = {
  Product: ["Features", "Pricing", "Integrations", "Changelog"],
  Solutions: ["Agencies", "Freelancers", "Consultancies", "Enterprise"],
  Resources: ["Blog", "Documentation", "API Reference", "Community"],
  Company: ["About", "Careers", "Contact", "Privacy"],
};

export default function LandingFooter() {
  return (
    <footer className="border-t border-white/5 bg-[#081B2E] py-16">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <span className="text-2xl font-black uppercase tracking-tighter text-white">
              ORKA
            </span>
            <p className="mt-3 text-sm leading-relaxed text-white/30">
              Autonomous financial operations for global service businesses.
            </p>
          </div>
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white/40">
                {heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-white/40 transition-colors hover:text-white/70"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 border-t border-white/5 pt-8 text-center text-xs text-white/20">
          &copy; {new Date().getFullYear()} ORKA. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
