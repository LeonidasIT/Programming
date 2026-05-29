import { useState } from "react";
import { motion } from "framer-motion";

const ENTRIES = [
  {
    title: "The quiet geometry of brutalist facades",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=200&q=70",
    readTime: "5 min read",
    date: "Mar 12, 2026",
  },
  {
    title: "Why motion design changes everything",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=70",
    readTime: "7 min read",
    date: "Feb 28, 2026",
  },
  {
    title: "Building design systems that scale",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&q=70",
    readTime: "4 min read",
    date: "Feb 10, 2026",
  },
  {
    title: "Type as texture — Instrument Serif in practice",
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=200&q=70",
    readTime: "6 min read",
    date: "Jan 22, 2026",
  },
];

const inViewVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

export default function Journal() {
  const [viewAllHovered, setViewAllHovered] = useState(false);

  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="flex items-end justify-between mb-10 md:mb-14"
          variants={inViewVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">
                Journal
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-text-primary leading-tight">
              Recent{" "}
              <em className="font-display italic">thoughts</em>
            </h2>
            <p className="text-sm text-muted mt-2 max-w-sm">
              Occasional writings on design, technology, and the space between.
            </p>
          </div>

          <div className="relative hidden md:inline-flex">
            {viewAllHovered && (
              <span
                className="absolute rounded-full accent-gradient"
                style={{ inset: "-2px" }}
              />
            )}
            <button
              className="relative rounded-full text-sm px-6 py-2.5 bg-bg border border-stroke text-text-primary hover:border-transparent transition-colors duration-150 flex items-center gap-2"
              onMouseEnter={() => setViewAllHovered(true)}
              onMouseLeave={() => setViewAllHovered(false)}
            >
              View all <span>→</span>
            </button>
          </div>
        </motion.div>

        {/* Entries list */}
        <div className="flex flex-col gap-3">
          {ENTRIES.map((entry, i) => (
            <JournalEntry key={i} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function JournalEntry({
  entry,
  index,
}: {
  entry: (typeof ENTRIES)[0];
  index: number;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
            delay: index * 0.08,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      <div className="group flex items-center gap-4 sm:gap-6 p-4 rounded-[40px] sm:rounded-full bg-surface/30 hover:bg-surface border border-stroke transition-colors duration-200 cursor-pointer">
        {/* Thumbnail */}
        <div className="shrink-0 w-12 h-12 rounded-full overflow-hidden">
          <img
            src={entry.image}
            alt={entry.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Title */}
        <p className="flex-1 text-sm md:text-base text-text-primary leading-snug">
          {entry.title}
        </p>

        {/* Meta */}
        <div className="shrink-0 hidden sm:flex items-center gap-4 text-xs text-muted">
          <span>{entry.readTime}</span>
          <span className="w-1 h-1 rounded-full bg-stroke" />
          <span>{entry.date}</span>
        </div>

        {/* Arrow */}
        <div className="shrink-0 w-8 h-8 rounded-full border border-stroke flex items-center justify-center text-muted group-hover:border-text-primary group-hover:text-text-primary transition-colors duration-200">
          <span className="text-xs">↗</span>
        </div>
      </div>
    </motion.div>
  );
}
