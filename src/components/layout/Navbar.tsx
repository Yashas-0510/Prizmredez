export default function Navbar() {
  const navLinks = [
    { index: "01", name: "Work", href: "#work" },
    { index: "02", name: "Studio", href: "#studio" },
    { index: "03", name: "Services", href: "#services" },
    { index: "04", name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] mix-blend-difference">
      <div className="flex items-start justify-between px-6 md:px-10 pt-6">
        {/* Wordmark */}
        <a href="#" className="flex items-baseline gap-2" data-cursor data-cursor-text="TOP">
          <span className="font-heading font-extrabold text-sm tracking-[0.3em] uppercase text-white">
            Prizm
          </span>
          <span className="meta !text-[9px]">Studio</span>
        </a>

        {/* Index links */}
        <nav className="hidden md:flex items-start gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group flex items-baseline gap-1.5"
              data-cursor
            >
              <span className="meta !text-[8px] opacity-50 group-hover:opacity-100 transition-opacity">
                {link.index}
              </span>
              <span className="meta !text-white/80 group-hover:!text-white transition-colors">
                {link.name}
              </span>
            </a>
          ))}
        </nav>

        {/* CTA — mono, no pill */}
        <a
          href="#contact"
          className="group flex items-baseline gap-1"
          data-cursor
          data-cursor-text="START"
        >
          <span className="meta !text-white">Start ↗</span>
        </a>
      </div>
    </header>
  );
}
