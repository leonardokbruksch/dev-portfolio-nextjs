'use client';

import { useEffect, useState } from 'react';
import { Waves, Wind, Compass, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TideBlock } from '../surf-tide';

type SurfData = {
    wave_height: number | null;
    wave_period: number | null;
    wind_speed: number | null;
    wind_direction: number | null;
    sea_level_now: number | null;
    sea_level_series: number[] | null;
    sea_level_times: number[] | null;
    timezone: string | null;
};

type Spot = { name: string; latitude: number; longitude: number };

const spots: Spot[] = [
    { name: 'Uluwatu, Bali', latitude: -8.82, longitude: 115.09 },
    { name: 'Praia do Silveira, Brazil', latitude: -28.05, longitude: -48.62 },
];

const nearestIdx = (times: number[] | null | undefined) => {
    if (!times || !times.length) return 0;
    const now = Math.floor(Date.now() / 1000);
    let best = 0;
    let bestDiff = Infinity;
    for (let i = 0; i < times.length; i++) {
        const d = Math.abs(times[i] - now);
        if (d < bestDiff) {
            bestDiff = d;
            best = i;
        }
    }
    return best;
};

export function SurfSection() {
    const [data, setData] = useState<Record<string, SurfData | null>>({});

    useEffect(() => {
        const fetchData = async () => {
            const results: Record<string, SurfData | null> = {};
            await Promise.all(
                spots.map(async (spot) => {
                    try {
                        const marineUrl = `https://marine-api.open-meteo.com/v1/marine?latitude=${spot.latitude}&longitude=${spot.longitude}&hourly=wave_height,wave_period,sea_level_height_msl&past_hours=24&forecast_hours=48&cell_selection=sea&timezone=auto&timeformat=unixtime`;
                        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${spot.latitude}&longitude=${spot.longitude}&hourly=wind_speed_10m,wind_direction_10m&past_hours=24&forecast_hours=48&timezone=auto&timeformat=unixtime`;

                        const [marineRes, weatherRes] = await Promise.all([fetch(marineUrl), fetch(weatherUrl)]);
                        const marineJson = await marineRes.json();
                        const weatherJson = await weatherRes.json();

                        const mTimes: number[] | null = marineJson?.hourly?.time ?? null;
                        const wTimes: number[] | null = weatherJson?.hourly?.time ?? null;

                        const mi = nearestIdx(mTimes);
                        const wi = nearestIdx(wTimes);

                        results[spot.name] = {
                            wave_height: marineJson?.hourly?.wave_height?.[mi] ?? null,
                            wave_period: marineJson?.hourly?.wave_period?.[mi] ?? null,
                            wind_speed: weatherJson?.hourly?.wind_speed_10m?.[wi] ?? null,
                            wind_direction: weatherJson?.hourly?.wind_direction_10m?.[wi] ?? null,
                            sea_level_now: marineJson?.hourly?.sea_level_height_msl?.[mi] ?? null,
                            sea_level_series: marineJson?.hourly?.sea_level_height_msl ?? null,
                            sea_level_times: mTimes,
                            timezone: marineJson?.timezone ?? weatherJson?.timezone ?? null,
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

    return (
        <section className="mx-auto w-full max-w-5xl">
            <h2 className="text-center text-2xl sm:text-3xl font-bold mb-6">In my free time I like to surf. 🌊</h2>
            <p className="text-center text-foreground/70 mb-12">Live surf, wind, and tide info, fetched from Open-Meteo Marine + Open-Meteo Weather API.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 w-full">
                {spots.map((spot) => (
                    <SurfCard
                        key={spot.name}
                        title={spot.name}
                        d={data[spot.name]}
                        isLoading={data[spot.name] === undefined}
                    />
                ))}
            </div>
            <p className="mt-10 text-center text-sm text-foreground/50">Data: Open-Meteo Marine + Open-Meteo Weather.</p>
        </section>
    );
}

function SurfCard({ title, d, isLoading }: { title: string; d: SurfData | null | undefined; isLoading: boolean }) {
    const waveHeight = d?.wave_height ?? null;
    const wavePeriod = d?.wave_period ?? null;
    const windSpeed = d?.wind_speed ?? null;
    const windDirection = d?.wind_direction ?? null;
    const tz = d?.timezone ?? null;
    const localNow = fmtHuman(tz);

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
                    <p className="text-sm text-[var(--brand-name)] font-medium mt-0.5">
                        Live forecast • {localNow}
                    </p>
                </div>
            </div>

            <div className="mt-4 space-y-3">
                {isLoading ? (
                    <div className="animate-pulse space-y-3">
                        <div className="h-12 rounded-xl bg-foreground/5" />
                        <div className="h-12 rounded-xl bg-foreground/5" />
                        <div className="h-12 rounded-xl bg-foreground/5" />
                        <div className="h-24 rounded-xl bg-foreground/5" />
                    </div>
                ) : (
                    <>
                        <Stat label="Wave Height" value={formatOrNA(waveHeight, 'm')} icon={<Waves className="h-4 w-4" />} />
                        <Stat label="Wave Period" value={formatOrNA(wavePeriod, 's')} icon={<Compass className="h-4 w-4" />} />
                        <WindBlock windSpeed={windSpeed} windDirection={windDirection} />
                        <TideBlock
                            now={d?.sea_level_now ?? null}
                            series={d?.sea_level_series ?? null}
                            times={d?.sea_level_times ?? null}
                            timezone={tz}
                        />
                    </>
                )}
            </div>
        </article>
    );
}

function WindBlock({ windSpeed, windDirection }: { windSpeed: number | null; windDirection: number | null }) {
    return (
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
                    <span>{windDirection != null ? degToCompass(windDirection) : 'N/A'}</span>
                </div>
                {windDirection != null ? (
                    <ArrowUp aria-label="Wind direction" className="h-6 w-6 text-foreground/70" style={{ transform: `rotate(${windDirection}deg)` }} />
                ) : (
                    <div className="h-6 w-6" />
                )}
            </div>
        </div>
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

export function formatOrNA(val: number | null, unit: string) {
    if (val === null || val === undefined) return 'N/A';
    return `${val.toFixed(1)} ${unit}`;
}

function degToCompass(deg: number | null | undefined): string {
    if (deg === null || deg === undefined) return 'N/A';
    const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const i = Math.round((deg % 360) / 22.5) % 16;
    return dirs[i];
}


const fmtHuman = (tz: string | null) => {
    const d = new Date();
    const parts = new Intl.DateTimeFormat(undefined, {
        timeZone: tz || undefined,
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).formatToParts(d);
    const get = (t: Intl.DateTimeFormatPartTypes) => parts.find(p => p.type === t)?.value ?? '';
    return `${get('weekday')}, ${get('day')} ${get('month')} ${get('year')} • ${get('hour')}:${get('minute')}`;
};