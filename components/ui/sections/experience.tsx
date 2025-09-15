"use client";

import * as React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { Badge } from "../badge";

export type Experience = {
    company: string;
    role: string;
    location?: string;
    website?: string;
    period: string;
    summary: string;
    bullets?: string[];
    skills?: string[];
    logoUrl?: string;
};

function PillList({ items }: { items?: string[] }) {
    if (!items?.length) return null;
    return (
        <div className="mt-4 flex flex-wrap gap-2">
            {items.map((s) => (
                <Badge key={s} variant="secondary" className="rounded-full px-3 py-1 text-xs">
                    {s}
                </Badge>
            ))}
        </div>
    );
}

function ExperienceRow({ exp, value }: { exp: Experience; value: string }) {
    return (
        <AccordionItem value={value} className="border-b">
            <AccordionTrigger className="text-left">
                <div className="flex w-full items-center justify-between gap-4">
                    <div className="flex min-w-0 flex-col">
                        <span className="truncate text-base sm:text-lg font-semibold">
                            {exp.role} @ {exp.company}
                        </span>
                        <span className="text-xs sm:text-sm text-foreground/60">{exp.period}</span>
                    </div>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <div className="space-y-3">
                    {/* meta line */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/70">
                        {exp.location && (
                            <span className="inline-flex items-center gap-1">
                                <MapPin className="h-4 w-4" aria-hidden />
                                {exp.location}
                            </span>
                        )}
                        {exp.website && (
                            <a
                                href={exp.website}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 underline-offset-4 hover:underline"
                            >
                                <ExternalLink className="h-4 w-4" aria-hidden />
                                {new URL(exp.website).host}
                            </a>
                        )}
                        <span className="inline-flex items-center gap-1">
                            <Calendar className="h-4 w-4" aria-hidden />
                            {exp.period}
                        </span>
                    </div>

                    <p className="text-sm leading-relaxed text-foreground/80">{exp.summary}</p>

                    {exp.bullets?.length ? (
                        <ul className="ml-4 list-disc space-y-2 text-sm text-foreground/80">
                            {exp.bullets.map((b, i) => (
                                <li key={i}>{b}</li>
                            ))}
                        </ul>
                    ) : null}

                    <PillList items={exp.skills} />
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}

const EXPERIENCES: Experience[] = [
    {
        company: "V-DAQ",
        role: "Full Stack Software Engineer",
        location: "Wollongong, Australia",
        period: "Nov 2023 – Sep 2025",
        summary:
            "Architected backend and front-end for IoT asset tracking at scale, building event-driven storage and real-time experiences.",
        bullets: [
            "Designed data ingestion & storage for millions of telemetry events/day.",
            "Event-driven S3 architecture cut data costs ~70% and sped up queries.",
            "Next.js + TypeScript front-ends; secure integration with backend services.",
            "Real-time maps with Google Maps + deck.gl rendering thousands of markers.",
            "Serverless backends in Python (AWS Lambda, REST, queues).",
            "React Native (Expo/EAS) apps incl. native Bluetooth stack.",
            "Advocated TypeScript + TDD across the team.",
        ],
        skills: [
            "Next.js",
            "TypeScript",
            "React",
            "React Native",
            "Expo",
            "Python",
            "AWS Lambda",
            "S3",
            "IoT",
            "deck.gl",
            "Google Maps",
            "REST",
            "Queues",
            "TDD",
            "Serverless",
        ],
        website: undefined,
    },
    {
        company: "Unitech",
        role: "Full Stack Software Engineer",
        location: "Wollongong, Australia",
        period: "Jan 2023 – Nov 2023",
        summary:
            "Built web apps for time management, scheduling, and billing using modern full-stack tooling.",
        bullets: [
            "Delivered features across frontend and backend with strong DevEx.",
            "Used Java EE/Spring Boot on the server with React/TypeScript on the client.",
        ],
        skills: ["Java", "Spring Boot", "React", "TypeScript", "Docker"],
    },
    {
        company: "Self-Employed",
        role: "Digital Product Entrepreneur",
        location: "Florianópolis, Brazil",
        period: "Sep 2018 – Oct 2022",
        summary:
            "Launched and operated profitable e-commerce products and services; shipped websites and SaaS integrations.",
        bullets: [
            "Built mobile-friendly stores and integrated payment/3rd-party systems.",
            "Created Shopify plugins to drive revenue uplift.",
        ],
        skills: ["Shopify", "Payments", "SaaS", "E-commerce"],
    },
    {
        company: "SAP Labs",
        role: "Backend Software Engineer",
        location: "São Leopoldo, Brazil",
        period: "Apr 2015 – Mar 2019",
        summary:
            "Worked on large-scale e-commerce platforms in global teams with clean code and TDD practices.",
        bullets: [
            "Java Spring Boot & JavaScript services, plus ABAP integrations.",
            "Agile delivery, design patterns, and test-driven development.",
        ],
        skills: ["Java", "Spring Boot", "JavaScript", "ABAP", "TDD", "Agile"],
    },
    {
        company: "Accera",
        role: "Support Analyst",
        location: "São Leopoldo, Brazil",
        period: "Mar 2014 – Mar 2015",
        summary: "Supported and maintained supply-chain software systems.",
        bullets: [],
        skills: ["Support", "Supply Chain"],
    },
];

export function ExperienceSection() {
    return (
        <section className="mx-auto w-full max-w-5xl">
            <header className="mb-6">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Professional Experience</h2>
                <p className="text-sm text-foreground/60">A snapshot of roles, impact, and tools I work with.</p>
            </header>

            <Accordion type="single" collapsible className="w-full rounded-2xl border p-2 sm:p-4">
                {EXPERIENCES.map((exp, idx) => (
                    <ExperienceRow key={idx} exp={exp} value={`item-${idx}`} />
                ))}
            </Accordion>
        </section>
    );
}
