'use client';

import { useEffect, useState } from 'react';
import { Waves, Wind, Compass, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

type SurfData = {
    wave_height: number | null;
    wave_period: number | null;
    wind_speed: number | null;
    wind_direction: number | null;
};

type Spot = {
    name: string;
    latitude: number;
    longitude: number;
};

const spots: Spot[] = [
    { name: 'Uluwatu, Bali', latitude: -8.82, longitude: 115.09 },
    { name: 'Praia do Silveira, Brazil', latitude: -28.05, longitude: -48.62 },
];

export function SurfSection() {
    const [data, setData] = useState<Record<string, SurfData | null>>({});

    useEffect(() => {
        const fetchData = async () => {
            const results: Record<string, SurfData | null> = {};
            await Promise.all(
                spots.map(async (spot) => {
                    try {
                        const [marineRes, weatherRes] = await Promise.all([
                            fetch(
                                `https://marine-api.open-meteo.com/v1/marine?latitude=${spot.latitude}&longitude=${spot.longitude}&hourly=wave_height,wave_period`
                            ),
                            fetch(
                                `https://api.open-meteo.com/v1/forecast?latitude=${spot.latitude}&longitude=${spot.longitude}&hourly=wind_speed_10m,wind_direction_10m`
                            ),
                        ]);

                        const marineJson = await marineRes.json();
                        const weatherJson = await weatherRes.json();

                        results[spot.name] = {
                            wave_height: marineJson?.hourly?.wave_height?.[0] ?? null,
                            wave_period: marineJson?.hourly?.wave_period?.[0] ?? null,
                            wind_speed: weatherJson?.hourly?.wind_speed_10m?.[0] ?? null,
                            wind_direction: weatherJson?.hourly?.wind_direction_10m?.[0] ?? null,
                        };
                    } catch {
                        results[spot.name] = null;
                    }
                })
            );
            setData(results);
        };

        fetchData();
    }, []);

    const format = (val: number | null, unit: string) =>
        val !== null && val !== undefined ? `${val.toFixed(1)} ${unit}` : 'N/A';

    return (
        <section className="mx-auto max-w-5xl px-6 py-20">
            <h2 className="text-center text-2xl sm:text-3xl font-bold mb-6">In my free time I like to surf. 🌊</h2>
            <p className="text-center text-foreground/70 mb-12">
                I&apos;ve added here some API calls to fetch live surf forecast info.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                {spots.map((spot) => (
                    <SurfCard
                        key={spot.name}
                        title={spot.name}
                        waveHeight={data[spot.name]?.wave_height ?? null}
                        wavePeriod={data[spot.name]?.wave_period ?? null}
                        windSpeed={data[spot.name]?.wind_speed ?? null}
                        windDirection={data[spot.name]?.wind_direction ?? null}
                        isLoading={data[spot.name] === undefined}
                    />
                ))}
            </div>

            <p className="mt-10 text-center text-sm text-foreground/50">
                Data powered by Open-Meteo Marine and Open-Meteo Weather.
            </p>
        </section>
    );
}

function Stat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-background/60 px-4 py-3">
            <div className="flex items-center gap-2">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-background/60">
                    {icon}
                </div>
                <span className="text-sm text-foreground/70">{label}</span>
            </div>
            <span className="text-lg font-semibold">{value}</span>
        </div>
    );
}

function SurfCard({
    title,
    waveHeight,
    wavePeriod,
    windSpeed,
    windDirection,
    isLoading,
}: {
    title: string;
    waveHeight: number | null;
    wavePeriod: number | null;
    windSpeed: number | null;
    windDirection: number | null;
    isLoading: boolean;
}) {
    return (
        <article
            className={cn(
                'h-full flex flex-col rounded-2xl border border-white/10 bg-background/40 backdrop-blur-sm p-5 sm:p-6 transition-all'
            )}
            tabIndex={0}
        >
            <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-background/60">
                    <Waves className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-semibold leading-snug">{title}</h3>
                    <p className="text-sm text-[var(--brand-name)] font-medium mt-0.5">Live forecast</p>
                </div>
            </div>

            <div className="mt-4 space-y-3">
                {isLoading ? (
                    <div className="animate-pulse space-y-3">
                        <div className="h-12 rounded-xl bg-foreground/5" />
                        <div className="h-12 rounded-xl bg-foreground/5" />
                        <div className="h-12 rounded-xl bg-foreground/5" />
                    </div>
                ) : (
                    <>
                        <Stat label="Wave Height" value={formatOrNA(waveHeight, 'm')} icon={<Waves className="h-4 w-4" />} />
                        <Stat label="Wave Period" value={formatOrNA(wavePeriod, 's')} icon={<Compass className="h-4 w-4" />} />
                        <div className="rounded-2xl border border-white/10 bg-background/60 p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-background/60">
                                        <Wind className="h-4 w-4" />
                                    </div>
                                    <span className="text-sm text-foreground/70">Wind</span>
                                </div>
                                <span className="text-lg font-semibold">{formatOrNA(windSpeed, 'km/h')}</span>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-foreground/60">
                                    <span>Direction</span>
                                    <span>
                                        {windDirection !== null && windDirection !== undefined
                                            ? degToCompass(windDirection)
                                            : 'N/A'}
                                    </span>
                                </div>
                                {windDirection !== null && windDirection !== undefined ? (
                                    <ArrowUp
                                        aria-label="Wind direction"
                                        className="h-6 w-6 text-foreground/70"
                                        style={{ transform: `rotate(${windDirection}deg)` }}
                                    />
                                ) : (
                                    <div className="h-6 w-6" />
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </article>
    );
}

function formatOrNA(val: number | null, unit: string) {
    if (val === null || val === undefined) return 'N/A';
    return `${val.toFixed(1)} ${unit}`;
}

function degToCompass(deg: number | null | undefined): string {
    if (deg === null || deg === undefined) return 'N/A';
    const directions = [
        'N', 'NNE', 'NE', 'ENE',
        'E', 'ESE', 'SE', 'SSE',
        'S', 'SSW', 'SW', 'WSW',
        'W', 'WNW', 'NW', 'NNW',
    ];
    const index = Math.round(deg / 22.5) % 16;
    return directions[index];
}