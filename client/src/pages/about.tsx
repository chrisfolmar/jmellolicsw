import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Award, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/seo";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const credentials = [
  {
    icon: GraduationCap,
    title: "Smith College",
    description: "Master's degree from Smith College School for Social Work",
  },
  {
    icon: Award,
    title: "Licensed LICSW",
    description: "Licensed Independent Clinical Social Worker in Massachusetts",
  },
  {
    icon: Heart,
    title: "Certified in Trauma",
    description: "Certificate in Traumatic Stress Studies",
  },
  {
    icon: Sparkles,
    title: "Holistic Approach",
    description: "Mind-body techniques integrating sensory and somatic therapies",
  },
];

export default function About() {
  return (
    <div>
      <SEO
        title="About Me"
        description="Learn about Jennifer Mello, LICSW - a certified trauma therapist with a degree from Smith College, specializing in holistic wellness therapy in Plymouth, MA."
        path="/about"
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
              About Me
            </motion.p>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold mb-4"
              data-testid="text-about-title"
            >
              Jennifer Mello, LICSW
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Certified trauma therapist providing holistic health and wellness
              therapy in Plymouth, Massachusetts
            </motion.p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="lg:w-2/5 shrink-0"
            >
              <div className="sticky top-28">
                <img
                  src="/images/about-bg.png"
                  alt="Jennifer Mello"
                  className="rounded-md w-full mb-6"
                  data-testid="img-about-photo"
                />
                <div className="grid grid-cols-2 gap-3">
                  {credentials.map((cred, i) => (
                    <Card key={cred.title} className="p-4" data-testid={`card-credential-${i}`}>
                      <cred.icon className="w-5 h-5 text-primary mb-2" />
                      <h4 className="text-xs font-semibold mb-0.5">
                        {cred.title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-snug">
                        {cred.description}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="lg:w-3/5"
            >
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed text-base">
                  Over the course of my career, I have supported numerous clients
                  in taking the first step towards healing and growth. As a
                  certified trauma therapist, I provide an atmosphere of support
                  and acceptance to individuals who are experiencing challenges
                  with relationships, anxiety/depression, boundary formation, and
                  self-regulation of emotions.
                </p>

                <p className="text-muted-foreground leading-relaxed text-base">
                  Typically, my clients have identified certain life experiences
                  that have deeply impacted them and, additionally, prevented them
                  from feeling good about themselves or living a happy and
                  satisfying life. They may be aware of issues that seem to keep
                  resurfacing over time, and get in the way of having more
                  positive experiences or forming meaningful relationships with
                  others.
                </p>

                <p className="text-muted-foreground leading-relaxed text-base">
                  I've also often worked with clients who have witnessed or been
                  directly impacted by a single traumatic event that has seemingly
                  forever changed the way they see themselves and how they view the
                  world. What all of my clients have in common, is that they hope
                  to gain some insight and guidance, and to identify what "feeling
                  better" looks like for them.
                </p>

                <h3 className="font-serif text-xl font-semibold text-foreground mt-8 mb-4">
                  My Approach
                </h3>

                <p className="text-muted-foreground leading-relaxed text-base">
                  As a Licensed Independent Clinical Social Worker with a degree
                  from Smith College School for Social Work, I specialize in
                  working with adolescents and adults, providing individual therapy
                  and family consultation in an outpatient private practice in
                  Massachusetts.
                </p>

                <p className="text-muted-foreground leading-relaxed text-base">
                  With a Certificate in Traumatic Stress Studies, I offer holistic
                  health and wellness targeted therapy that aims to heal the whole
                  person, instead of simply targeting their symptoms. My
                  therapeutic style encompasses a broad range of techniques but
                  focuses on psychodynamic and relational approaches to treatment,
                  with the intent of promoting overall holistic health and
                  well-being.
                </p>

                <h3 className="font-serif text-xl font-semibold text-foreground mt-8 mb-4">
                  Mind-Body Healing
                </h3>

                <p className="text-muted-foreground leading-relaxed text-base">
                  Trauma often manifests physically as well as emotionally, so I
                  find it most helpful for my clients to tie in mind-body
                  techniques, while engaging their sensory systems, when working
                  towards a place of coping and healing. This can sometimes include
                  exploring essential oils and natural supplements, yoga,
                  meditation, stretching, aromatherapy, and grounding techniques,
                  as well as other body-based interventions.
                </p>

                <p className="text-muted-foreground leading-relaxed text-base">
                  In my work, I have found that developing an individualized
                  approach to treatment is the best way to meet my client's needs,
                  and is often the most effective way to establish a roadmap for
                  change.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/contact">
                  <Button className="gap-2" data-testid="button-about-contact">
                    Schedule a Consultation
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="outline" className="gap-2" data-testid="button-about-services">
                    View Services
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
