import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Emblem } from "./Botanicals";

export const SECTIONS = ["home", "about", "skills", "projects", "journey", "contact"];

export function Nav() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTIONS.forEach((s) => { const el = document.getElementById(s); if (el) obs.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); obs.disconnect(); };
  }, []);

  const link = (s: string) => (
    <a key={s} href={`#${s}`} onClick={() => setOpen(false)}
      aria-current={active === s ? "true" : undefined}
      className={`relative px-1 py-1 text-sm capitalize transition ${active === s ? "text-ivory" : "text-muted-foreground hover:text-ivory"}`}>
      {s}
      {active === s && <motion.span layoutId="nav-dot" className="absolute -bottom-1 left-0 right-0 mx-auto h-0.5 w-full rounded bg-rose-gradient" />}
    </a>
  );

  return (
    <motion.header initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "border-b border-border bg-background/70 backdrop-blur-xl" : ""}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4" aria-label="Main">
        <a href="#home" className="flex items-center gap-3" aria-label="Khushboo Varshney, home">
          <Emblem className="h-10 w-10" />
          <span className="font-display text-sm font-semibold tracking-[0.25em] text-ivory">KHUSHBOO VARSHNEY</span>
        </a>
        <div className="hidden items-center gap-7 lg:flex">
          {SECTIONS.map(link)}
          <a href="#contact" className="rounded-full bg-rose-gradient px-5 py-2 text-sm font-medium text-background transition hover:scale-105">Let's Connect</a>
        </div>
        <button className="rounded-full p-2 text-ivory lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl lg:hidden">
            <div className="flex flex-col gap-4 px-6 py-6">
              {SECTIONS.map(link)}
              <a href="#contact" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-rose-gradient px-5 py-3 text-center font-medium text-background">Let's Connect</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
