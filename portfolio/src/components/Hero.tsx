import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Navbar from "./Navbar";
import HlsVideo from "./HlsVideo";

const HLS_SRC =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

const ROLES = ["Creative", "Fullstack", "Founder", "Scholar"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [seeWorksHovered, setSeeWorksHovered] = useState(false);
  const [reachOutHovered, setReachOutHovered] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      ).fromTo(
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1,
          stagger: 0.1,
          delay: 0.3,
        },
        "<0.3"
      );
    }, contentRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Navbar />

      {/* Background video */}
      <div className="absolute inset-0">
        <HlsVideo
          src={HLS_SRC}
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
      >
        <p className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8">
          COLLECTION '26
        </p>

        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          Michael Smith
        </h1>

        <p className="blur-in text-sm md:text-base text-muted mb-3">
          A{" "}
          <span
            key={roleIndex}
            className="font-display italic text-text-primary animate-role-fade-in inline-block"
          >
            {ROLES[roleIndex]}
          </span>{" "}
          lives in Chicago.
        </p>

        <p className="blur-in text-sm md:text-base text-muted max-w-md mb-12">
          Designing seamless digital interactions by focusing on the unique
          nuances which bring systems to life.
        </p>

        {/* CTA buttons */}
        <div className="blur-in inline-flex gap-4 flex-wrap justify-center">
          {/* See Works */}
          <div className="relative">
            {seeWorksHovered && (
              <span
                className="absolute rounded-full accent-gradient"
                style={{ inset: "-2px" }}
              />
            )}
            <button
              className={`relative rounded-full text-sm px-7 py-3.5 transition-all duration-200 hover:scale-105 ${
                seeWorksHovered
                  ? "bg-bg text-text-primary"
                  : "bg-text-primary text-bg"
              }`}
              onMouseEnter={() => setSeeWorksHovered(true)}
              onMouseLeave={() => setSeeWorksHovered(false)}
            >
              See Works
            </button>
          </div>

          {/* Reach out */}
          <div className="relative">
            {reachOutHovered && (
              <span
                className="absolute rounded-full accent-gradient"
                style={{ inset: "-2px" }}
              />
            )}
            <button
              className={`relative rounded-full text-sm px-7 py-3.5 transition-all duration-200 hover:scale-105 bg-bg text-text-primary ${
                reachOutHovered
                  ? "border-transparent"
                  : "border-2 border-stroke"
              }`}
              onMouseEnter={() => setReachOutHovered(true)}
              onMouseLeave={() => setReachOutHovered(false)}
            >
              Reach out...
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-xs text-muted uppercase tracking-[0.2em]">
          SCROLL
        </span>
        <div className="relative w-px h-10 bg-stroke overflow-hidden">
          <div className="absolute inset-x-0 h-1/2 accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
