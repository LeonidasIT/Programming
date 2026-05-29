import { useState } from "react";
import { motion } from "framer-motion";

const PROJECTS = [
  {
    title: "Automotive Motion",
    span: "md:col-span-7",
    aspect: "aspect-[4/3]",
    bg: "bg-stone-800",
    imgSrc:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
  },
  {
    title: "Urban Architecture",
    span: "md:col-span-5",
    aspect: "aspect-[3/4]",
    bg: "bg-zinc-800",
    imgSrc:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
  },
  {
    title: "Human Perspective",
    span: "md:col-span-5",
    aspect: "aspect-[3/4]",
    bg: "bg-neutral-800",
    imgSrc:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
  },
  {
    title: "Brand Identity",
    span: "md:col-span-7",
    aspect: "aspect-[4/3]",
    bg: "bg-slate-800",
    imgSrc:
      "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80",
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

export default function SelectedWorks() {
  const [viewAllHovered, setViewAllHovered] = useState(false);

  return (
    <section className="bg-bg py-12 md:py-16">
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
                Selected Work
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-text-primary leading-tight">
              Featured{" "}
              <em className="font-display italic">projects</em>
            </h2>
            <p className="text-sm text-muted mt-2 max-w-sm">
              A selection of projects I've worked on, from concept to launch.
            </p>
          </div>

          {/* View all — desktop only */}
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
              View all work <span>→</span>
            </button>
          </div>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={`group relative rounded-3xl overflow-hidden border border-stroke ${project.span} ${project.aspect} ${project.bg} cursor-pointer`}
      variants={inViewVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <img
        src={project.imgSrc}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Halftone overlay */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "4px 4px",
        }}
      />

      {/* Hover overlay */}
      <div
        className={`absolute inset-0 bg-bg/70 backdrop-blur-lg transition-opacity duration-300 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Hover label */}
      {hovered && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <span
              className="absolute rounded-full accent-gradient"
              style={{ inset: "-1.5px" }}
            />
            <span className="relative flex items-center gap-2 bg-bg/90 text-text-primary text-sm px-5 py-2.5 rounded-full backdrop-blur-sm">
              View —{" "}
              <em className="font-display italic">{project.title}</em>
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
