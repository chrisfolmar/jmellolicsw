import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Mail, Sun, Moon, ChevronDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/resources", label: "Resources" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const portalLinks = [
  {
    label: "Client Portal",
    href: "https://jmellolicsw.clientsecure.me/",
    description: "Access your secure client account",
  },
  {
    label: "Telehealth (Doxy.me)",
    href: "https://doxy.me/v2/check-in/jmellolicsw/",
    description: "Join your virtual session",
  },
];

export function Navigation() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const [mobilePortalOpen, setMobilePortalOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const portalRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobilePortalOpen(false);
  }, [location]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      previousFocusRef.current = document.activeElement as HTMLElement;
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const panel = mobileNavRef.current;
      if (!panel) return;

      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.closest("[hidden]"));

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (portalRef.current && !portalRef.current.contains(event.target as Node)) {
        setPortalOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isHome = location === "/";
  const showTransparent = isHome && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showTransparent
            ? "bg-transparent"
            : "bg-background/95 backdrop-blur-md border-b border-border"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" data-testid="link-home-logo">
              <div className="flex items-center gap-2 cursor-pointer">
                <span
                  className={`font-serif text-lg sm:text-xl font-semibold tracking-tight transition-colors duration-300 ${
                    showTransparent ? "text-white" : "text-foreground"
                  }`}
                >
                  Jennifer Mello
                </span>
                <span
                  className={`text-xs font-medium tracking-wider uppercase transition-colors duration-300 ${
                    showTransparent
                      ? "text-white/70"
                      : "text-muted-foreground"
                  }`}
                >
                  LICSW
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation" data-testid="nav-desktop">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    data-testid={`link-nav-${link.label.toLowerCase()}`}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer ${
                      location === link.href
                        ? showTransparent
                          ? "text-white bg-white/15"
                          : "text-foreground bg-accent"
                        : showTransparent
                          ? "text-white/80 hover:text-white hover:bg-white/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}

              <div className="relative" ref={portalRef}>
                <button
                  onClick={() => setPortalOpen(!portalOpen)}
                  data-testid="button-current-clients"
                  aria-expanded={portalOpen}
                  aria-haspopup="true"
                  aria-label="Current Clients menu"
                  className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    showTransparent
                      ? "text-white/80 hover:text-white hover:bg-white/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  Current Clients
                  <ChevronDown aria-hidden="true" className={`w-3.5 h-3.5 transition-transform duration-200 ${portalOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {portalOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-1 w-64 rounded-md border border-border bg-background/95 backdrop-blur-md shadow-lg overflow-hidden"
                      data-testid="dropdown-current-clients"
                      role="menu"
                    >
                      <div className="p-1.5">
                        {portalLinks.map((portal) => (
                          <a
                            key={portal.label}
                            href={portal.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            role="menuitem"
                            className="flex items-start gap-3 px-3 py-2.5 rounded-md hover-elevate transition-colors cursor-pointer group"
                            data-testid={`link-portal-${portal.label.toLowerCase().replace(/[^a-z]/g, "-")}`}
                            onClick={() => setPortalOpen(false)}
                          >
                            <ExternalLink aria-hidden="true" className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                            <div>
                              <p className="text-sm font-medium">{portal.label}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{portal.description}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={toggleTheme}
                data-testid="button-theme-toggle"
                aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
                className={
                  showTransparent
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : ""
                }
              >
                {theme === "light" ? (
                  <Moon aria-hidden="true" className="w-4 h-4" />
                ) : (
                  <Sun aria-hidden="true" className="w-4 h-4" />
                )}
              </Button>

              <a href="tel:+15085910569" className="hidden sm:flex" aria-label="Call (508) 591-0569">
                <Button
                  variant={showTransparent ? "outline" : "default"}
                  className={`gap-2 text-sm ${
                    showTransparent
                      ? "border-white/30 text-white bg-white/10 backdrop-blur-sm"
                      : ""
                  }`}
                  data-testid="button-call-nav"
                >
                  <Phone aria-hidden="true" className="w-3.5 h-3.5" />
                  (508) 591-0569
                </Button>
              </a>

              <Button
                ref={openButtonRef}
                size="icon"
                variant="ghost"
                aria-label="Open navigation menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav-panel"
                className={`md:hidden ${
                  showTransparent ? "text-white hover:bg-white/10" : ""
                }`}
                onClick={() => setMobileOpen(true)}
                data-testid="button-mobile-menu"
              >
                <Menu aria-hidden="true" className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
              aria-hidden="true"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              ref={mobileNavRef}
              id="mobile-nav-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-background z-50 md:hidden flex flex-col"
              data-testid="nav-mobile-panel"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="font-serif text-lg font-semibold">Menu</span>
                <Button
                  ref={closeButtonRef}
                  size="icon"
                  variant="ghost"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation menu"
                  data-testid="button-close-mobile-menu"
                >
                  <X aria-hidden="true" className="w-5 h-5" />
                </Button>
              </div>

              <nav aria-label="Mobile navigation" className="flex flex-col p-4 gap-1 overflow-y-auto">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <span
                      data-testid={`link-mobile-${link.label.toLowerCase()}`}
                      className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                        location === link.href
                          ? "bg-accent text-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                ))}

                <div className="mt-2 pt-2 border-t border-border">
                  <button
                    onClick={() => setMobilePortalOpen(!mobilePortalOpen)}
                    aria-expanded={mobilePortalOpen}
                    aria-controls="mobile-portal-links"
                    className="flex items-center justify-between w-full px-4 py-3 rounded-md text-sm font-medium text-muted-foreground transition-colors"
                    data-testid="button-mobile-current-clients"
                  >
                    Current Clients
                    <ChevronDown aria-hidden="true" className={`w-4 h-4 transition-transform duration-200 ${mobilePortalOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {mobilePortalOpen && (
                      <motion.div
                        id="mobile-portal-links"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 space-y-1 pb-1">
                          {portalLinks.map((portal) => (
                            <a
                              key={portal.label}
                              href={portal.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2.5 px-4 py-2.5 rounded-md text-sm text-muted-foreground hover-elevate transition-colors"
                              data-testid={`link-mobile-portal-${portal.label.toLowerCase().replace(/[^a-z]/g, "-")}`}
                            >
                              <ExternalLink aria-hidden="true" className="w-3.5 h-3.5 text-primary shrink-0" />
                              {portal.label}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </nav>

              <div className="mt-auto p-4 border-t border-border space-y-3">
                <a href="tel:+15085910569" className="flex items-center gap-2 text-sm text-muted-foreground" aria-label="Call (508) 591-0569">
                  <Phone aria-hidden="true" className="w-4 h-4" />
                  (508) 591-0569
                </a>
                <a href="mailto:jmellolicsw@gmail.com" className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail aria-hidden="true" className="w-4 h-4" />
                  jmellolicsw@gmail.com
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
