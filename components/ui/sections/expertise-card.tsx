'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ExpertiseCardProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    description: string;
    underlineColor?: string;
    className?: string;
}

export function ExpertiseCard({
    icon,
    title,
    subtitle,
    description,
    underlineColor = 'bg-[var(--brand-underscore)]',
    className,
}: ExpertiseCardProps) {
    return (
        <div
            className={cn(
                'rounded-2xl border-[0.5px] p-6 md:p-8 bg-background/40 backdrop-blur-sm',
                className
            )}
        >
            <div className="flex items-center gap-5">
                <div className="flex-shrink-0">{icon}</div>
                <div className="space-y-3">
                    <h3 className="text-2xl font-bold leading-tight">
                        <span className="relative inline-block">
                            <span className="mr-2">{title}</span>
                            <span
                                className={cn(
                                    'absolute left-0 -bottom-1 h-1 w-20 rounded-full',
                                    underlineColor
                                )}
                            />
                        </span>
                        <br />
                        <span>{subtitle}</span>
                    </h3>
                    <p className="text-foreground/80">{description}</p>
                </div>
            </div>
        </div>
    );
}
