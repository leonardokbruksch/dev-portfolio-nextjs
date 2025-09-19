"use client";

import AmaChat from "./ama-chat";

export function AskMeAnythingSection() {
    return (
        <section className="mx-auto w-full max-w-5xl">
            <header className="mb-6">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Ask Me Anything</h2>
                <p className="text-sm text-foreground/60">Chat with an AI that knows my background and projects.</p>
            </header>
            <AmaChat />
        </section>
    );
}
