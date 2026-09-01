export type HeroSlide = {
  image: string;
  alt: string;
  eyebrow: string;
  headline: string;
  sub: string;
  primary: { label: string; to: string };
  secondary: { label: string; to: string };
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2000&q=80",
    alt: "AACL consultants in a client working session",
    eyebrow: "Certified. Compliant. Trusted.",
    headline: "Certified. Compliant. Trusted. Anywhere in the World.",
    sub: "AACL Global turns ISO certification and everyday compliance into one done-for-you system. Expert consultants, available onsite or remote, wherever you operate.",
    primary: { label: "Get Certified, Faster", to: "/services" },
    secondary: { label: "Talk Budget First", to: "/contact" },
  },
  {
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80",
    alt: "Management review meeting reviewing compliance evidence",
    eyebrow: "ISO management systems",
    headline: "Certification, Without the Guesswork.",
    sub: "Whichever standard you need, ISO 9001, 27001, 45001, 22000 or any other, we walk you from gap assessment to certificate, onsite or remote.",
    primary: { label: "Start Your Journey", to: "/services" },
    secondary: { label: "Available Onsite or Remote", to: "/ecompliance" },
  },
  {
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80",
    alt: "Compliance team collaborating on a monitoring dashboard",
    eyebrow: "eCompliance",
    headline: "World Class Compliance to Drive Your Business Forward.",
    sub: "Cybersecurity audits, health & safety, physical and logical security and ongoing ISO maintenance. Handled for one predictable monthly fee.",
    primary: { label: "Get My eCompliance Quote", to: "/ecompliance" },
    secondary: { label: "Outsource My Compliance", to: "/contact" },
  },
  {
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2000&q=80",
    alt: "Consultant preparing a branded policy document",
    eyebrow: "AI document generator",
    headline: "Your Next Policy Document. Ready Before Your Coffee Gets Cold.",
    sub: "Enter your company details, upload your logo, describe what you need. Download a fully branded, audit-ready document in minutes.",
    primary: { label: "Generate My Document Now", to: "/templates" },
    secondary: { label: "Try It Free. First Draft On Us", to: "/templates" },
  },
];
