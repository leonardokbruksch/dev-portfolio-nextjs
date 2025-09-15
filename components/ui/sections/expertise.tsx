'use client';

import * as React from 'react';
import { Monitor, Atom, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ExpertiseCard } from './expertise-card';

export function ExpertiseSection({ className }: { className?: string }) {
    return (
        <section
            className={cn(
                'w-full mx-auto max-w-5xl space-y-10 sm:space-y-12', // smaller width
                className
            )}
        >
            <h2 className="text-center text-4xl sm:text-5xl font-extrabold tracking-tight">
                <span>My&nbsp;</span>
                <span className="text-[var(--brand-name)]">Expertise</span>
                <span className="mx-1 text-[var(--brand-dot)]">.</span>
                <span className="text-[var(--brand-underscore)]">_</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mx-auto">
                <ExpertiseCard
                    icon={<Monitor className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 text-[var(--brand-name)]" />}
                    title="Backend"
                    subtitle="Development"
                    description="Experienced in both functional and OOP: Dart, Python, Java, JavaScript, TypeScript."
                    underlineColor="bg-[var(--brand-underscore)]"
                    className="p-5 md:p-6 lg:p-6" // smaller padding
                />
                <ExpertiseCard
                    icon={<Atom className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 text-[var(--brand-name)]" />}
                    title="Frontend Dev"
                    subtitle="React, NextJS"
                    description="Passionate about UI/UX. Over 5 years of development experience in HTML, CSS, JS, React and NextJS frameworks."
                    underlineColor="bg-[oklch(0.86_0.12_260)]"
                    className="p-5 md:p-6 lg:p-6"
                />
                <ExpertiseCard
                    icon={<Smartphone className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 text-[var(--brand-name)]" />}
                    title="React Native"
                    subtitle="Android, iOS"
                    description="Skilled in developing hybrid mobile apps and cross-platform solutions using React Native framework and Expo Tools."
                    underlineColor="bg-[oklch(0.78_0.14_35)]"
                    className="p-5 md:p-6 lg:p-6"
                />
            </div>
        </section>
    );
}

