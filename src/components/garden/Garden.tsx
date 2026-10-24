import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { LotusLeaf, Petal, Rose } from "./Botanicals";

const LEAVES = [
  { x: "6%", y: "18%", s: 150, d: 14, depth: 30, o: 0.55, r: 12 },
  { x: "78%", y: "12%", s: 110, d: 18, depth: 18, o: 0.4, r: -20 },
  { x: "86%", y: "62%", s: 190, d: 22, depth: 40, o: 0.5, r: 40 },
  { x: "14%", y: "74%", s: 90, d: 16, depth: 14, o: 0.35, r: -60 },
  { x: "52%", y: "86%", s: 130, d: 20, depth: 24, o: 0.3, r: 80 },
  { x: "40%", y: "6%", s: 70, d: 12, depth: 10, o: 0.25, r: 140 },
];

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(max-width: 768px)");
    setM(q.matches);
    const f = () => setM(q.matches);
    q.addEventListener("change", f);
    return () => q.removeEventListener("change", f);
  }, []);
  return m;
}

export function Garden() {
  const reduce = useReducedMotion();
  const mobile = useIsMobile();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const { scrollY } = useScroll();
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    if (mobile || reduce) return;
    const f = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", f, { passive: true });
    return () => window.removeEventListener("pointermove", f);
  }, [mobile, reduce, mx, my]);

  useEffect(() => {
    if (reduce) return;
    const f = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a,button,input,textarea,label,select")) return;
      const id = Date.now() + Math.random();
      setRipples((r) => [...r.slice(-3), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples((r) => r.filter((p) => p.id !== id)), 1600);
    };
    window.addEventListener("pointerdown", f);
    return () => window.removeEventListener("pointerdown", f);
  }, [reduce]);

  const leaves = mobile ? LEAVES.slice(0, 3) : LEAVES;
  const roseX = useTransform(sx, (v) => v * -20);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* ambient ripples */}
      {!reduce && [0, 1, 2].map((i) => (
        <motion.span key={i} className="absolute left-[30%] top-[40%] h-40 w-40 rounded-full border border-sage/20"
          initial={{ scale: 0.4, opacity: 0.5 }} animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 9, repeat: Infinity, delay: i * 3, ease: "easeOut" }} />
      ))}
      {leaves.map((l, i) => (
        <Leaf key={i} l={l} sx={sx} sy={sy} scrollY={scrollY} reduce={!!reduce} />
      ))}
      {!mobile && (
        <motion.div className="absolute -right-10 top-[30%] w-40 opacity-30"
          style={{ x: roseX }}>
          <Rose className="w-full" />
        </motion.div>
      )}
      {!reduce && Array.from({ length: mobile ? 3 : 6 }).map((_, i) => (
        <motion.div key={i} className="absolute -top-10 w-5" style={{ left: `${10 + i * 15}%` }}
          animate={{ y: ["0vh", "110vh"], x: [0, 40, -30, 20], rotate: [0, 180, 320], opacity: [0, 0.8, 0.8, 0] }}
          transition={{ duration: 20 + i * 4, repeat: Infinity, delay: i * 5, ease: "linear" }}>
          <Petal className="w-full" />
        </motion.div>
      ))}
      {ripples.map((r) => (
        <span key={r.id} className="absolute" style={{ left: r.x, top: r.y }}>
          {[0, 0.25].map((d) => (
            <motion.span key={d} className="absolute -left-4 -top-4 h-8 w-8 rounded-full border border-aqua/60"
              initial={{ scale: 0.2, opacity: 0.8 }} animate={{ scale: 5, opacity: 0 }}
              transition={{ duration: 1.4, delay: d, ease: "easeOut" }} />
          ))}
        </span>
      ))}
    </div>
  );
}

function Leaf({ l, sx, sy, scrollY, reduce }: any) {
  const px = useTransform(sx, (v: number) => v * l.depth);
  const py = useTransform(sy, (v: number) => v * l.depth);
  const sc = useTransform(scrollY, (v: number) => -v * (l.depth / 300));
  const y = useTransform([py, sc], (v: any[]) => (v[0] as number) + (v[1] as number));
  return (
    <motion.div className="absolute" style={{ left: l.x, top: l.y, width: l.s, opacity: l.o, x: px, y }}>
      <motion.div
        animate={reduce ? {} : { x: [0, 14, -10, 0], y: [0, -10, 6, 0], rotate: [l.r, l.r + 8, l.r - 6, l.r] }}
        transition={{ duration: l.d, repeat: Infinity, ease: "easeInOut" }}>
        <LotusLeaf className="w-full drop-shadow-2xl" />
      </motion.div>
    </motion.div>
  );
}
