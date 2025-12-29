import React, { useRef, useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
  delay?: number; // milliseconds
  className?: string;
};

export const AnimatedSection: React.FC<Props> = ({ children, delay = 0, className }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      // avoid synchronous setState inside an effect to prevent cascading renders
      setTimeout(() => setVisible(true), 0);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisible(true), delay);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(12px)",
        transition: "opacity 600ms ease, transform 600ms cubic-bezier(.2,.9,.2,1)",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
