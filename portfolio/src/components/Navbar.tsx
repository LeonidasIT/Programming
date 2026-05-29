import { useEffect, useState } from "react";

const NAV_LINKS = ["Home", "Work", "Resume"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");
  const [logoHovered, setLogoHovered] = useState(false);
  const [sayHiHovered, setSayHiHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <div
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow duration-300 ${
          scrolled ? "shadow-md shadow-black/10" : ""
        }`}
      >
        {/* Logo */}
        <button
          className="relative w-9 h-9 rounded-full transition-transform duration-200 hover:scale-110"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          aria-label="Home"
        >
          <span
            className="absolute inset-0 rounded-full p-[1.5px]"
            style={{
              background: logoHovered
                ? "linear-gradient(270deg, #89AACC 0%, #4E85BF 100%)"
                : "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)",
              transition: "background 0.3s",
            }}
          >
            <span className="flex items-center justify-center w-full h-full rounded-full bg-bg">
              <span className="font-display italic text-[13px] text-text-primary">
                JA
              </span>
            </span>
          </span>
        </button>

        {/* Divider */}
        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {/* Nav links */}
        {NAV_LINKS.map((link) => (
          <button
            key={link}
            onClick={() => setActive(link)}
            className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors duration-150 ${
              active === link
                ? "text-text-primary bg-stroke/50"
                : "text-muted hover:text-text-primary hover:bg-stroke/50"
            }`}
          >
            {link}
          </button>
        ))}

        {/* Divider */}
        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {/* Say hi button */}
        <div className="relative">
          {sayHiHovered && (
            <span
              className="absolute rounded-full accent-gradient-border"
              style={{ inset: "-2px" }}
            />
          )}
          <button
            className="relative text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 bg-surface backdrop-blur-md text-text-primary transition-colors duration-150"
            onMouseEnter={() => setSayHiHovered(true)}
            onMouseLeave={() => setSayHiHovered(false)}
          >
            Say hi ↗
          </button>
        </div>
      </div>
    </nav>
  );
}
