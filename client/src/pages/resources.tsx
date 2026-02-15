import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Phone,
  BookOpen,
  Globe,
  Headphones,
  Heart,
  Shield,
  Flower2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/seo";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" },
  }),
};

const crisisResources = [
  {
    title: "National Suicide Prevention Lifeline",
    phone: "988",
    description: "Free 24/7 support for people in distress and crisis resources.",
  },
  {
    title: "Crisis Text Line",
    phone: "Text HOME to 741741",
    description: "Free 24/7 crisis counseling via text message.",
  },
  {
    title: "SAMHSA National Helpline",
    phone: "1-800-662-4357",
    description: "Free referral and information service for mental health and substance use disorders.",
  },
];

const resources = [
  {
    icon: BookOpen,
    category: "Education",
    title: "National Alliance on Mental Illness (NAMI)",
    url: "https://www.nami.org",
    description: "Education, support groups, and advocacy for individuals and families affected by mental illness.",
  },
  {
    icon: Heart,
    category: "Trauma",
    title: "The National Child Traumatic Stress Network",
    url: "https://www.nctsn.org",
    description: "Resources for families and professionals on childhood trauma, treatment, and resilience.",
  },
  {
    icon: Shield,
    category: "Wellness",
    title: "Psychology Today - Find a Therapist",
    url: "https://www.psychologytoday.com/us/therapists",
    description: "Comprehensive directory to find therapists, psychiatrists, and support groups near you.",
  },
  {
    icon: Globe,
    category: "Mindfulness",
    title: "Mindful.org",
    url: "https://www.mindful.org",
    description: "Guided practices, articles, and resources for mindfulness meditation and stress reduction.",
  },
  {
    icon: Flower2,
    category: "Self-Help",
    title: "Brene Brown - The Gifts of Imperfection",
    url: "https://brenebrown.com",
    description: "Research-based resources on vulnerability, courage, and wholehearted living.",
  },
  {
    icon: Headphones,
    category: "Wellness",
    title: "Headspace - Meditation & Sleep",
    url: "https://www.headspace.com",
    description: "Guided meditation, mindfulness exercises, and sleep tools for everyday mental wellness.",
  },
];

export default function Resources() {
  return (
    <div>
      <SEO
        title="Resources"
        description="Helpful mental health resources, crisis hotlines, and wellness tools curated by Jennifer Mello, LICSW in Plymouth, MA."
        path="/resources"
      />
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
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
              Helpful Links
            </motion.p>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold mb-4"
              data-testid="text-resources-title"
            >
              Resources
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-xl mx-auto leading-relaxed"
            >
              A curated collection of helpful resources, tools, and organizations
              to support your mental health and wellness journey.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <motion.div variants={fadeUp} custom={0}>
              <Card className="p-6 sm:p-8 border-destructive/20 bg-destructive/5" data-testid="card-crisis">
                <div className="flex items-start gap-3 mb-5">
                  <div className="w-10 h-10 rounded-md bg-destructive/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">
                      Crisis Resources
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      If you or someone you know is in immediate danger, please
                      call 911.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {crisisResources.map((r, i) => (
                    <div key={r.title} className="space-y-1" data-testid={`text-crisis-${i}`}>
                      <h4 className="text-sm font-semibold">{r.title}</h4>
                      <p className="text-sm font-medium text-primary">{r.phone}</p>
                      <p className="text-xs text-muted-foreground">{r.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {resources.map((resource, i) => (
              <motion.div
                key={resource.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20px" }}
                variants={fadeUp}
                custom={i % 2}
              >
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <Card
                    className="p-6 h-full hover-elevate cursor-pointer"
                    data-testid={`card-resource-${i}`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                        <resource.icon className="w-5 h-5 text-primary" />
                      </div>
                      <Badge variant="secondary" className="text-xs shrink-0">
                        {resource.category}
                      </Badge>
                    </div>
                    <h3 className="font-semibold mb-1.5 flex items-center gap-1.5">
                      {resource.title}
                      <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {resource.description}
                    </p>
                  </Card>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
