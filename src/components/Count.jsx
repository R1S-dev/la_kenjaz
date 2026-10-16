import { useEffect, useRef, useState } from "react";
import { fmt } from "../analytics";
export default function Count({ value, decimals = 0 }) {
  const ref = useRef(null),
    [number, setNumber] = useState(0);
  useEffect(() => {
    let frame;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setNumber(value);
          return;
        }
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / 1500, 1);
          setNumber(value * (1 - Math.pow(1 - p, 4)));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.25 },
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);
  return (
    <span ref={ref} aria-label={fmt(value, decimals)}>
      {fmt(number, decimals)}
    </span>
  );
}
