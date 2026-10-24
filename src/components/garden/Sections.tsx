import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import {
  ArrowRight, BookOpen, CalendarDays, Code2, ExternalLink, Layers, Lightbulb, Mail,
  Megaphone, Palette, Sparkles, Users, Brain, Clock, Star,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, LotusFlower, LotusLeaf, Petal, Rose } from "./Botanicals";
import { JOURNEY, PROFILE, PROJECTS, SKILLS, type Project } from "./content";
import { Section, SectionHeading, btnGhost, btnPrimary, chip, fadeUp } from "./ui";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const ROLES = ["Backend Developer", "Python Programmer", "C Programmer", "UI/UX Designer", "Project Leader"];

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  return (
    <motion.div ref={ref} style={{ x, y }} className="inline-block"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.2);
        y.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.div>
  );
}

export function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((v) => (v + 1) % ROLES.length), 2600); return () => clearInterval(t); }, []);
  const d = (n: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.3 + n * 0.12, ease: [0.22, 1, 0.36, 1] as const } });
  return (
    <section id="home" className="relative flex min-h-screen items-center px-5 pt-28 pb-16">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4 }}
        className="pointer-events-none absolute bottom-10 right-[4%] hidden w-72 md:block">
        <motion.div animate={{ rotate: [-2, 2, -2] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "50% 100%" }}>
          <Rose className="w-full drop-shadow-2xl" />
        </motion.div>
      </motion.div>
      <div className="relative mx-auto w-full max-w-6xl">
        <motion.p {...d(0)} className="mb-6 text-xs tracking-[0.35em] text-gold">CREATIVE THINKER • DEVELOPER • BUILDER</motion.p>
        <motion.h1 {...d(1)} className="max-w-4xl text-5xl font-semibold leading-[1.02] md:text-8xl">
          Hello, I'm <span className="text-gradient italic">Khushboo Varshney.</span>
        </motion.h1>
        <motion.p {...d(2)} className="mt-6 max-w-2xl text-xl text-soft md:text-2xl">Building thoughtful digital experiences through code and creativity.</motion.p>
        <motion.div {...d(3)} className="mt-5 flex h-8 items-center gap-3 text-lg text-blush">
          <Sparkles className="h-4 w-4" aria-hidden />
          <AnimatePresence mode="wait">
            <motion.span key={ROLES[i]} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }}>
              {ROLES[i]}
            </motion.span>
          </AnimatePresence>
        </motion.div>
        <motion.p {...d(4)} className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
          I enjoy exploring programming, contributing innovative ideas, designing intuitive interfaces, and developing applications that solve real problems. I believe great technology combines logical thinking, creativity, and a thoughtful user experience.
        </motion.p>
        <motion.div {...d(5)} className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic><a href="#projects" className={btnPrimary}>Explore My Work <ArrowRight className="h-4 w-4" /></a></Magnetic>
          <Magnetic><a href="#contact" className={btnGhost}>Let's Connect</a></Magnetic>
          <div className="ml-1 flex gap-2">
            {[{ h: PROFILE.github, I: Github, l: "GitHub" }, { h: PROFILE.linkedin, I: Linkedin, l: "LinkedIn" }, { h: `mailto:${PROFILE.email}`, I: Mail, l: "Email" }].map(({ h, I, l }) => (
              <a key={l} href={h} {...(l !== "Email" ? ext : {})} aria-label={l} className="rounded-full border border-border p-3 text-soft transition hover:border-blush hover:text-blush">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function About() {
  const cards = [
    { I: Lightbulb, t: "Creative Thinking", d: "Exploring ideas, understanding problems, and finding practical ways to turn concepts into useful digital experiences." },
    { I: BookOpen, t: "Technical Learning", d: "Developing programming knowledge, exploring backend concepts, and improving my understanding of software development." },
    { I: Users, t: "Teamwork and Leadership", d: "Contributing ideas, communicating concepts, coordinating responsibilities, and supporting collaborative project development." },
  ];
  return (
    <Section id="about">
      <SectionHeading eyebrow="About" title="More Than Just Code" subtitle="Curiosity, creativity, and purposeful technology." />
      <div className="grid items-center gap-12 md:grid-cols-[1.4fr_1fr]">
        <motion.div {...fadeUp} className="space-y-5 text-lg leading-relaxed text-soft">
          <p className="text-ivory">Hi, I'm Khushboo Varshney — a backend developer and creative technology enthusiast who enjoys turning ideas into meaningful digital experiences.</p>
          <p>I'm a technology enthusiast interested in backend development, programming, artificial intelligence, and user-centered digital experiences. I enjoy learning how applications work behind the scenes, exploring new technologies, and contributing ideas that help transform concepts into practical projects.</p>
          <p>My interests extend beyond coding. I contribute ideas and leadership to an AI study planner project, work on presentation and UI/UX design for a legacy portal project, and explore the development of a notes application focused on everyday productivity.</p>
          <p>I believe that meaningful technology requires logical thinking, continuous learning, collaboration, and an understanding of the people who use it.</p>
        </motion.div>
        <motion.div {...fadeUp} className="relative mx-auto aspect-square w-full max-w-sm">
          <LotusLeaf className="absolute inset-0 h-full w-full opacity-40" />
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute inset-x-[18%] top-[14%]">
            <LotusFlower className="w-full" />
          </motion.div>
          <Rose className="absolute -bottom-4 -right-2 w-28" />
        </motion.div>
      </div>
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {cards.map(({ I, t, d }, n) => (
          <motion.div key={t} {...fadeUp} transition={{ ...fadeUp.transition, delay: n * 0.1 }} whileHover={{ y: -6 }}
            className="glass glow-border rounded-2xl p-7">
            <div className="mb-5 inline-flex rounded-xl bg-teal p-3 text-mint"><I className="h-5 w-5" /></div>
            <h3 className="text-2xl font-semibold">{t}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

export function Skills() {
  const cats = ["All", ...SKILLS.map((s) => s.category)];
  const [f, setF] = useState("All");
  const icons: Record<string, any> = { Languages: Code2, Development: Layers, "Frontend & Design": Palette, Collaboration: Users };
  const shown = SKILLS.filter((s) => f === "All" || s.category === f);
  return (
    <Section id="skills">
      <SectionHeading eyebrow="Skills" title="My Technical Toolkit" subtitle="Tools and technologies I'm learning and using to build better applications." />
      <div className="mb-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter skills">
        {cats.map((c) => (
          <button key={c} onClick={() => setF(c)} aria-pressed={f === c}
            className={`rounded-full px-4 py-2 text-sm transition ${f === c ? "bg-sage text-background" : "border border-border text-soft hover:text-ivory"}`}>{c}</button>
        ))}
      </div>
      <motion.div layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {shown.map((s) => {
            const I = icons[s.category];
            return (
              <motion.div layout key={s.category} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
                className="glass glow-border relative overflow-hidden rounded-2xl p-7">
                <LotusLeaf className="absolute -right-10 -top-10 w-36 opacity-10" />
                <div className="mb-5 flex items-center gap-3">
                  <I className="h-5 w-5 text-mint" /><h3 className="text-2xl font-semibold">{s.category}</h3>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {s.items.map((it) => (
                    <li key={it.name} className="flex items-center gap-2 rounded-full border border-border bg-pond/50 px-3 py-1.5 text-sm text-soft transition hover:border-sage">
                      {it.name}
                      <span className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${it.status === "Learning" ? "bg-rose-deep/40 text-blush" : "bg-teal text-mint"}`}>{it.status}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}

function ProjectArt({ kind }: { kind: Project["art"] }) {
  return (
    <div className="relative h-44 overflow-hidden rounded-xl bg-teal/60">
      <LotusLeaf className="absolute -left-8 -bottom-10 w-40 opacity-30" />
      {kind === "planner" && (
        <div className="absolute inset-0 flex items-center justify-center gap-3">
          <div className="glass rounded-lg p-3"><CalendarDays className="h-6 w-6 text-mint" />
            <div className="mt-2 grid grid-cols-4 gap-1">{Array.from({ length: 12 }).map((_, i) => <span key={i} className={`h-2 w-2 rounded-sm ${i % 5 === 0 ? "bg-blush" : "bg-sage/40"}`} />)}</div>
          </div>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="rounded-full border border-dashed border-sage/50 p-4"><Brain className="h-7 w-7 text-gold" /></motion.div>
        </div>
      )}
      {kind === "portal" && (
        <div className="absolute inset-4 grid grid-cols-3 gap-2">
          <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity }} className="glass col-span-2 rounded-lg p-2"><div className="h-2 w-1/2 rounded bg-sage/60" /><div className="mt-2 h-14 rounded bg-pond" /></motion.div>
          <div className="glass rounded-lg p-2"><div className="h-2 w-full rounded bg-blush/60" /><div className="mt-2 space-y-1">{[1, 2, 3].map((i) => <div key={i} className="h-1.5 rounded bg-sage/30" />)}</div></div>
          <div className="glass col-span-3 rounded-lg p-2"><div className="flex gap-1">{[3, 5, 2, 6, 4, 7].map((h, i) => <span key={i} className="w-full rounded-t bg-sage/50" style={{ height: h * 4 }} />)}</div></div>
          <Petal className="absolute right-0 top-0 w-5" />
        </div>
      )}
      {kind === "notes" && (
        <div className="absolute inset-0 flex items-center justify-center">
          {[-8, 0, 8].map((r, i) => (
            <motion.div key={i} whileHover={{ rotate: 0 }} className="glass absolute h-28 w-24 rounded-lg p-3" style={{ rotate: r, x: (i - 1) * 40 }}>
              <div className="h-1.5 w-3/4 rounded bg-ivory/60" />{[1, 2, 3, 4].map((k) => <div key={k} className="mt-2 h-1 rounded bg-sage/40" />)}
            </motion.div>
          ))}
          <motion.div animate={{ y: [0, 10, 0], rotate: [0, 30, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute right-8 top-4 w-6"><Petal className="w-full" /></motion.div>
        </div>
      )}
    </div>
  );
}

export function Projects() {
  const filters = ["All", ...PROJECTS.map((p) => p.filter)];
  const [f, setF] = useState("All");
  return (
    <Section id="projects">
      <SectionHeading eyebrow="Projects" title="Ideas Into Reality" subtitle="Projects shaped by technology, teamwork, creativity, and problem-solving." />
      <div className="mb-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter projects">
        {filters.map((c) => (
          <button key={c} onClick={() => setF(c)} aria-pressed={f === c}
            className={`rounded-full px-4 py-2 text-sm transition ${f === c ? "bg-sage text-background" : "border border-border text-soft hover:text-ivory"}`}>{c}</button>
        ))}
      </div>
      <motion.div layout className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {PROJECTS.filter((p) => f === "All" || p.filter === f).map((p) => (
            <motion.article layout key={p.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} whileHover={{ y: -6 }}
              className="glass glow-border relative flex flex-col rounded-2xl p-5">
              <Petal className="absolute -right-2 -top-2 w-6 rotate-12" />
              <ProjectArt kind={p.art} />
              <div className="mt-5 flex items-center justify-between gap-2 text-xs">
                <span className="text-gold">{p.category}</span>
                <span className={`shrink-0 rounded-full px-2 py-0.5 ${p.status === "In Development" ? "bg-rose-deep/40 text-blush" : "bg-teal text-mint"}`}>{p.status}</span>
              </div>
              <h3 className="mt-2 text-2xl font-semibold">{p.title}</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">{p.roles.map((r) => <span key={r} className={chip}>{r}</span>)}</div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              <p className="mt-4 text-xs uppercase tracking-widest text-sage">{p.goalsLabel}</p>
              <ul className="mt-2 space-y-1 text-sm text-soft">{p.goals.map((g) => <li key={g} className="flex gap-2"><span className="text-blush">✿</span>{g}</li>)}</ul>
              <p className="mt-4 text-xs text-muted-foreground">Tech stack: {p.tech.length ? p.tech.join(" · ") : "To be confirmed"}</p>
              <div className="mt-auto flex flex-wrap gap-2 pt-5">
                {p.links.some((l) => l.url) ? p.links.filter((l) => l.url).map((l) => (
                  <a key={l.label} href={l.url} {...ext} className="inline-flex items-center gap-1 rounded-full border border-sage/40 px-3 py-1.5 text-xs hover:border-blush hover:text-blush">{l.label} <ExternalLink className="h-3 w-3" /></a>
                )) : <span className="inline-flex items-center gap-1.5 text-xs italic text-muted-foreground"><Clock className="h-3 w-3" /> Project link coming soon</span>}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}

export function Journey() {
  return (
    <Section id="journey">
      <SectionHeading eyebrow="Journey" title="My Learning Journey" subtitle="Every project is another opportunity to learn, build, and improve." />
      <div className="relative mx-auto max-w-2xl">
        <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }}
          className="absolute left-5 top-0 h-full w-px origin-top bg-gradient-to-b from-sage via-sage/50 to-blush/40" />
        <ol className="space-y-10">
          {JOURNEY.map((j, n) => (
            <motion.li key={j.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: n * 0.08 }} className="relative pl-16">
              <motion.span initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 + n * 0.08, type: "spring" }}
                className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border border-sage/50 bg-pond">
                {n % 2 ? <Petal className="w-5" /> : <LotusLeaf className="w-6" />}
              </motion.span>
              <div className="glass rounded-2xl p-6">
                {j.date && <p className="mb-1 text-xs text-gold">{j.date}</p>}
                <h3 className="text-2xl font-semibold">{j.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{j.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

export function Beyond() {
  const items = [
    { I: Star, t: "Leadership", d: "Contributing ideas, supporting project direction, and helping coordinate collaborative work." },
    { I: Palette, t: "UI/UX Design", d: "Thinking about user journeys, visual hierarchy, usability, and interface consistency." },
    { I: Megaphone, t: "Technical Presentation", d: "Explaining project concepts, communicating ideas, and presenting work clearly." },
    { I: Lightbulb, t: "Creative Problem Solving", d: "Exploring practical solutions and helping transform early ideas into structured projects." },
  ];
  return (
    <Section id="beyond">
      <SectionHeading eyebrow="Contributions" title="Beyond the Code" subtitle="The different ways I help projects grow." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ I, t, d }, n) => (
          <motion.div key={t} {...fadeUp} transition={{ ...fadeUp.transition, delay: n * 0.08 }} whileHover={{ y: -6 }} className="glass glow-border rounded-2xl p-6">
            <I className="h-6 w-6 text-blush" />
            <h3 className="mt-4 text-xl font-semibold">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </motion.div>
        ))}
      </div>
      <GitHubRepos />
    </Section>
  );
}

function GitHubRepos() {
  const [repos, setRepos] = useState<{ name: string; html_url: string; description: string | null; language: string | null }[] | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    fetch(`https://api.github.com/users/${PROFILE.githubUser}/repos?sort=updated&per_page=6`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => (Array.isArray(d) ? setRepos(d.filter((x: any) => !x.fork)) : setFailed(true)))
      .catch(() => setFailed(true));
  }, []);
  return (
    <motion.div {...fadeUp} className="glass mt-16 rounded-3xl p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-3xl font-semibold">On GitHub & LinkedIn</h3>
          <p className="mt-1 text-sm text-muted-foreground">Public work and professional profile.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={PROFILE.github} {...ext} className={btnPrimary}><Github className="h-4 w-4" /> Explore My GitHub</a>
          <a href={PROFILE.linkedin} {...ext} className={btnGhost}><Linkedin className="h-4 w-4" /> Connect on LinkedIn</a>
        </div>
      </div>
      {repos && repos.length > 0 && (
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {repos.slice(0, 6).map((r) => (
            <a key={r.name} href={r.html_url} {...ext} className="rounded-xl border border-border bg-pond/50 p-4 transition hover:border-sage">
              <p className="font-medium text-ivory">{r.name}</p>
              {r.description && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{r.description}</p>}
              {r.language && <p className="mt-2 text-xs text-gold">{r.language}</p>}
            </a>
          ))}
        </div>
      )}
      {failed && <p className="mt-6 text-sm text-muted-foreground">Repositories couldn't load right now — visit the GitHub profile to explore them.</p>}
    </motion.div>
  );
}
