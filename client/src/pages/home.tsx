import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Brain, Leaf, Users, Headphones, MapPin } from "lucide-react";
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

const services = [
  {
    icon: Brain,
    title: "Trauma Therapy",
    description:
      "Certified trauma treatment using evidence-based approaches to help you process difficult experiences and reclaim your sense of safety.",
  },
  {
    icon: Heart,
    title: "Anxiety & Depression",
    description:
      "Compassionate support for managing anxiety and depression through personalized therapeutic strategies and coping techniques.",
  },
  {
    icon: Users,
    title: "Relationship Support",
    description:
      "Guidance for building healthier relationships, setting boundaries, and developing deeper connections with the people in your life.",
  },
  {
    icon: Leaf,
    title: "Holistic Wellness",
    description:
      "Mind-body approaches including meditation, grounding techniques, aromatherapy, and natural supplements for whole-person healing.",
  },
];

export default function Home() {
  return (
    <div>
      <SEO
        title="Certified Trauma Therapy"
        description="Jennifer Mello, LICSW provides certified trauma therapy, anxiety and depression treatment, and holistic wellness counseling in Plymouth, Massachusetts."
        path="/"
      />
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/hero-bg.png)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white/70 text-sm uppercase tracking-[0.2em] mb-4"
          >
            Certified Trauma Therapy in Plymouth, MA
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-semibold leading-tight mb-6"
            data-testid="text-hero-title"
          >
            Helping You Gain
            <br />
            <span className="italic font-normal">Power in Your Life</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/80 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto"
          >
            Sometimes, the best way forward is just to begin. I provide a safe,
            supportive space for healing, growth, and self-discovery.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link href="/contact">
              <Button
                className="gap-2 px-6"
                data-testid="button-hero-consultation"
              >
                Free Consultation
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="outline"
                className="border-white/30 text-white bg-white/10 backdrop-blur-sm px-6"
                data-testid="button-hero-learn"
              >
                Learn About My Approach
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-1.5 bg-white/60 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      <section className="py-16 sm:py-24" data-testid="section-welcome">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={0}
              className="lg:w-2/5 shrink-0"
            >
              <div className="relative">
                <img
                  src="/images/about-bg.png"
                  alt="Botanical artwork"
                  className="rounded-md w-full"
                  data-testid="img-welcome"
                />
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="lg:w-3/5"
            >
              <motion.p
                variants={fadeUp}
                custom={1}
                className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-3"
              >
                Welcome
              </motion.p>
              <motion.h2
                variants={fadeUp}
                custom={2}
                className="font-serif text-3xl sm:text-4xl font-semibold mb-6 leading-snug"
                data-testid="text-welcome-heading"
              >
                I'm so happy you're here.
              </motion.h2>
              <motion.div variants={fadeUp} custom={3}>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  When I started my practice, at the root of everything I did, I
                  held my clients in mind. Not only is this space a way for me to
                  introduce myself to you, it's also FOR you. I hope you find a
                  sense of peace, belonging, and guidance if that is what you seek.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Please feel free to check out my resources page with some links
                  that you may find helpful, and don't hesitate to reach out should
                  you decide you'd like to connect. Sometimes, the best way forward
                  is just to begin.
                </p>
              </motion.div>
              <motion.div variants={fadeUp} custom={4}>
                <Link href="/about">
                  <Button variant="outline" className="gap-2" data-testid="button-learn-more">
                    More About Me
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        className="py-16 sm:py-24 bg-card border-y border-border"
        data-testid="section-services-preview"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-12"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-3"
            >
              How I Can Help
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-serif text-3xl sm:text-4xl font-semibold mb-4"
              data-testid="text-services-heading"
            >
              Areas of Specialization
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              I specialize in holistic, individualized therapy that aims to heal
              the whole person, not simply target symptoms.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                variants={fadeUp}
                custom={i}
              >
                <Card
                  className="p-6 sm:p-8 hover-elevate cursor-default h-full"
                  data-testid={`card-service-${i}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                      <service.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{service.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={5}
            className="text-center mt-10"
          >
            <Link href="/services">
              <Button variant="outline" className="gap-2" data-testid="button-view-services">
                View All Services
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-24" data-testid="section-quote">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div variants={fadeUp} custom={0}>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
                <Heart className="w-5 h-5 text-primary" />
              </div>
            </motion.div>
            <motion.blockquote
              variants={fadeUp}
              custom={1}
              className="font-serif text-2xl sm:text-3xl italic text-foreground leading-relaxed mb-6"
              data-testid="text-quote"
            >
              "We can do small things with great love."
            </motion.blockquote>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-sm text-muted-foreground"
            >
              &mdash; Mother Teresa
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-card border-y border-border" data-testid="section-testimonials">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-12"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-3"
            >
              Client Experiences
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-serif text-3xl sm:text-4xl font-semibold"
              data-testid="text-testimonials-heading"
            >
              What Clients Say
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                quote:
                  "Jennifer has a gift for making you feel truly seen and heard. Her holistic approach helped me connect the dots between my mind and body in ways I never expected.",
                author: "S.M.",
              },
              {
                quote:
                  "I was nervous to start therapy, but Jennifer made the process feel safe and completely judgment-free from day one. I've grown so much through our work together.",
                author: "T.R.",
              },
              {
                quote:
                  "Her trauma-informed approach is thoughtful and compassionate. I finally feel like I have real tools to move forward. I can't recommend her enough.",
                author: "A.L.",
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20px" }}
                variants={fadeUp}
                custom={i}
              >
                <Card
                  className="p-6 sm:p-8 h-full flex flex-col"
                  data-testid={`card-testimonial-${i}`}
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <svg
                        key={s}
                        className="w-4 h-4 text-primary fill-primary"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-sm text-muted-foreground leading-relaxed flex-1 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <p className="mt-4 text-sm font-medium" data-testid={`text-testimonial-author-${i}`}>
                    — {testimonial.author}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24" data-testid="section-announcements">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-12"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-3"
            >
              For Current Clients
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-serif text-3xl sm:text-4xl font-semibold"
            >
              Client Portals
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
            >
              <a
                href="https://jmellolicsw.clientsecure.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <Card className="p-6 sm:p-8 h-full hover-elevate cursor-pointer" data-testid="card-announcement-portal">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                      <Leaf className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Client Portal</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Access your secure client account to manage appointments,
                        complete intake forms, and view session information.
                      </p>
                    </div>
                  </div>
                </Card>
              </a>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
            >
              <a
                href="https://doxy.me/v2/check-in/jmellolicsw/"
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <Card className="p-6 sm:p-8 h-full hover-elevate cursor-pointer" data-testid="card-announcement-telehealth">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                      <Headphones className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Telehealth Sessions
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Join your virtual therapy session through Doxy.me, a secure
                        and HIPAA-compliant telehealth platform. No downloads
                        required.
                      </p>
                    </div>
                  </div>
                </Card>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        className="relative py-20 sm:py-28 overflow-hidden"
        data-testid="section-cta"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/services-bg.png)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="font-serif text-3xl sm:text-4xl text-white font-semibold mb-4"
            >
              Ready to Take the First Step?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="text-white/80 mb-8 leading-relaxed"
            >
              I offer free consultations to discuss your needs and my approach to
              care. Let's see if working together might be a good fit.
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={2}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <Link href="/contact">
                <Button className="gap-2 px-6" data-testid="button-cta-contact">
                  Get In Touch
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="tel:+15085910569">
                <Button
                  variant="outline"
                  className="border-white/30 text-white bg-white/10 backdrop-blur-sm gap-2 px-6"
                  data-testid="button-cta-call"
                >
                  <MapPin className="w-4 h-4" />
                  Plymouth, MA
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
