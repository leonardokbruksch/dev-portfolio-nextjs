'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useEffect, useState, useRef } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from "@/lib/utils";

export interface Navbar01NavLink {
  href: string;
  label: string;
  active?: boolean;
}

export interface Navbar01Props extends React.HTMLAttributes<HTMLElement> {
  navigationLinks?: Navbar01NavLink[];
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
}

const defaultNavigationLinks: Navbar01NavLink[] = [
  { href: '#', label: 'Home', active: true },
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#about', label: 'About' },
];

export const Navbar01 = React.forwardRef<HTMLElement, Navbar01Props>(
  (
    {
      className,
      navigationLinks = defaultNavigationLinks,
      ctaText = 'Get Started',
      ctaHref = '#get-started',
      onCtaClick,
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
      const checkWidth = () => {
        if (containerRef.current) {
          const width = containerRef.current.offsetWidth;
          setIsMobile(width < 768);
        }
      };

      checkWidth();
      const resizeObserver = new ResizeObserver(checkWidth);
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }
      return () => {
        resizeObserver.disconnect();
      };
    }, []);

    const combinedRef = React.useCallback((node: HTMLElement | null) => {
      containerRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    }, [ref]);

    return (
      <header
        ref={combinedRef}
        className={cn(
          "sticky top-4 z-50 w-full px-4 md:px-6",
          className
        )}
        {...props}
      >
        <div className="container mx-auto max-w-screen-2xl">
          <div className="flex h-14 items-center justify-between gap-4 rounded-2xl border border-border/60 bg-background/80 backdrop-blur-md px-4 md:px-6 shadow-sm">
            {/* Left side */}
            <div className="flex items-center gap-6">
              <span className="font-bold text-lg sm:text-xl">leonardobruksch.dev</span>
              {!isMobile && (
                <NavigationMenu className="flex">
                  <NavigationMenuList className="gap-1">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index}>
                        <button
                          onClick={(e) => e.preventDefault()}
                          className={cn(
                            "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer no-underline",
                            link.active
                              ? "bg-accent text-accent-foreground"
                              : "text-foreground/80 hover:text-foreground"
                          )}
                        >
                          {link.label}
                        </button>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              )}
            </div>
            {/* Right side */}
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                className="text-sm font-medium px-4 h-9 rounded-md shadow-sm"
                onClick={(e) => {
                  e.preventDefault();
                  if (onCtaClick) onCtaClick();
                }}
              >
                {ctaText}
              </Button>
            </div>
          </div>
        </div>
      </header>
    );
  }
);

Navbar01.displayName = 'Navbar01';
