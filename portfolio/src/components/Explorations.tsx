import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80",
    rotate: -3,
  },
  {
    src: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=500&q=80",
    rotate: 2,
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
    rotate: -1,
  },
  {
    src: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=500&q=80",
    rotate: 3,
  },
  {
    src: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=500&q=80",
    rotate: -2,
  },
  {
    src: "https://images.unsplash.com/photo-1624996379697-f01d168b1a52?w=500&q=80",
    rotate: 1,
  },
];

export default function Explorations() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the center content
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: contentRef.current,
        pinSpacing: false,
      });

      // Parallax col 1 (moves up)
      gsap.to(col1Ref.current, {
        y: "-30%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Parallax col 2 (moves down)
      gsap.to(col2Ref.current, {
        y: "30%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const col1 = ITEMS.slice(0, 3);
  const col2 = ITEMS.slice(3);

  return (
    <section ref={sectionRef} className="relative min-h-[300vh] bg-bg">
      {/* Layer 1: Pinned center content */}
      <div
        ref={contentRef}
        className="relative z-10 h-screen flex items-center justify-center"
      >
        <div className="text-center px-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              Explorations
            </span>
            <span className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display text-text-primary leading-tight mb-4">
            Visual{" "}
            <em className="font-display italic">playground</em>
          </h2>
          <p className="text-sm text-muted max-w-xs mx-auto mb-6">
            Experiments and explorations beyond client work.
          </p>
          <DribbbleButton />
        </div>
      </div>

      {/* Layer 2: Parallax columns */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="max-w-[1400px] mx-auto h-full relative px-6">
          <div className="absolute inset-0 grid grid-cols-2 gap-12 md:gap-40 px-6 pointer-events-auto">
            {/* Col 1 */}
            <div
              ref={col1Ref}
              className="flex flex-col gap-8 justify-start pt-16"
            >
              {col1.map((item, i) => (
                <ExplorationCard
                  key={i}
                  item={item}
                  onClick={() => setLightbox(item.src)}
                />
              ))}
            </div>

            {/* Col 2 */}
            <div
              ref={col2Ref}
              className="flex flex-col gap-8 justify-end pb-16"
            >
              {col2.map((item, i) => (
                <ExplorationCard
                  key={i}
                  item={item}
                  onClick={() => setLightbox(item.src)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setLightbox(null)}
        >
          <motion.img
            src={lightbox}
            alt="Lightbox"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </motion.div>
      )}
    </section>
  );
}

function ExplorationCard({
  item,
  onClick,
}: {
  item: (typeof ITEMS)[0];
  onClick: () => void;
}) {
  return (
    <div
      className="aspect-square max-w-[320px] rounded-2xl overflow-hidden cursor-pointer border border-stroke hover:border-transparent transition-all duration-300 group"
      style={{ transform: `rotate(${item.rotate}deg)` }}
      onClick={onClick}
    >
      <img
        src={item.src}
        alt="Exploration"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
  );
}

function DribbbleButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="relative inline-flex">
      {hovered && (
        <span
          className="absolute rounded-full accent-gradient"
          style={{ inset: "-2px" }}
        />
      )}
      <button
        className="relative rounded-full text-sm px-6 py-2.5 bg-bg border border-stroke text-text-primary transition-colors duration-150 flex items-center gap-2"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        View on Dribbble ↗
      </button>
    </div>
  );
}
