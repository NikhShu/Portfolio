"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Send,
  Download,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { PersonalInfo } from "@/lib/content";

interface ContactProps {
  contact: PersonalInfo;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact({ contact }: ContactProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const validateForm = (formData: FormData): FormErrors => {
    const errors: FormErrors = {};
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    if (!name || name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Valid email is required";
    }
    if (!subject || subject.trim().length < 2) {
      errors.subject = "Subject must be at least 2 characters";
    }
    if (!message || message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    return errors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError("");
    setFormErrors({});

    const formData = new FormData(e.currentTarget);
    const errors = validateForm(formData);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors && Array.isArray(data.errors)) {
          setServerError(data.errors.join(". "));
        } else {
          setServerError("Failed to send message. Please try again.");
        }
        return;
      }

      setSubmitted(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setSubmitted(false), 8000);
    } catch {
      setServerError(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-surface/50">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading title="Get In Touch" subtitle="Contact" />

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left - Info */}
          <AnimatedSection className="lg:col-span-2" direction="left">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-text mb-2">
                  Let&apos;s work together
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  I&apos;m always open to discussing new opportunities, research
                  collaborations, or interesting projects. Feel free to reach
                  out!
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-border-light transition-all group"
                >
                  <div className="p-2.5 rounded-xl bg-primary-muted text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-text-tertiary">Email</p>
                    <p className="text-sm font-medium text-text">
                      {contact.email}
                    </p>
                  </div>
                </a>

                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-border-light transition-all group"
                >
                  <div className="p-2.5 rounded-xl bg-primary-muted text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-text-tertiary">LinkedIn</p>
                    <p className="text-sm font-medium text-text">
                      /in/niii-khil
                    </p>
                  </div>
                </a>

                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-border-light transition-all group"
                >
                  <div className="p-2.5 rounded-xl bg-primary-muted text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-text-tertiary">GitHub</p>
                    <p className="text-sm font-medium text-text">NikhShu</p>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                  <div className="p-2.5 rounded-xl bg-accent-muted text-accent">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-text-tertiary">Location</p>
                    <p className="text-sm font-medium text-text">India</p>
                  </div>
                </div>
              </div>

              <a
                href={contact.resumePath}
                download
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover transition-colors w-full justify-center"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </div>
          </AnimatedSection>

          {/* Right - Form */}
          <AnimatedSection
            className="lg:col-span-3"
            direction="right"
            delay={0.2}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center p-12 rounded-2xl border border-success/30 bg-success/5 text-center h-full"
              >
                <CheckCircle2 className="w-12 h-12 text-success mb-4" />
                <h3 className="text-lg font-semibold text-text mb-2">
                  Message Sent!
                </h3>
                <p className="text-sm text-text-secondary max-w-sm">
                  Thank you for reaching out. I&apos;ll get back to you as soon
                  as possible.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Server error */}
                {serverError && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-danger/5 border border-danger/20 text-sm text-danger">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{serverError}</span>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-text-secondary mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Your name"
                      className={`w-full px-4 py-3 rounded-xl bg-card border text-text placeholder:text-text-tertiary focus:outline-none focus:ring-1 transition-all ${
                        formErrors.name
                          ? "border-danger/50 focus:border-danger/50 focus:ring-danger/20"
                          : "border-border focus:border-primary/50 focus:ring-primary/20"
                      }`}
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-xs text-danger">
                        {formErrors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-text-secondary mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="your@email.com"
                      className={`w-full px-4 py-3 rounded-xl bg-card border text-text placeholder:text-text-tertiary focus:outline-none focus:ring-1 transition-all ${
                        formErrors.email
                          ? "border-danger/50 focus:border-danger/50 focus:ring-danger/20"
                          : "border-border focus:border-primary/50 focus:ring-primary/20"
                      }`}
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-xs text-danger">
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-text-secondary mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    placeholder="What is this about?"
                    className={`w-full px-4 py-3 rounded-xl bg-card border text-text placeholder:text-text-tertiary focus:outline-none focus:ring-1 transition-all ${
                      formErrors.subject
                        ? "border-danger/50 focus:border-danger/50 focus:ring-danger/20"
                        : "border-border focus:border-primary/50 focus:ring-primary/20"
                    }`}
                  />
                  {formErrors.subject && (
                    <p className="mt-1 text-xs text-danger">
                      {formErrors.subject}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-text-secondary mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Your message..."
                    className={`w-full px-4 py-3 rounded-xl bg-card border text-text placeholder:text-text-tertiary focus:outline-none focus:ring-1 transition-all resize-none ${
                      formErrors.message
                        ? "border-danger/50 focus:border-danger/50 focus:ring-danger/20"
                        : "border-border focus:border-primary/50 focus:ring-primary/20"
                    }`}
                  />
                  {formErrors.message && (
                    <p className="mt-1 text-xs text-danger">
                      {formErrors.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover transition-colors w-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
