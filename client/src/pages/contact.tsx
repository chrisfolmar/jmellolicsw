import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { SEO } from "@/components/seo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema } from "@shared/schema";
import type { InsertContact } from "@shared/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "(508) 591-0569",
    href: "tel:+15085910569",
  },
  {
    icon: Mail,
    label: "Email",
    value: "jmellolicsw@gmail.com",
    href: "mailto:jmellolicsw@gmail.com",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "225 Water Street, Suite B239\nPlymouth, MA 02360",
    href: null,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon - Thursday\n10:00 AM - 7:00 PM",
    href: null,
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      setSubmitted(true);
      form.reset();
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <SEO
        title="Contact"
        description="Schedule a free consultation with Jennifer Mello, LICSW. Contact us by phone, email, or form to discuss therapy services in Plymouth, MA."
        path="/contact"
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
              Let's Connect
            </motion.p>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold mb-4"
              data-testid="text-contact-title"
            >
              Get In Touch
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-xl mx-auto leading-relaxed"
            >
              Please call or use the form below to set up a free consultation. I
              would be happy to discuss your needs and my approach to care to see
              if working together might be a good fit.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mb-8 sm:mb-10"
          >
            <img
              src="/images/office-inside.png"
              alt="A warm, comfortable therapy office with blue armchairs, natural light, and calming artwork"
              className="w-full h-64 sm:h-80 object-cover rounded-lg"
              data-testid="img-office-inside"
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2 space-y-4"
            >
              {contactInfo.map((item) => (
                <Card key={item.label} className="p-5" data-testid={`card-contact-${item.label.toLowerCase()}`}>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm font-medium hover:text-primary transition-colors whitespace-pre-line"
                          data-testid={`link-contact-${item.label.toLowerCase()}`}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium whitespace-pre-line">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}

              <div className="overflow-hidden rounded-lg" data-testid="img-office-outside-wrapper">
                <img
                  src="/images/office-outside.png"
                  alt="225 Water Street building exterior in Plymouth, MA — home of Jennifer Mello LICSW's office"
                  className="w-full h-36 object-cover"
                  data-testid="img-office-outside"
                />
              </div>

              <a
                href="https://www.instagram.com/jennifermellolicsw/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card className="p-5 hover-elevate cursor-pointer" data-testid="card-contact-instagram">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                      <Instagram className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                        Instagram
                      </p>
                      <p className="text-sm font-medium">
                        @jennifermellolicsw
                      </p>
                    </div>
                  </div>
                </Card>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-3"
            >
              <Card className="p-6 sm:p-8" data-testid="card-contact-form">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-7 h-7 text-primary" />
                    </div>
                    <h3
                      className="font-serif text-2xl font-semibold mb-2"
                      data-testid="text-form-success"
                    >
                      Message Sent
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for reaching out. I'll get back to you as soon
                      as possible.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setSubmitted(false)}
                      data-testid="button-send-another"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name <span className="text-destructive">*</span></FormLabel>
                              <FormControl>
                                <Input placeholder="Your full name" data-testid="input-name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email <span className="text-destructive">*</span></FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="you@example.com" data-testid="input-email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone (optional)</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="(555) 555-5555" data-testid="input-phone" {...field} value={field.value ?? ""} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell me a little about what you're looking for..."
                                rows={5}
                                className="resize-none"
                                data-testid="input-message"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full gap-2"
                        disabled={mutation.isPending}
                        data-testid="button-submit-contact"
                      >
                        {mutation.isPending ? (
                          "Sending..."
                        ) : (
                          <>
                            Send Message
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        Your information is kept confidential and will only be
                        used to respond to your inquiry.
                      </p>
                    </form>
                  </Form>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
