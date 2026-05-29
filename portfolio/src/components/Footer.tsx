import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import HlsVideo from "./HlsVideo";

const HLS_SRC =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

const SOCIALS = ["Twitter", "LinkedIn", "Dribbble", "GitHub"];

const MARQUEE_TEXT = "BUILDING THE FUTURE • ";

export default function Footer() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [emailHovered, setEmailHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer className="bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden relative">
      {/* Background video */}
      <div className="absolute inset-0 pointer-events-none">
        <HlsVideo
          src={HLS_SRC}
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
          style={{ transform: "translate(-50%, -50%) scaleY(-1)" }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Marquee */}
      <div className="relative z-10 overflow-hidden mb-16">
        <div ref={marqueeRef} className="flex whitespace-nowrap">
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="text-5xl md:text-7xl lg:text-8xl font-display italic text-text-primary/10 mr-8 shrink-0"
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 mb-16">
        <p className="text-xs text-muted uppercase tracking-[0.3em] mb-4">
          Let's work together
        </p>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary mb-8 leading-tight">
          Start a{" "}
          <em className="font-display italic">project</em>
        </h2>

        <div className="relative">
          {emailHovered && (
            <span
              className="absolute rounded-full accent-gradient"
              style={{ inset: "-2px" }}
            />
          )}
          <a
            href="mailto:hello@michaelsmith.com"
            className="relative rounded-full text-sm px-8 py-4 bg-bg border border-stroke text-text-primary hover:border-transparent transition-colors duration-150 flex items-center gap-3"
            onMouseEnter={() => setEmailHovered(true)}
            onMouseLeave={() => setEmailHovered(false)}
          >
            <span>hello@michaelsmith.com</span>
            <span>↗</span>
          </a>
        </div>
      </div>

      {/* Footer bar */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="border-t border-stroke pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Socials */}
          <div className="flex items-center gap-4">
            {SOCIALS.map((social) => (
              <button
                key={social}
                className="text-xs text-muted hover:text-text-primary transition-colors duration-150 uppercase tracking-[0.15em]"
              >
                {social}
              </button>
            ))}
          </div>

          {/* Available indicator */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            <span className="text-xs text-muted">Available for projects</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
