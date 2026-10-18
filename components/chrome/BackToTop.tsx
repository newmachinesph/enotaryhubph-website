"use client";

import { useEffect, useState } from "react";

const SHOW_AFTER_PX = 560;

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`gather bg-narra text-pearl hover:bg-sun hover:text-night fixed right-4 bottom-4 z-40 flex h-11 w-11 items-center justify-center shadow-lg transition-[opacity,visibility] duration-200 sm:right-5 sm:bottom-5 md:right-8 md:bottom-8 ${
        visible ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <span aria-hidden="true" className="text-lg leading-none">
        ↑
      </span>
    </button>
  );
}
