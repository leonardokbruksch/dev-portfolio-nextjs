'use client';

import { ScrollCue } from '../scroll-cue';
import { TerminalIntro } from '@/components/ui/terminal-intro';
import { Linkedin, FileText } from 'lucide-react';
import { RotatingComputer } from '../models/computer';

export function Hero() {
    return (
        <section className="relative flex h-[60vh] min-h-[420px] w-full items-center">
            <TerminalIntro />

            <div className="pointer-events-none absolute inset-x-0 -top-4 sm:-top-6 flex justify-center">
                <RotatingComputer className="h-48 w-48 sm:h-64 sm:w-64 md:h-80 md:w-80 lg:h-96 lg:w-96" />


            </div>

            <div className="mx-auto w-full max-w-5xl px-6 sm:px-8 text-center pt-16 sm:pt-20 md:pt-24">
                <h1 className="relative z-10 flex items-center justify-center text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground gap-2">
                    <span>Hey, I’m</span>
                    <span className="text-[var(--brand-name)]">Leo</span>
                    <span
                        aria-hidden
                        className="inline-block select-none align-[0.1em]"
                        style={{ animation: 'wave 1.8s ease-in-out 0s infinite' }}
                    >
                        👋
                    </span>
                </h1>

                <p className="mt-3 text-xl sm:text-3xl font-semibold text-foreground/60">
                    I like to code stuff.
                </p>

                <div className="mt-6 flex items-center justify-center gap-3 text-foreground/70 text-base sm:text-lg">
                    <a
                        href="https://www.linkedin.com/in/leonardo-bruksch-65246198/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground transition-colors flex items-center gap-2"
                    >
                        <Linkedin className="w-5 h-5" />
                        <span className="font-medium">LinkedIn</span>
                    </a>
                    <span>|</span>
                    <a
                        href="/Leonardo-Bruksch-CV.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground transition-colors flex items-center gap-2"
                    >
                        <FileText className="w-5 h-5" />
                        <span className="font-medium">CV</span>
                    </a>
                </div>
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
