import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Heart,
  Users,
  Leaf,
  Shield,
  Compass,
  Flame,
  HandHeart,
  Sparkles,
  Wind,
  Clock,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/seo";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" },
  }),
};

const services = [
  {
    icon: Brain,
    title: "Trauma Therapy",
    description:
      "Certified trauma treatment using psychodynamic and relational approaches. I help clients process difficult experiences, restore a sense of safety, and reclaim their narrative through evidence-based, individualized care.",
  },
  {
    icon: Heart,
    title: "Anxiety & Depression",
    description:
      "Compassionate, personalized support for managing anxiety and depression. Together we develop effective coping strategies and therapeutic techniques tailored to your unique experience and goals.",
  },
  {
    icon: Users,
    title: "Relationship & Boundary Work",
    description:
      "Guidance for building healthier relationships, forming clear boundaries, and developing deeper, more meaningful connections with the important people in your life.",
  },
  {
    icon: Shield,
    title: "Emotional Regulation",
    description:
      "Learn effective strategies for understanding and managing your emotions. I help clients develop healthier responses to stress and build resilience through self-awareness and grounding techniques.",
  },
  {
    icon: Leaf,
    title: "Holistic Wellness",
    description:
      "Mind-body approaches that heal the whole person. This may include exploring essential oils, natural supplements, yoga, meditation, stretching, aromatherapy, and grounding techniques.",
  },
  {
    icon: Compass,
    title: "Adolescent & Adult Therapy",
    description:
      "Specialized individual therapy for adolescents and adults navigating life transitions, identity challenges, and personal growth. I meet you where you are in your journey.",
  },
  {
    icon: HandHeart,
    title: "Family Consultation",
    description:
      "Supportive family consultation to help families understand dynamics, improve communication, and create healthier patterns of interaction and support for one another.",
  },
  {
    icon: Flame,
    title: "Psychodynamic Therapy",
    description:
      "In-depth exploration of how past experiences shape present behavior and relationships. This approach promotes lasting change by addressing root causes rather than just symptoms.",
  },
  {
    icon: Wind,
    title: "Mind-Body Techniques",
    description:
      "Engaging sensory systems through body-based interventions including somatic practices, breathwork, and grounding exercises to support coping and healing from trauma.",
  },
  {
    icon: Sparkles,
    title: "Individualized Treatment",
    description:
      "Every person is unique. I develop a personalized roadmap for change that honors your individual experiences, strengths, and therapeutic goals, ensuring the most effective path forward.",
  },
];

export default function Services() {
  return (
    <div>
      <SEO
        title="Services & Specializations"
        description="Explore therapy services including trauma treatment, anxiety and depression therapy, relationship support, holistic wellness, and mind-body techniques in Plymouth, MA."
        path="/services"
      />
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            className="text-center mb-12 sm:mb-16"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-3"
            >
              What I Offer
            </motion.p>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold mb-4"
              data-testid="text-services-title"
            >
              Services & Specializations
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              I offer holistic health and wellness targeted therapy that aims to
              heal the whole person. My therapeutic style encompasses a broad range
              of techniques focused on psychodynamic and relational approaches to
              treatment.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20px" }}
                variants={fadeUp}
                custom={i % 3}
              >
                <Card
                  className="p-6 h-full hover-elevate cursor-default"
                  data-testid={`card-service-${i}`}
                >
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="mt-20"
          >
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-3">
                Fees
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold mb-4">
                Services & Fees
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                I value confidentiality and believe that you — not your insurance
                company — should guide the length of your therapy. I do not
                participate directly in any managed care plans.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
              {[
                {
                  label: "Initial Intake Assessment",
                  duration: "60 min session",
                  price: "$200",
                  index: 0,
                },
                {
                  label: "Individual Psychotherapy",
                  duration: "50 min session",
                  price: "$200",
                  index: 1,
                },
                {
                  label: "Family Consultation",
                  duration: "50 min session",
                  price: "$200",
                  index: 2,
                },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={item.index}
                >
                  <Card
                    className="p-6 text-center"
                    data-testid={`card-pricing-${item.index}`}
                  >
                    <p className="font-serif text-4xl font-semibold text-primary mb-1">
                      {item.price}
                    </p>
                    <p className="font-medium text-sm mb-2">{item.label}</p>
                    <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                      <Clock aria-hidden="true" className="w-3 h-3" />
                      {item.duration}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="max-w-3xl mx-auto p-5 bg-muted/40 border-border" data-testid="card-pricing-insurance">
              <div className="flex items-start gap-3">
                <Info aria-hidden="true" className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  If your insurance plan includes out-of-network benefits, you may
                  be able to use them for my services. I can provide an itemized
                  billing statement (superbill) for you to submit to your insurance
                  company for potential reimbursement. A sliding scale fee may be
                  available — please reach out to discuss.
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="mt-12 text-center"
          >
            <Card className="p-8 sm:p-12 max-w-2xl mx-auto" data-testid="card-services-cta">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold mb-4">
                Not Sure Where to Start?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I offer free consultations to discuss your needs and my approach to
                care. Together, we can determine if working together is a good fit
                for you.
              </p>
              <Link href="/contact">
                <Button className="gap-2" data-testid="button-services-contact">
                  Schedule a Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
