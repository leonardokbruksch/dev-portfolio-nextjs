'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
    return <span className={cn('pill', className)}>{children}</span>;
}

export function PillList({ items, className }: { items?: string[]; className?: string }) {
    if (!items?.length) return null;
    return (
        <ul className={cn('pill-list', className)}>
            {items.map((t) => (
                <li key={t}>
                    <Pill>{t}</Pill>
                </li>
            ))}
        </ul>
    );
}
