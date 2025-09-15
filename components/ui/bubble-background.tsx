'use client';

import * as React from 'react';
import {
  motion,
  type SpringOptions,
  useMotionValue,
  useSpring,
} from 'motion/react';

import { cn } from "@/lib/utils"

type BubbleBackgroundProps = React.ComponentProps<'div'> & {
  interactive?: boolean;
  transition?: SpringOptions;
};

function BubbleBackground({
  ref,
  className,
  children,
  interactive = false,
  transition = { stiffness: 100, damping: 20 },
  ...props
}: BubbleBackgroundProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, transition);
  const springY = useSpring(mouseY, transition);

  React.useEffect(() => {
    if (!interactive) return;

    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = currentContainer.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    currentContainer?.addEventListener('mousemove', handleMouseMove);
    return () =>
      currentContainer?.removeEventListener('mousemove', handleMouseMove);
  }, [interactive, mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      data-slot="bubble-background"
      className={cn(
        'relative size-full overflow-hidden bg-gradient-to-br from-[var(--bubble-1)] to-[var(--bubble-2)]',
        className,
      )}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 w-0 h-0"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
  
      <div className="absolute inset-0" style={{ filter: 'url(#goo) blur(40px)' }}>
        <motion.div
          className="absolute rounded-full size-[80%] top-[10%] left-[10%] mix-blend-hard-light bg-[radial-gradient(circle_at_center,rgba(var(--bubble-1),0.8)_0%,rgba(var(--bubble-1),0)_50%)]"
          animate={{ y: [-50, 50, -50] }}
          transition={{ duration: 30, ease: 'easeInOut', repeat: Infinity }}
        />
  
        <motion.div
          className="absolute inset-0 flex justify-center items-center origin-[calc(50%-400px)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
        >
          <div className="rounded-full size-[80%] mix-blend-hard-light bg-[radial-gradient(circle_at_center,rgba(var(--bubble-2),0.8)_0%,rgba(var(--bubble-2),0)_50%)]" />
        </motion.div>
  
        <motion.div
          className="absolute inset-0 flex justify-center items-center origin-[calc(50%+400px)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
        >
          <div className="absolute rounded-full size-[80%] top-[calc(50%+200px)] left-[calc(50%-500px)] mix-blend-hard-light bg-[radial-gradient(circle_at_center,rgba(var(--bubble-3),0.8)_0%,rgba(var(--bubble-3),0)_50%)]" />
        </motion.div>
  
        <motion.div
          className="absolute rounded-full size-[80%] top-[10%] left-[10%] opacity-70 mix-blend-hard-light bg-[radial-gradient(circle_at_center,rgba(var(--bubble-4),0.8)_0%,rgba(var(--bubble-4),0)_50%)]"
          animate={{ x: [-50, 50, -50] }}
          transition={{ duration: 40, ease: 'easeInOut', repeat: Infinity }}
        />
  
        <motion.div
          className="absolute inset-0 flex justify-center items-center origin-[calc(50%_-_800px)_calc(50%_+_200px)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
        >
          <div className="absolute rounded-full size-[160%] top-[calc(50%-80%)] left-[calc(50%-80%)] mix-blend-hard-light bg-[radial-gradient(circle_at_center,rgba(var(--bubble-5),0.8)_0%,rgba(var(--bubble-5),0)_50%)]" />
        </motion.div>
  
        {interactive && (
          <motion.div
            className="absolute rounded-full size-full opacity-70 mix-blend-hard-light bg-[radial-gradient(circle_at_center,rgba(var(--bubble-6),0.8)_0%,rgba(var(--bubble-6),0)_50%)]"
            style={{ x: springX, y: springY }}
          />
        )}
      </div>
  
      {children}
    </div>
  )
}

export { BubbleBackground, type BubbleBackgroundProps };