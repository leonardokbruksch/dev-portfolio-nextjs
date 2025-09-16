"use client";

import { motion } from "framer-motion";

export function ScrollCue({ target = "#about" }: { target?: string }) {

    const handleClick = () => {
        const el = document.querySelector(target);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };
    return (
        <button
            onClick={handleClick}
            aria-label="Scroll to next section"
            className="group relative inline-flex flex-col items-center justify-center outline-none"
        >
            <div className="relative h-14 w-9 rounded-full border border-white/60 bg-white/5 backdrop-blur-sm transition-all duration-300 group-hover:border-white/80">
                <motion.span
                    className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/90"
                    initial={{ y: -6, opacity: 0.7 }}
                    animate={{ y: 8, opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <motion.svg
                viewBox="0 0 24 24"
                className="mt-3 h-5 w-5 text-purple-400 transition-colors group-hover:text-purple-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                initial={{ y: -2, opacity: 0.8 }}
                animate={{ y: [0, 3, 0], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
                <path d="M12 5v14" />
                <path d="M19 12l-7 7-7-7" />
            </motion.svg>
        </button>
    );
}
