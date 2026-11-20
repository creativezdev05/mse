"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { BrandMark } from "@/components/brand/BrandMark";
import type { HeaderItem } from "@/data/menus";
import { brand, headerNavigation, quoteLink } from "@/lib/site";

const desktopQuery = "(min-width: 64rem)";

function subscribeToDesktop(onChange: () => void) {
  const media = window.matchMedia(desktopQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function useDesktopNav() {
  return useSyncExternalStore(
    subscribeToDesktop,
    () => window.matchMedia(desktopQuery).matches,
    () => false,
  );
}

function sectionCurrent(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function DesktopItem({ item, pathname }: { item: HeaderItem; pathname: string }) {
  return (
    <li className="site-nav-item">
      <Link
        href={item.href}
        className="site-nav-link"
        aria-current={sectionCurrent(pathname, item.href) ? "page" : undefined}
      >
        {item.title}
        {"groups" in item && item.groups ? (
          <span className="site-nav-caret" aria-hidden="true" />
        ) : null}
      </Link>
      {"groups" in item && item.groups ? (
        <ul className="site-submenu">
          {item.groups.map((group) => (
            <li key={group.label}>
              <p className="type-label site-submenu-label">{group.label}</p>
              <ul>
                {group.items.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      className="site-submenu-link"
                      aria-current={pathname === child.href ? "page" : undefined}
                    >
                      {child.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function focusableItems(container: HTMLElement) {
  return [
    ...container.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
  ];
}

export function SiteHeader() {
  const pathname = usePathname();
  const isDesktop = useDesktopNav();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openPath, setOpenPath] = useState(pathname);
  const [group, setGroup] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  const menuOpen = open && !isDesktop;

  if (pathname !== openPath) {
    setOpenPath(pathname);
    setGroup(null);
    if (open) {
      setOpen(false);
    }
  } else if (isDesktop && open) {
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      wasOpen.current = true;
      const firstLink = panelRef.current?.querySelector<HTMLElement>("a[href]");
      firstLink?.focus();
      return;
    }

    if (wasOpen.current) {
      wasOpen.current = false;
      buttonRef.current?.focus();
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }

      const items = focusableItems(panelRef.current);

      if (items.length === 0) {
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setOpen(false);
  const overlay = pathname === "/" && !scrolled && !menuOpen;

  return (
    <header className={overlay ? "site-header is-overlay" : "site-header"}>
      <div className="layout-shell-wide site-header-bar">
        <Link href="/" className="site-brand" aria-label={brand.name}>
          <BrandMark />
        </Link>
        <div className="site-header-actions">
          <nav className="site-nav" aria-label="Primary">
            <ul>
              {headerNavigation.map((item) => (
                <DesktopItem key={item.href} item={item} pathname={pathname} />
              ))}
            </ul>
          </nav>
          <Link href={quoteLink.href} className="btn btn-primary site-quote">
            {quoteLink.title}
          </Link>
        </div>
        {isDesktop ? null : (
          <button
            ref={buttonRef}
            type="button"
            className="site-menu-button"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        )}
      </div>
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="site-menu"
            ref={panelRef}
            className="site-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Primary"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Primary">
              <ul>
                {headerNavigation.map((item) =>
                  "groups" in item && item.groups ? (
                    <li key={item.href}>
                      <button
                        type="button"
                        className="site-menu-link site-menu-parent"
                        aria-expanded={group === item.href}
                        onClick={() =>
                          setGroup((current) => (current === item.href ? null : item.href))
                        }
                      >
                        {item.title}
                      </button>
                      {group === item.href ? (
                        <div className="site-menu-sub">
                          <Link
                            href={item.href}
                            className="site-menu-link"
                            aria-current={pathname === item.href ? "page" : undefined}
                            onClick={closeMenu}
                          >
                            Overview
                          </Link>
                          {item.groups.map((section) => (
                            <div key={section.label}>
                              <p className="type-label site-menu-sub-label">{section.label}</p>
                              <ul>
                                {section.items.map((child) => (
                                  <li key={child.href}>
                                    <Link
                                      href={child.href}
                                      className="site-menu-link"
                                      aria-current={pathname === child.href ? "page" : undefined}
                                      onClick={closeMenu}
                                    >
                                      {child.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </li>
                  ) : (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="site-menu-link"
                        aria-current={pathname === item.href ? "page" : undefined}
                        onClick={closeMenu}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
              <Link
                href={quoteLink.href}
                className="btn btn-primary site-menu-quote"
                onClick={closeMenu}
              >
                {quoteLink.title}
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
