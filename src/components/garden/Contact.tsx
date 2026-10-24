import { motion } from "motion/react";
import { Mail, Send } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Emblem, Github, Linkedin, LotusLeaf, Rose } from "./Botanicals";
import { PROFILE } from "./content";
import { Section, SectionHeading, btnPrimary, fadeUp } from "./ui";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  subject: z.string().trim().min(1, "Please add a subject").max(150),
  message: z.string().trim().min(1, "Please write a message").max(2000),
});
type F = z.infer<typeof schema>;
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export function Contact() {
  const [v, setV] = useState<F>({ name: "", email: "", subject: "", message: "" });
  const [err, setErr] = useState<Partial<Record<keyof F, string>>>({});
  const [status, setStatus] = useState<"idle" | "opened">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(v);
    if (!r.success) {
      const m: any = {};
      r.error.issues.forEach((i) => { const k = String(i.path[0]); m[k] ??= i.message; });
      setErr(m);
      return;
    }
    setErr({});
    const body = `${r.data.message}\n\n— ${r.data.name} (${r.data.email})`;
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(r.data.subject)}&body=${encodeURIComponent(body)}`;
    setStatus("opened");
  };

  const field = (k: keyof F, label: string, type = "text") => (
    <div>
      <label htmlFor={k} className="mb-1.5 block text-sm text-soft">{label}</label>
      {k === "message" ? (
        <textarea id={k} rows={5} value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })} aria-invalid={!!err[k]} aria-describedby={err[k] ? `${k}-e` : undefined}
          className="w-full rounded-xl border border-input bg-pond/60 px-4 py-3 text-ivory placeholder:text-muted-foreground focus:border-sage focus:outline-none" />
      ) : (
        <input id={k} type={type} value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })} aria-invalid={!!err[k]} aria-describedby={err[k] ? `${k}-e` : undefined}
          className="w-full rounded-xl border border-input bg-pond/60 px-4 py-3 text-ivory focus:border-sage focus:outline-none" />
      )}
      {err[k] && <p id={`${k}-e`} role="alert" className="mt-1 text-xs text-destructive">{err[k]}</p>}
    </div>
  );

  return (
    <Section id="contact" className="overflow-hidden">
      <Rose className="pointer-events-none absolute -left-16 bottom-10 hidden w-64 opacity-60 md:block" />
      <LotusLeaf className="pointer-events-none absolute -right-20 top-20 w-60 opacity-20" />
      <SectionHeading eyebrow="Contact" title="Let's Create Something Meaningful" subtitle="Have an idea, a project, or an opportunity to collaborate? I'd love to connect and explore what we can build together." />
      <div className="grid gap-8 md:grid-cols-[1fr_1.4fr]">
        <motion.div {...fadeUp} className="space-y-3">
          {[
            { I: Mail, l: "Email", t: PROFILE.email, h: `mailto:${PROFILE.email}` },
            { I: Github, l: "GitHub", t: "github.com/Khushboo-com", h: PROFILE.github },
            { I: Linkedin, l: "LinkedIn", t: "in/khushboo-varshney", h: PROFILE.linkedin },
          ].map(({ I, l, t, h }) => (
            <a key={l} href={h} {...(l !== "Email" ? ext : {})} className="glass glow-border flex items-center gap-4 rounded-2xl p-5 transition hover:-translate-y-1">
              <span className="rounded-xl bg-teal p-3 text-mint"><I className="h-5 w-5" /></span>
              <span><span className="block text-xs uppercase tracking-widest text-gold">{l}</span><span className="break-all text-ivory">{t}</span></span>
            </a>
          ))}
        </motion.div>
        <motion.form {...fadeUp} onSubmit={submit} noValidate className="glass space-y-4 rounded-3xl p-7">
          <div className="grid gap-4 sm:grid-cols-2">{field("name", "Full Name")}{field("email", "Email Address", "email")}</div>
          {field("subject", "Subject")}
          {field("message", "Message")}
          <button type="submit" className={btnPrimary}><Send className="h-4 w-4" /> Send Message</button>
          <p className="text-xs text-muted-foreground" aria-live="polite">
            {status === "opened"
              ? "Your email app should now open with the message ready — just press send there."
              : "This opens your email app with your message filled in."}
          </p>
        </motion.form>
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <Emblem className="h-12 w-12" />
        <div>
          <p className="font-display text-2xl">Khushboo Varshney</p>
          <p className="mt-1 text-sm text-muted-foreground">Building with curiosity. Designing with intention. Learning continuously.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-5 text-sm text-soft">
          {["home", "about", "projects", "contact"].map((s) => <a key={s} href={`#${s}`} className="capitalize hover:text-blush">{s}</a>)}
          <a href={PROFILE.github} {...ext} className="hover:text-blush">GitHub</a>
          <a href={PROFILE.linkedin} {...ext} className="hover:text-blush">LinkedIn</a>
          <a href={`mailto:${PROFILE.email}`} className="hover:text-blush">Email</a>
        </nav>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Khushboo Varshney. Grown with code & petals.</p>
      </div>
    </footer>
  );
}
