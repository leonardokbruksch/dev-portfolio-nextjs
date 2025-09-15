'use client';

import * as React from 'react';
import { Monitor, Atom, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ExpertiseCard } from './expertise-card';

export function ExpertiseSection({ className }: { className?: string }) {
    return (
        <section
            className={cn('w-full mx-auto max-w-6xl space-y-10 sm:space-y-12', className)}
        >
            <h2 className="text-center text-4xl sm:text-5xl font-extrabold tracking-tight">
                <span>My&nbsp;</span>
                <span className="text-[var(--brand-name)]">Expertise</span>
                <span className="mx-1 text-[var(--brand-dot)]">.</span>
                <span className="text-[var(--brand-underscore)]">_</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <ExpertiseCard
                    icon={
                        <Monitor className="h-12 w-12 sm:h-14 sm:w-14 lg:h-20 lg:w-20 text-[var(--brand-name)]" />
                    }
                    title="Backend"
                    subtitle="Development"
                    description="Experienced in both functional and OOP: Dart, Python, Java, JavaScript, TypeScript."
                    underlineColor="bg-[var(--brand-underscore)]"
                />

                <ExpertiseCard
                    icon={
                        <Atom className="h-12 w-12 sm:h-14 sm:w-14 lg:h-20 lg:w-20 text-[var(--brand-name)]" />
                    }
                    title="Frontend Dev"
                    subtitle="React, NextJS"
                    description="Passionate about UI/UX. Over 5 years of development experience in HTML, CSS, JS, React and NextJS frameworks."
                    underlineColor="bg-[oklch(0.86_0.12_260)]"
                />

                <ExpertiseCard
                    icon={
                        <Smartphone className="h-12 w-12 sm:h-14 sm:w-14 lg:h-20 lg:w-20 text-[var(--brand-name)]" />
                    }
                    title="React Native"
                    subtitle="Android, iOS"
                    description="Skilled in developing hybrid mobile apps and cross-platform solutions using React Native framework and Expo Tools."
                    underlineColor="bg-[oklch(0.78_0.14_35)]"
                />
            </div>
        </section>
    );
}
