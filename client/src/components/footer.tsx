import { Link } from "wouter";
import { Phone, Mail, MapPin, Clock, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border" data-testid="footer">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-serif text-lg font-semibold mb-1">
              Jennifer Mello
            </h3>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
              LICSW
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Certified trauma therapist providing holistic health and wellness
              therapy in Plymouth, Massachusetts.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/about", label: "About Me" },
                { href: "/services", label: "Services" },
                { href: "/resources", label: "Resources" },
                { href: "/faq", label: "FAQ" },
                { href: "/contact", label: "Contact" },
                { href: "/privacy", label: "Privacy Policy" },
              ].map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    data-testid={`link-footer-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+15085910569"
                className="flex items-start gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-phone"
              >
                <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                (508) 591-0569
              </a>
              <a
                href="mailto:jmellolicsw@gmail.com"
                className="flex items-start gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-email"
              >
                <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                jmellolicsw@gmail.com
              </a>
              <div className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>
                  225 Water Street, Suite B239
                  <br />
                  Plymouth, MA 02360
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">
              Hours
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                <div>
                  <p>Monday - Thursday</p>
                  <p>10:00 AM - 7:00 PM</p>
                </div>
              </div>
              <a
                href="https://www.instagram.com/jennifermellolicsw/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-instagram"
              >
                <Instagram className="w-4 h-4 shrink-0" />
                @jennifermellolicsw
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground" data-testid="text-copyright">
            &copy; {new Date().getFullYear()} Jennifer Mello, LICSW. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with love by{" "}
            <a
              href="https://www.linkedin.com/in/clfolmar"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors underline underline-offset-2"
            >
              Fomy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
