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
            <div className="flex items-start gap-5">
                <div className="flex-shrink-0 pt-1">{icon}</div>
                <div className="space-y-3">
                    <h3 className="text-2xl font-bold leading-tight">
                        <span
                            className={cn(
                                "bg-[length:100%_0.4em] bg-no-repeat bg-left-bottom",
                                "box-decoration-clone",
                                underlineColor
                            )}
                        >
                            {title}
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
