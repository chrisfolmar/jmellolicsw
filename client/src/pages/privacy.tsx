import { motion } from "framer-motion";
import { SEO } from "@/components/seo";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: "easeOut" },
  }),
};

export default function Privacy() {
  const lastUpdated = "May 25, 2026";

  return (
    <div className="pt-20">
      <SEO
        title="Privacy Policy"
        description="Privacy policy for Jennifer Mello, LICSW. Learn how we collect, use, and protect your personal information."
        path="/privacy"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <motion.div
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <motion.div variants={fadeUp} custom={0}>
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2 mb-8 -ml-2 text-muted-foreground" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </motion.div>

          <motion.p
            variants={fadeUp}
            custom={1}
            className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-3"
          >
            Legal
          </motion.p>
          <motion.h1
            variants={fadeUp}
            custom={2}
            className="font-serif text-3xl sm:text-4xl font-semibold mb-3"
            data-testid="text-privacy-heading"
          >
            Privacy Policy
          </motion.h1>
          <motion.p variants={fadeUp} custom={3} className="text-sm text-muted-foreground">
            Last updated: {lastUpdated}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          className="prose prose-slate dark:prose-invert max-w-none space-y-10"
        >
          <motion.section variants={fadeUp} custom={4} data-testid="section-privacy-intro">
            <h2 className="font-serif text-xl font-semibold mb-3">Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              Jennifer Mello, LICSW ("I," "me," or "my practice") is committed to protecting your privacy. This Privacy Policy explains how information is collected, used, and safeguarded when you visit this website or submit a contact inquiry. Please read this policy carefully.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              <strong>Important:</strong> Submitting a contact form or visiting this website does <em>not</em> establish a therapist-client relationship. That relationship is only formed through a formal intake process and a signed client agreement.
            </p>
          </motion.section>

          <motion.section variants={fadeUp} custom={5} data-testid="section-privacy-collect">
            <h2 className="font-serif text-xl font-semibold mb-3">Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              When you use the contact form on this website, we collect only the information you voluntarily provide:
            </p>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li className="flex gap-2"><span className="text-primary mt-1">•</span><span><strong>Name</strong> — so we can address you properly in our response.</span></li>
              <li className="flex gap-2"><span className="text-primary mt-1">•</span><span><strong>Email address</strong> — to reply to your inquiry.</span></li>
              <li className="flex gap-2"><span className="text-primary mt-1">•</span><span><strong>Phone number</strong> (optional) — if you prefer to be reached by phone.</span></li>
              <li className="flex gap-2"><span className="text-primary mt-1">•</span><span><strong>Message</strong> — the content of your inquiry.</span></li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              This website does not use cookies for tracking, does not collect payment information, and does not automatically collect any personal data beyond what you submit.
            </p>
          </motion.section>

          <motion.section variants={fadeUp} custom={6} data-testid="section-privacy-use">
            <h2 className="font-serif text-xl font-semibold mb-3">How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              The information you provide through the contact form is used solely to:
            </p>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li className="flex gap-2"><span className="text-primary mt-1">•</span><span>Respond to your inquiry or question.</span></li>
              <li className="flex gap-2"><span className="text-primary mt-1">•</span><span>Determine if my practice may be a good fit for your needs.</span></li>
              <li className="flex gap-2"><span className="text-primary mt-1">•</span><span>Schedule a free initial consultation if requested.</span></li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Your information will never be sold, rented, or shared with third parties for marketing or any other purpose not described in this policy.
            </p>
          </motion.section>

          <motion.section variants={fadeUp} custom={7} data-testid="section-privacy-hipaa">
            <h2 className="font-serif text-xl font-semibold mb-3">HIPAA & Confidentiality</h2>
            <p className="text-muted-foreground leading-relaxed">
              Once a therapeutic relationship is established, all clinical records and communications are protected under the Health Insurance Portability and Accountability Act (HIPAA). My practice uses HIPAA-compliant platforms for all clinical communications, telehealth sessions (Doxy.me), and client record management (SimplePractice).
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Please be aware that email and web contact forms are <em>not</em> HIPAA-secure channels. Do not include sensitive clinical information in your initial inquiry. If you are a current client and need to share sensitive information, please use the secure client portal.
            </p>
          </motion.section>

          <motion.section variants={fadeUp} custom={8} data-testid="section-privacy-retention">
            <h2 className="font-serif text-xl font-semibold mb-3">Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              Contact form submissions are retained for a reasonable period to allow follow-up and are deleted when no longer needed. If you would like your submission removed, please contact me directly and I will promptly honor that request.
            </p>
          </motion.section>

          <motion.section variants={fadeUp} custom={9} data-testid="section-privacy-thirdparty">
            <h2 className="font-serif text-xl font-semibold mb-3">Third-Party Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              This website contains links to external platforms including SimplePractice (client portal) and Doxy.me (telehealth). These services have their own privacy policies, and I am not responsible for their practices. I encourage you to review their policies before using those platforms.
            </p>
          </motion.section>

          <motion.section variants={fadeUp} custom={10} data-testid="section-privacy-contact">
            <h2 className="font-serif text-xl font-semibold mb-3">Questions About This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy or how your information is handled, please reach out:
            </p>
            <div className="mt-4 space-y-1 text-muted-foreground">
              <p><strong>Jennifer Mello, LICSW</strong></p>
              <p>225 Water Street, Suite B239, Plymouth, MA 02360</p>
              <p>
                <a href="mailto:jmellolicsw@gmail.com" className="text-primary hover:underline" data-testid="link-privacy-email">
                  jmellolicsw@gmail.com
                </a>
              </p>
              <p>
                <a href="tel:+15085910569" className="text-primary hover:underline" data-testid="link-privacy-phone">
                  (508) 591-0569
                </a>
              </p>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}
