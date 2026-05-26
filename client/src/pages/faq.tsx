import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SEO } from "@/components/seo";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: "easeOut" },
  }),
};

const faqs = [
  {
    question: "How do I get started as a new client?",
    answer:
      "The first step is to reach out through the contact form or by calling (508) 591-0569. We'll schedule a free 15-minute consultation to talk about what you're looking for and whether my approach might be a good fit. If we decide to move forward, I'll send you intake paperwork through the secure client portal before your first session.",
  },
  {
    question: "Do you accept insurance?",
    answer:
      "I am currently an out-of-network provider and do not bill insurance directly. However, many insurance plans offer out-of-network benefits that may reimburse a portion of your session cost. I can provide a superbill (a detailed receipt) that you can submit to your insurance company for potential reimbursement. I recommend calling the member services number on your insurance card to ask about your out-of-network behavioral health benefits.",
  },
  {
    question: "What is the cost per session?",
    answer:
      "Session fees are discussed during the initial consultation. I am committed to making therapy accessible and am happy to discuss your individual financial situation. A sliding scale fee may be available on a case-by-case basis.",
  },
  {
    question: "How long is a typical therapy session?",
    answer:
      "Standard individual therapy sessions are 50 minutes. Depending on the type of work we're doing, extended sessions may occasionally be appropriate and would be discussed in advance.",
  },
  {
    question: "Do you offer telehealth sessions?",
    answer:
      "Yes. I offer secure video therapy sessions through Doxy.me, a HIPAA-compliant telehealth platform. Telehealth is available to clients located in Massachusetts. No app download is required — you simply click your session link at your scheduled time.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "I ask for at least 24 hours notice if you need to cancel or reschedule your appointment. Late cancellations or no-shows may be subject to a cancellation fee. I understand that life happens and try to be flexible, but consistent attendance is important for making progress in therapy.",
  },
  {
    question: "Is everything I share in therapy confidential?",
    answer:
      "Confidentiality is a cornerstone of the therapeutic relationship. What you share in sessions stays between us with very few exceptions, which are required by law: if there is risk of harm to yourself or others, if abuse or neglect of a child or vulnerable adult is disclosed, or if records are subpoenaed by a court. These limits are explained in detail during the intake process, and I am always happy to answer questions about confidentiality.",
  },
  {
    question: "What therapeutic approaches do you use?",
    answer:
      "My approach is integrative and tailored to each individual. I draw from trauma-informed care, somatic and mind-body techniques, attachment theory, and holistic wellness practices including mindfulness, grounding exercises, and aromatherapy. I hold a Certificate in Trauma from Smith College and am deeply committed to evidence-based, whole-person healing.",
  },
  {
    question: "Do you work with adolescents?",
    answer:
      "Yes. I work with both adolescents and adults. For minors, a parent or guardian is involved in the intake process. I work to create a space where young clients feel safe, heard, and understood.",
  },
  {
    question: "What if I'm not sure therapy is right for me?",
    answer:
      "That's exactly what the free consultation is for. There's no pressure or commitment involved. We can have an honest conversation about what you're going through, what you're hoping for, and whether therapy — and my specific approach — feels like a fit. Sometimes just making the call is the hardest part.",
  },
];

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  const answerId = `faq-answer-${index}`;
  const questionId = `faq-question-${index}`;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20px" }}
      variants={fadeUp}
      custom={index}
      className="border-b border-border last:border-b-0"
    >
      <button
        id={questionId}
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left cursor-pointer group"
        data-testid={`button-faq-${index}`}
        aria-expanded={open}
        aria-controls={answerId}
      >
        <span className="font-medium leading-snug group-hover:text-primary transition-colors">
          {question}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={`w-5 h-5 mt-0.5 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            id={answerId}
            role="region"
            aria-labelledby={questionId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p
              className="text-muted-foreground leading-relaxed pb-5"
              data-testid={`text-faq-answer-${index}`}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <div className="pt-20">
      <SEO
        title="Frequently Asked Questions"
        description="Common questions about therapy with Jennifer Mello, LICSW — insurance, session cost, telehealth, confidentiality, and how to get started."
        path="/faq"
      />

      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-3"
            >
              Common Questions
            </motion.p>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-serif text-3xl sm:text-4xl font-semibold mb-4"
              data-testid="text-faq-heading"
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground leading-relaxed max-w-xl mx-auto"
            >
              Here are answers to the questions I hear most often. If something isn't covered here, please don't hesitate to reach out.
            </motion.p>
          </motion.div>

          <div className="divide-y-0" data-testid="section-faq-list">
            {faqs.map((faq, i) => (
              <FaqItem key={i} question={faq.question} answer={faq.answer} index={i} />
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="mt-16 text-center bg-card border border-border rounded-lg p-8"
            data-testid="section-faq-cta"
          >
            <h2 className="font-serif text-2xl font-semibold mb-3">Still have questions?</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              The best way to get answers specific to your situation is to schedule a free 15-minute consultation. There's no commitment involved.
            </p>
            <Link href="/contact">
              <Button className="gap-2" data-testid="button-faq-contact">
                Get In Touch
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
