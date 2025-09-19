import ImageNext from "next/image";
import { cn } from "@/lib/utils";
import type { Experimental_GeneratedImage } from "ai";

export type GeneratedImageProps = Experimental_GeneratedImage & {
  className?: string;
  alt?: string;
  width?: number;
  height?: number;
};

export const GeneratedImage = ({
  base64,
  mediaType,
  className,
  alt,
  width,
  height,
}: GeneratedImageProps) => (
  <ImageNext
    src={`data:${mediaType};base64,${base64}`}
    alt={alt ?? ""}
    className={cn("h-auto max-w-full overflow-hidden rounded-md", className)}
    width={width ?? 1024}
    height={height ?? 768}
    unoptimized
  />
);
