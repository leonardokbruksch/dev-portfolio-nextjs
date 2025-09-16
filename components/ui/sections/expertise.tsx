'use client';

import * as React from 'react';
import { Monitor, Atom, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ExpertiseItem } from './expertise-item';

export function ExpertiseSection({ className }: { className?: string }) {
    return (
        <section
            className={cn(
                'w-full mx-auto max-w-5xl space-y-8 sm:space-y-10',
                className
            )}
            aria-labelledby="expertise-heading"
        >
            <h2 id="expertise-heading" className="text-center text-4xl sm:text-5xl font-extrabold tracking-tight">
                <span>My&nbsp;</span>
                <span className="text-[var(--brand-name)]">Expertise</span>
                <span className="mx-1 text-[var(--brand-dot)]">.</span>
                <span className="text-[var(--brand-underscore)]">_</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 items-stretch [grid-auto-rows:1fr] gap-5 sm:gap-6">
                <ExpertiseItem
                    icon={<Monitor className="h-8 w-8 text-[var(--brand-name)]" />}
                    title="Backend"
                    subheader="Witchcraft"
                    blurb="Summoning APIs and services from the void, with strong typing, testing rituals, and observability spells."
                    tags={['Python', 'TypeScript', 'Node', 'REST', 'Microservices', 'AWS']}
                />

                <ExpertiseItem
                    icon={<Atom className="h-8 w-8 text-[var(--brand-name)]" />}
                    title="Frontend"
                    subheader="Pixel Wrangler"
                    blurb="Wrangling React, Next.js, and CSS so users can click buttons without rage-quitting."
                    tags={['Next.js', 'React', 'Zod', 'Tailwind', 'shadcn/ui']}
                />

                <ExpertiseItem
                    icon={<Smartphone className="h-8 w-8 text-[var(--brand-name)]" />}
                    title="Mobile"
                    subheader="Tap Tap Apps"
                    blurb="Cross-platform wizardry with React Native and Expo. Runs smooth on iOS, Android, and occasionally your fridge."
                    tags={['React Native', 'Expo', 'TypeScript', 'Firebase', 'Google Maps API']}
                />

            </div>
        </section>
    );
}
