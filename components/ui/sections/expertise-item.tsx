'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ExpertiseItemProps {
    icon: React.ReactNode;
    title: string;
    subheader?: string;
    blurb: string;
    tags?: string[];
}

export function ExpertiseItem({ icon, title, subheader, blurb, tags = [] }: ExpertiseItemProps) {
    return (
        <article
            className={cn(
                'h-full flex flex-col rounded-2xl border border-white/10 bg-background/40 backdrop-blur-sm',
                'p-5 sm:p-6 transition-all'
            )}
            tabIndex={0}
        >
            <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-background/60">
                    {icon}
                </div>
                <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-semibold leading-snug">{title}</h3>
                    {subheader && (
                        <p className="text-sm text-[var(--brand-name)] font-medium mt-0.5">
                            {subheader}
                        </p>
                    )}
                </div>
            </div>

            <p className="mt-4 text-sm text-foreground/80">{blurb}</p>

            <div className="flex-1" />

            {tags.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                    {tags.map((t) => (
                        <li
                            key={t}
                            className="text-[11px] leading-5 px-2.5 rounded-full border border-white/10 text-foreground/70 bg-background/60"
                        >
                            {t}
                        </li>
                    ))}
                </ul>
            )}
        </article>
    );
}
