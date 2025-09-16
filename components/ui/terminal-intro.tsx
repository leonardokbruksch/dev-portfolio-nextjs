'use client';

import * as React from 'react';

type Phase = 'typing' | 'running' | 'done';

export function TerminalIntro({
    command = 'npx create-portfolio leobruksch',
    onDone,
    storageKey = 'portfolio:introSeen',
}: {
    command?: string;
    onDone?: () => void;
    storageKey?: string;
}) {
    const [visible, setVisible] = React.useState(false);
    const [phase, setPhase] = React.useState<Phase>('typing');
    const [typed, setTyped] = React.useState('');
    const [lines, setLines] = React.useState<string[]>([]);
    const [fade, setFade] = React.useState(false);

    React.useEffect(() => {
        const seen = typeof window !== 'undefined' && window.localStorage.getItem(storageKey);
        if (!seen) setVisible(true);
    }, [storageKey]);

    React.useEffect(() => {
        if (!visible) return;
        let i = 0;
        const id = window.setInterval(() => {
            i += 1;
            setTyped(command.slice(0, i));
            if (i >= command.length) {
                window.clearInterval(id);
                setPhase('running');
            }
        }, 40);
        return () => window.clearInterval(id);
    }, [visible, command]);

    React.useEffect(() => {
        if (phase !== 'running') return;
        const steps = [
            'Installing dependencies',
            'Scaffolding files',
            'Setting up linting and formatting',
            'Configuring API routes',
            'Optimizing images and fonts',
            'Deploying preview',
            'Done in 1.8s',
        ];
        let idx = 0;
        setLines([]);
        const id = window.setInterval(() => {
            setLines((prev) => [...prev, steps[idx]]);
            idx += 1;
            if (idx >= steps.length) {
                window.clearInterval(id);
                setTimeout(() => {
                    setFade(true);
                    setTimeout(() => {
                        window.localStorage.setItem(storageKey, '1');
                        setVisible(false);
                        onDone?.();
                    }, 350);
                }, 400);
            }
        }, 380);
        return () => window.clearInterval(id);
    }, [phase, storageKey, onDone]);

    if (!visible) return null;

    return (
        <div className={`fixed inset-0 z-[60] flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity ${fade ? 'opacity-0' : 'opacity-100'}`}>
            <div className="w-[min(880px,92vw)] rounded-2xl border border-border/70 bg-background/90 shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border/60">
                    <span className="h-3 w-3 rounded-full bg-[oklch(0.69_0.21_30)]"></span>
                    <span className="h-3 w-3 rounded-full bg-[oklch(0.79_0.21_120)]"></span>
                    <span className="h-3 w-3 rounded-full bg-[oklch(0.74_0.22_20)]"></span>
                    <span className="ml-2 text-xs text-foreground/60">portfolio@leo</span>
                </div>
                <div className="px-5 py-6 sm:px-6 sm:py-7 font-mono text-sm sm:text-[15px] leading-6 text-foreground">
                    <div className="mb-3">
                        <span className="text-[var(--brand-name)]">➜</span>{' '}
                        <span className="text-foreground/80">{typed}</span>
                        {phase === 'typing' && <span className="ml-0.5 inline-block h-[1em] w-[0.5ch] translate-y-[1px] bg-foreground/80 animate-[blink_1.1s_steps(1)_infinite]"></span>}
                    </div>
                    <div className="space-y-1.5">
                        {lines.map((l, i) => (
                            <div key={`${l}-${i}`} className="flex items-center gap-2">
                                {i < lines.length - 1 ? (
                                    <span className="h-3 w-3 animate-[spin_1s_linear_infinite] rounded-full border-2 border-foreground/30 border-t-foreground/80"></span>
                                ) : (
                                    <span className="text-emerald-400">✔</span>
                                )}
                                <span className={i === lines.length - 1 ? 'text-foreground' : 'text-foreground/80'}>{l}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                        <span className="text-xs text-foreground/60">Press Esc to skip</span>
                        <button
                            onClick={() => {
                                setFade(true);
                                setTimeout(() => {
                                    window.localStorage.setItem(storageKey, '1');
                                    setVisible(false);
                                    onDone?.();
                                }, 300);
                            }}
                            className="rounded-md border border-border bg-background px-3 py-1.5 text-xs text-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                            Skip
                        </button>
                    </div>
                </div>
            </div>
            <style jsx>{`
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
            <div
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                        setFade(true);
                        setTimeout(() => {
                            window.localStorage.setItem(storageKey, '1');
                            setVisible(false);
                            onDone?.();
                        }, 300);
                    }
                }}
                className="sr-only"
            />
        </div>
    );
}
