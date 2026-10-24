import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "motion/react";
import { Garden } from "@/components/garden/Garden";
import { Nav } from "@/components/garden/Nav";
import { About, Beyond, Hero, Journey, Projects, Skills } from "@/components/garden/Sections";
import { Contact, Footer } from "@/components/garden/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Khushboo Varshney — Backend Developer & Creative Technologist" },
      { name: "description", content: "Portfolio of Khushboo Varshney: backend developer, Python & C programmer, UI/UX designer and project leader." },
      { property: "og:title", content: "Khushboo Varshney — Lotus & Rose Portfolio" },
      { property: "og:description", content: "Backend developer, programmer and UI/UX designer building thoughtful digital experiences." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <MotionConfig reducedMotion="user">
      <Garden />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Beyond />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
