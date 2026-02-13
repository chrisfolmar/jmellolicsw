import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Mail, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

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

            <nav className="hidden md:flex items-center gap-1" data-testid="nav-desktop">
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
            </nav>

            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={toggleTheme}
                data-testid="button-theme-toggle"
                className={
                  showTransparent
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : ""
                }
              >
                {theme === "light" ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
              </Button>

              <a href="tel:+15085910569" className="hidden sm:flex">
                <Button
                  variant={showTransparent ? "outline" : "default"}
                  className={`gap-2 text-sm ${
                    showTransparent
                      ? "border-white/30 text-white bg-white/10 backdrop-blur-sm"
                      : ""
                  }`}
                  data-testid="button-call-nav"
                >
                  <Phone className="w-3.5 h-3.5" />
                  (508) 591-0569
                </Button>
              </a>

              <Button
                size="icon"
                variant="ghost"
                className={`md:hidden ${
                  showTransparent ? "text-white hover:bg-white/10" : ""
                }`}
                onClick={() => setMobileOpen(true)}
                data-testid="button-mobile-menu"
              >
                <Menu className="w-5 h-5" />
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
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
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
                  size="icon"
                  variant="ghost"
                  onClick={() => setMobileOpen(false)}
                  data-testid="button-close-mobile-menu"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <nav className="flex flex-col p-4 gap-1">
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
              </nav>

              <div className="mt-auto p-4 border-t border-border space-y-3">
                <a href="tel:+15085910569" className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  (508) 591-0569
                </a>
                <a href="mailto:jmellolicsw@gmail.com" className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
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
