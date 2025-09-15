"use client";
import { BubbleBackground } from "@/components/ui/bubble-background";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <BubbleBackground />
    </div>
  );
}