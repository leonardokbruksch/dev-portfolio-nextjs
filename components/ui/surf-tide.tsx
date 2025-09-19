import { ArrowDown, ArrowUp, Waves } from "lucide-react";
import { useMemo } from "react";
import { formatOrNA } from "./sections/surf";

const CIRCLE_R = 4;
const LABEL_PAD = 12;
const LINE_GAP = "1.1em";

export function TideBlock({
    now,
    series,
    times,
    timezone,
}: {
    now: number | null;
    series: number[] | null;
    times: number[] | null;
    timezone: string | null;
}) {
    const points = useMemo(() => {
        if (!series || !times || series.length !== times.length) return null;
        return series.map((y, i) => ({ t: times[i], y, i }));
    }, [series, times]);

    const windowed = useMemo(() => {
        if (!points) return null;
        const nowSec = Math.floor(Date.now() / 1000);
        let nowIdx = 0;
        let best = Infinity;
        for (let i = 0; i < points.length; i++) {
            const d = Math.abs(points[i].t - nowSec);
            if (d < best) {
                best = d;
                nowIdx = i;
            }
        }
        const extrema: { i: number; type: 'high' | 'low' }[] = [];
        for (let i = 1; i < points.length - 1; i++) {
            const p = points[i - 1].y, c = points[i].y, n = points[i + 1].y;
            if (c > p && c > n) extrema.push({ i, type: 'high' });
            if (c < p && c < n) extrema.push({ i, type: 'low' });
        }
        const prev = [...extrema].reverse().find((e) => e.i < nowIdx) ?? { i: Math.max(0, nowIdx - 6), type: 'low' as const };
        const next = extrema.find((e) => e.i > nowIdx) ?? { i: Math.min(points.length - 1, nowIdx + 6), type: 'low' as const };
        const start = Math.max(0, prev.i);
        const end = Math.min(points.length - 1, next.i);
        const slice = points.slice(start, end + 1);
        return { slice, start, end, prev, next, nowIdxRel: nowIdx - start };
    }, [points]);

    const chart = useMemo(() => {
        if (!windowed) return null;
        const pts = windowed.slice;
        const w = 360, h = 120;
        const pad = { left: 16, right: 16, top: 28, bottom: 24 };
        const ys = pts.map((p) => p.y);
        const min = Math.min(...ys);
        const max = Math.max(...ys);
        const range = max - min || 1;
        const x = (i: number) => pad.left + (i / (pts.length - 1)) * (w - pad.left - pad.right);
        const y = (v: number) => h - pad.bottom - ((v - min) / range) * (h - pad.top - pad.bottom);
        const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(p.y)}`).join(' ');
        const area = `M ${x(0)} ${h - pad.bottom} ${pts.map((p, i) => `L ${x(i)} ${y(p.y)}`).join(' ')} L ${x(pts.length - 1)} ${h - pad.bottom} Z`;
        return { w, h, pad, x, y, d, area };
    }, [windowed]);

    if (!points || !windowed || !chart) {
        return (
            <div className="rounded-2xl border border-white/10 bg-background/60 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-background/60">
                            <Waves className="h-4 w-4" />
                        </div>
                        <span className="text-sm text-foreground/70">Tide</span>
                    </div>
                    <span className="text-lg font-semibold">{formatOrNA(now, 'm')}</span>
                </div>
                <div className="mt-3 h-24 flex items-center justify-center text-sm text-foreground/50">No tide data</div>
            </div>
        );
    }

    const pts = windowed.slice;
    const prevLabel = { idx: windowed.prev.i - windowed.start, t: points[windowed.prev.i].t, y: points[windowed.prev.i].y };
    const nextLabel = { idx: windowed.next.i - windowed.start, t: points[windowed.next.i].t, y: points[windowed.next.i].y };
    const nowIdxRel = Math.max(0, Math.min(pts.length - 1, windowed.nowIdxRel));
    const nowPt = pts[nowIdxRel];

    const trendIcon =
        series && series.length >= 2
            ? series[Math.min(series.length - 1, nowIdxRel + 1 + windowed.start)] >
                series[Math.max(0, nowIdxRel + windowed.start - 1)]
                ? <ArrowUp className="h-5 w-5" />
                : <ArrowDown className="h-5 w-5" />
            : null;

    const textY = (v: number) => Math.max(12, chart.y(v) - 8);
    const fmtTime = (sec: number, tz?: string | null) =>
        new Intl.DateTimeFormat(undefined, {
            timeZone: tz || undefined,
            hour: 'numeric',
            minute: '2-digit',
            hour12: false,
        }).format(new Date(sec * 1000)).toLowerCase();

    return (
        <div className="rounded-2xl border border-white/10 bg-background/60 p-4 overflow-visible">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-background/60">
                        <Waves className="h-4 w-4" />
                    </div>
                    <span className="text-sm text-foreground/70">Tide</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold">{formatOrNA(now, 'm')}</span>
                    {trendIcon}
                </div>
            </div>

            <div className="mt-3 overflow-visible">
                <svg width={chart.w} height={chart.h} viewBox={`0 0 ${chart.w} ${chart.h}`} className="w-full overflow-visible" preserveAspectRatio="xMidYMid meet">
                    <path d={chart.area} fill="currentColor" className="opacity-10" />
                    <path d={chart.d} fill="none" stroke="currentColor" strokeWidth="2" className="opacity-80" />

                    <g>
                        <circle cx={chart.x(prevLabel.idx)} cy={chart.y(prevLabel.y)} r={CIRCLE_R} fill="currentColor" />
                        <text
                            x={chart.x(prevLabel.idx) + 8}
                            y={textY(prevLabel.y) - (CIRCLE_R + LABEL_PAD)}
                            fontSize="11"
                            className="fill-current"
                        >
                            <tspan x={chart.x(prevLabel.idx) + 8}>{fmtTime(prevLabel.t, timezone)}</tspan>
                            <tspan x={chart.x(prevLabel.idx) + 8} dy={LINE_GAP}>{prevLabel.y.toFixed(1)}m</tspan>
                        </text>
                    </g>

                    <g className='text-[var(--brand-name)]'>
                        <circle cx={chart.x(nowIdxRel)} cy={chart.y(nowPt.y)} r={CIRCLE_R} fill="currentColor" />
                        <text
                            x={chart.x(nowIdxRel)}
                            y={textY(nowPt.y) - (CIRCLE_R + LABEL_PAD)}
                            fontSize="11"
                            className="fill-current"
                            textAnchor="middle"
                        >
                            <tspan x={chart.x(nowIdxRel)}>now</tspan>
                            <tspan x={chart.x(nowIdxRel)} dy={LINE_GAP}>{nowPt.y.toFixed(1)}m</tspan>
                        </text>
                    </g>

                    <g>
                        <circle cx={chart.x(nextLabel.idx)} cy={chart.y(nextLabel.y)} r={CIRCLE_R} fill="currentColor" />
                        <text
                            x={chart.x(nextLabel.idx) - 8}
                            y={textY(nextLabel.y) - (CIRCLE_R + LABEL_PAD)}
                            fontSize="11"
                            className="fill-current"
                            textAnchor="end"
                        >
                            <tspan x={chart.x(nextLabel.idx) - 8}>{fmtTime(nextLabel.t, timezone)}</tspan>
                            <tspan x={chart.x(nextLabel.idx) - 8} dy={LINE_GAP}>{nextLabel.y.toFixed(1)}m</tspan>
                        </text>
                    </g>

                </svg>
            </div>
        </div>
    );
}