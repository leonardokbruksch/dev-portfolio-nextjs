"use client";

import { Typewriter } from "react-simple-typewriter";
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export function Hero() {
    return (
        <section className="flex h-[70vh] w-full items-center justify-center text-center">
            <h1
                className={`text-4xl sm:text-6xl md:text-7xl font-bold text-foreground ${jetbrainsMono.className}`}
            >
                Leo can code{" "}
                <Typewriter
                    words={[
                        "Python .",
                        "TypeScript .",
                        "Java .",
                        "HTML .",
                        "CSS .",
                    ]}
                    loop={0}
                    cursor
                    cursorStyle="|"
                    typeSpeed={50}
                    deleteSpeed={60}
                    delaySpeed={500}
                />
            </h1>
        </section>
    );
}
