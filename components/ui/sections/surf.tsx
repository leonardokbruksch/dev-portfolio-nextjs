'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

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

            for (const spot of spots) {
                try {
                    // Marine API (wave data)
                    const marineRes = await fetch(
                        `https://marine-api.open-meteo.com/v1/marine?latitude=${spot.latitude}&longitude=${spot.longitude}&hourly=wave_height,wave_period`
                    );
                    const marineJson = await marineRes.json();

                    // Weather API (wind data)
                    const weatherRes = await fetch(
                        `https://api.open-meteo.com/v1/forecast?latitude=${spot.latitude}&longitude=${spot.longitude}&hourly=wind_speed_10m,wind_direction_10m`
                    );
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
            }

            setData(results);
        };

        fetchData();
    }, []);

    const format = (val: number | null, unit: string) =>
        val !== null && val !== undefined ? `${val.toFixed(1)} ${unit}` : 'N/A';

    return (
        <section className="mx-auto max-w-5xl px-6 py-20 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                In my free time I like to surf. 🌊
            </h2>
            <p className="text-foreground/70 mb-12">
                I&apos;ve added here some API calls to fetch live surf forecast info.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {spots.map((spot) => (
                    <div
                        key={spot.name}
                        className="rounded-2xl border p-6 shadow-sm flex flex-col items-center"
                    >
                        <h3 className="text-xl font-semibold mb-4">{spot.name}</h3>
                        {data[spot.name] ? (
                            <div className="space-y-4">
                                <div>
                                    <p className="text-lg font-medium">Wave Height</p>
                                    <p className="text-2xl">
                                        {format(data[spot.name]?.wave_height ?? null, 'm')}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-lg font-medium">Wave Period</p>
                                    <p className="text-2xl">
                                        {format(data[spot.name]?.wave_period ?? null, 's')}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-lg font-medium">Wind</p>
                                    <div className="flex items-center justify-center gap-3">
                                        <p className="text-2xl">
                                            {format(data[spot.name]?.wind_speed ?? null, 'km/h')}
                                        </p>
                                        {data[spot.name]?.wind_direction !== null && (
                                            <ArrowUp
                                                className="w-6 h-6 text-foreground/70"
                                                style={{
                                                    transform: `rotate(${data[spot.name]!.wind_direction}deg)`,
                                                }}
                                            />
                                        )}
                                    </div>
                                    <p className="text-sm text-foreground/50">
                                        {data[spot.name]?.wind_direction?.toFixed(0)}°
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-foreground/50">Loading forecast…</p>
                        )}
                    </div>
                ))}
            </div>

            <p className="mt-10 text-sm text-foreground/50">
                Data powered by a combination of the Open-Meteo Marine API and the
                Open-Meteo Weather API.
            </p>
        </section>
    );
}
