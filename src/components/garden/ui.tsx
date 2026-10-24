import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Petal } from "./Botanicals";

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

export function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <motion.div {...fadeUp} className="mx-auto mb-14 max-w-2xl text-center">
      <div className="mb-3 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-gold">
        <Petal className="w-4 -rotate-45" /> {eyebrow} <Petal className="w-4 rotate-45" />
      </div>
      <h2 className="text-4xl font-semibold text-gradient md:text-6xl">{title}</h2>
      <p className="mt-4 text-soft">{subtitle}</p>
    </motion.div>
  );
}

export function Section({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative scroll-mt-24 px-5 py-24 md:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export const btnPrimary =
  "inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 font-medium text-background shadow-glow transition hover:bg-mint";
export const btnGhost =
  "inline-flex items-center gap-2 rounded-full border border-sage/40 px-6 py-3 font-medium text-ivory transition hover:border-blush hover:text-blush";
export const chip = "rounded-full border border-sage/25 bg-pond/60 px-3 py-1 text-xs text-soft";
