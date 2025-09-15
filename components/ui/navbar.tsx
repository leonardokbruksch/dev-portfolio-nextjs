'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useEffect, useState, useRef, useCallback } from 'react';
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
import { HamburgerIcon } from './hamburger';
import { ThemeToggle } from './theme-toggle';

export interface Navbar01NavLink {
  href: string;
  label: string;
  active?: boolean;
}

export interface Navbar01Props extends React.HTMLAttributes<HTMLElement> {
  navigationLinks: Navbar01NavLink[];
  ctaText: string;
  ctaHref: string;
  onCtaClick?: () => void;
}

const navItemClasses = (isActive?: boolean) =>
  cn(
    "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium cursor-pointer transition-colors",
    "text-foreground/80 hover:text-foreground",
    "hover:underline hover:underline-offset-4 hover:decoration-1",
    isActive && "text-foreground"
  );

const mobileItemClasses = (isActive?: boolean) =>
  cn(
    "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium cursor-pointer transition-colors",
    "text-foreground/80 hover:text-foreground",
    "hover:underline hover:underline-offset-4 hover:decoration-1",
    isActive && "text-foreground"
  );

export const Navbar01 = React.forwardRef<HTMLElement, Navbar01Props>(
  (
    {
      className,
      navigationLinks,
      ctaText,
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

    const combinedRef = useCallback((node: HTMLElement | null) => {
      containerRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    }, [ref]);

    const scrollToHash = useCallback((hash: string) => {
      if (!hash || hash[0] !== '#') return;
      const id = hash.slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      const headerH = containerRef.current?.getBoundingClientRect().height ?? 0;
      const y = target.getBoundingClientRect().top + window.scrollY - (headerH + 16);
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        window.scrollTo(0, y);
      } else {
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, []);

    const handleNavClick = useCallback((e: React.MouseEvent, href?: string) => {
      e.preventDefault();
      if (!href) return;
      if (href.startsWith('#')) {
        scrollToHash(href);
      } else {
        window.location.href = href;
      }
    }, [scrollToHash]);

    return (
      <header
        ref={combinedRef}
        className={cn(
          'sticky top-4 z-50 mx-auto w-[95%] max-w-screen-2xl border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-2xl px-4 md:px-6 py-2 shadow-sm [&_*]:no-underline',
          className
        )}
        {...props}
      >
        <div className="relative flex h-12 items-center w-full">
          <div className="flex items-center gap-2">
            {isMobile && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                    variant="ghost"
                    size="icon"
                  >
                    <HamburgerIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-48 p-2">
                  <NavigationMenu className="max-w-none">
                    <NavigationMenuList className="flex-col items-start gap-1">
                      {navigationLinks.map((link, index) => (
                        <NavigationMenuItem key={index} className="w-full">
                          <button
                            data-active={link.active ? 'true' : 'false'}
                            aria-current={link.active ? 'page' : undefined}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className={mobileItemClasses(link.active)}
                          >
                            {link.label}
                          </button>
                        </NavigationMenuItem>
                      ))}
                    </NavigationMenuList>
                  </NavigationMenu>
                </PopoverContent>
              </Popover>
            )}
            <button
              onClick={(e) => handleNavClick(e, '#hero')}
              className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer"
            >
              <span className="font-bold text-xl tracking-tight leading-none">
                <span className="text-[var(--brand-name)]">leobruksch</span>
                <span className="mx-1 text-[var(--brand-dot)]">.</span>
                <span className="ml-0.5 text-[var(--brand-underscore)]">_</span>
              </span>
            </button>
          </div>

          {!isMobile && (
            <div className="absolute left-1/2 -translate-x-1/2">
              <NavigationMenu>
                <NavigationMenuList className="flex gap-1">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index}>
                      <button
                        data-active={link.active ? 'true' : 'false'}
                        aria-current={link.active ? 'page' : undefined}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={navItemClasses(link.active)}
                      >
                        {link.label}
                      </button>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          )}

          <div className="ml-auto flex items-center gap-3">
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              className="text-sm font-medium px-4 h-9 rounded-md shadow-sm"
              onClick={(e) => {
                if (ctaHref?.startsWith('#')) {
                  handleNavClick(e, ctaHref);
                } else {
                  e.preventDefault();
                  if (onCtaClick) onCtaClick();
                  else if (ctaHref) window.location.href = ctaHref;
                }
              }}
            >
              {ctaText}
            </Button>
          </div>
        </div>
      </header>
    );
  }
);

Navbar01.displayName = 'Navbar01';

export { HamburgerIcon };
