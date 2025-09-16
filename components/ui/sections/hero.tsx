
"use client";

import { Typewriter } from "react-simple-typewriter";
import { JetBrains_Mono } from "next/font/google";
import { ScrollCue } from "../scroll-cue";

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export function Hero() {
    return (
        <section className="relative flex h-[70vh] w-full items-center justify-center text-center">
            <h1
                className={`text-3xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight ${jetbrainsMono.className}`}
            >
                Leo can code{" "}
                <Typewriter
                    words={[
                        "Next.js web apps.",
                        "React Native mobile apps.",
                        "Event-driven microservices.",
                        "AWS cloud infrastructure.",
                        "REST APIs.",
                        "IoT integrations.",
                    ]}
                    loop={0}
                    cursor
                    cursorStyle="|"
                    typeSpeed={50}
                    deleteSpeed={60}
                    delaySpeed={1200}
                />
            </h1>

            <div className="pointer-events-auto absolute inset-x-0 bottom-6 flex justify-center">
                <ScrollCue target="#about" />
            </div>
        </section>
    );
}
