"use client";

import { Linkedin, FileText, Hammer } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full mt-20">
            <div className="mx-auto max-w-5xl px-6 py-16 text-center space-y-10">
                <h2 className="flex items-center justify-center gap-3 text-xl sm:text-2xl font-semibold text-foreground/80">
                    Let’s build something great together!
                    <Hammer className="w-6 h-6 text-foreground/70" />
                </h2>

                <a
                    href="mailto:leonardo.bruksch@gmail.com"
                    className="block text-2xl sm:text-3xl font-bold underline underline-offset-4 decoration-purple-500 hover:decoration-purple-400 transition-colors"
                >
                    leonardo.bruksch@gmail.com
                </a>

                <div className="flex items-center justify-center gap-8 text-foreground/70">
                    <a
                        href="https://www.linkedin.com/in/leonardo-bruksch-65246198/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground transition-colors"
                    >
                        <Linkedin className="w-7 h-7" />
                    </a>
                    <a
                        href="/Leonardo-Bruksch-CV.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground transition-colors flex items-center gap-2"
                    >
                        <FileText className="w-6 h-6" />
                        <span className="text-sm font-medium">CV</span>
                    </a>
                </div>
            </div>

            <div className="py-6 text-center text-xs text-foreground/50">
                © {new Date().getFullYear()} Leonardo Krummenauer Bruksch. Built with Next.js, Tailwind, and shadcn/ui.
            </div>
        </footer>
    );
}
