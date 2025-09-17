'use client';

import { ScrollCue } from '../scroll-cue';
import { TerminalIntro } from '@/components/ui/terminal-intro';
import { Linkedin, FileText, MapPin } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import { JetBrains_Mono } from 'next/font/google';
import { RotatingComputer } from '../retro-computer';

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    weight: ['400', '700'],
});

export function Hero() {
    return (
        <section className="relative grid min-h-screen grid-rows-[1fr_auto] w-full px-6 sm:px-8 pb-[calc(env(safe-area-inset-bottom)+48px)]">
            <div className="place-self-center text-center w-full max-w-5xl">
                <TerminalIntro />
                <div className="pointer-events-none mx-auto -mb-9 sm:-mb-12">
                    <RotatingComputer className="h-28 w-28 sm:h-36 sm:w-36 md:h-44 md:w-44 lg:h-56 lg:w-56" />
                </div>

                <h1 className="mt-6 flex items-center justify-center text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground gap-2">
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

                <p className={`mt-3 text-xl sm:text-3xl font-semibold text-foreground/60 ${jetbrainsMono.className}`}>
                    <Typewriter
                        words={['I like to code stuff.']}
                        loop={0}
                        cursor
                        cursorStyle="|"
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={2000}
                    />
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

                <div className="mt-4 flex items-center justify-center gap-2 text-foreground/60 text-sm sm:text-base">
                    <MapPin className="w-4 h-4" />
                    <span>Brazil</span>
                </div>
            </div>

            <div className="pointer-events-auto flex justify-center pb-2 mb-6 sm:mb-9">
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
