"use client";

import { ScrollCue } from "../scroll-cue";

export function Hero() {
    return (
        <section className="relative flex h-[60vh] min-h-[420px] w-full items-center">
            <div className="mx-auto w-full max-w-5xl px-6 sm:px-8">
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground gap">
                    <span>Hey, I’m </span>
                    <span className="text-[var(--brand-name)]">Leo</span>
                    <span
                        aria-hidden
                        className="inline-block select-none align-[0.1em]"
                        style={{ animation: "wave 1.8s ease-in-out 0s infinite" }}
                    >
                        {" "}
                        👋
                    </span>
                </h1>
                <p className="mt-3 text-xl sm:text-3xl font-semibold text-foreground/60">
                    A full-stack web and mobile software developer.
                </p>
            </div>
            <div className="pointer-events-auto absolute inset-x-0 bottom-6 flex justify-center">
                <ScrollCue target="#about" />
            </div>
            <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          15% { transform: rotate(14deg); }
          30% { transform: rotate(-8deg); }
          45% { transform: rotate(14deg); }
          60% { transform: rotate(-4deg); }
          75% { transform: rotate(10deg); }
        }
      `}</style>
        </section>
    );
}
