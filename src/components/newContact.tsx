// ContactSection.tsx
// npm install framer-motion lottie-react
// Add to index.html:
// <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/>

"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import contactus from "../assets/lottie/contactus.json"


// ─── Types ───────────────────────────────────────────────────────────────────
interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

interface ContactInfoCardProps {
  icon: string;
  label: string;
  value: string;
  delay?: number;
}

// ─── Contact Info Card ────────────────────────────────────────────────────────
const ContactInfoCard: React.FC<ContactInfoCardProps> = ({ icon, label, value, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(70,72,212,0.14)" }}
    style={{
      flex: 1,
      display: "flex",
      alignItems: "center",
      gap: 14,
      background: "#fff",
      borderRadius: 16,
      padding: "14px 18px",
      border: "1px solid rgba(70,72,212,0.1)",
      boxShadow: "0 2px 12px rgba(70,72,212,0.06)",
      cursor: "pointer",
      transition: "box-shadow 0.3s",
    }}
  >
    <motion.div
      whileHover={{ scale: 1.08 }}
      style={{
        width: 42, height: 42, borderRadius: 12,
        background: "#ec5b13",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, fontSize: 18,
      }}
    >
      {icon}
    </motion.div>
    <div>
      <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#767586", marginBottom: 3 }}>
        {label}
      </div>
      <div style={{ fontFamily: " sans-serif", fontSize: 13, fontWeight: 700, color: "#171c1f" }}>
        {value}
      </div>
    </div>
  </motion.div>
);

// ─── Animated Form Field ──────────────────────────────────────────────────────
interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  delay?: number;
  inView?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ label, children, delay = 0, inView = true }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    style={{ display: "flex", flexDirection: "column", gap: 6 }}
  >
    <label style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "#464554", marginLeft: 2 }}>
      {label}
    </label>
    {children}
  </motion.div>
);

// ─── Input styles (shared) ────────────────────────────────────────────────────
const inputBase: React.CSSProperties = {
  width: "100%",
  background: "#f0f4f8",
  border: "1.5px solid transparent",
  borderRadius: 12,
  padding: "13px 16px",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 14,
  color: "#171c1f",
  outline: "none",
  transition: "border 0.2s, background 0.2s, box-shadow 0.2s",
};

// ─── Main ContactSection ──────────────────────────────────────────────────────
const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const leftInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const formInView = useInView(formRef, { once: true, margin: "-60px" });

  const [formData, setFormData] = useState<FormData>({ name: "", phone: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSubmitted(true); }, 1300);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({ name: "", phone: "", email: "", service: "", message: "" });
  };

  const getFocusStyle = (field: string): React.CSSProperties =>
    focusedField === field
      ? { borderColor: "rgba(70,72,212,0.4)", background: "#fff", boxShadow: "0 0 0 4px rgba(70,72,212,0.08)" }
      : {};

  return (
    <>
     

      <section
        ref={sectionRef}
        style={{
          padding: "80px 24px",
          position: "relative",
          overflow: "hidden",
          background: "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(70,72,212,0.07), transparent)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Mesh background */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, #4648d4 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }} />

        {/* Glow orbs */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", top: -100, right: -60, width: 400, height: 400, borderRadius: "50%",
            background: "rgba(70,72,212,0.09)", filter: "blur(80px)", pointerEvents: "none",
          }}
        />
        <div style={{
          position: "absolute", bottom: -80, left: -60, width: 320, height: 320, borderRadius: "50%",
          background: "rgba(96,99,238,0.07)", filter: "blur(80px)", pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", position: "relative", zIndex: 1 }}>

          {/* ── LEFT COLUMN ── */}
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            animate={leftInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: 28 }}
          >
            {/* Heading */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={leftInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.1 }}
                className="text-primary"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 10, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase" as const}}
              >
                <motion.span
                  animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  style={{ width: 6, height: 6, borderRadius: "50%", background: "#ec5b13", display: "inline-block" }}
                />
                Get In Touch
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={leftInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontFamily: " sans-serif", fontSize: "clamp(28px,4vw,46px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#171c1f", lineHeight: 1.1, margin: 0 }}
              >
                Let's Build{" "}
                <span className="text-primary">Something Great</span> Together
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={leftInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 }}
                style={{ fontSize: 15, color: "#464554", lineHeight: 1.7, maxWidth: 420, margin: 0 }}
              >
                We're here to help you turn your ideas into scalable digital solutions. Reach out and let's start the conversation.
              </motion.p>
            </div>

            {/* ── Lottie Box ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={leftInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "relative",
                background: "linear-gradient(135deg, #f0f4ff, #e8ecff)",
                borderRadius: 28,
                border: "1px solid rgba(70,72,212,0.12)",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px 8px 0",
                minHeight: 280,
              }}
            >
              {/* Decorative radial behind lottie */}
              <div style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(circle at 50% 80%, rgba(70,72,212,0.08), transparent 60%)",
                pointerEvents: "none",
              }} />

              {/* Floating bubbles decoration */}
              {[
                { top: "12%", left: "8%", size: 48, delay: 0 },
                { top: "20%", right: "10%", size: 32, delay: 0.5 },
                { bottom: "18%", left: "12%", size: 24, delay: 1 },
              ].map((b, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: b.delay }}
                  style={{
                    position: "absolute",
                    top: (b as any).top,
                    left: (b as any).left,
                    right: (b as any).right,
                    bottom: (b as any).bottom,
                    width: b.size,
                    height: b.size,
                    borderRadius: "50%",
                    background: "#ec5b13",
                    border: "1px solid rgba(70,72,212,0.12)",
                  }}
                />
              ))}

              {/* ✅ Real lottie-react Lottie component */}
              <div style={{ width: "100%", maxWidth: 320, position: "relative", zIndex: 1 }}>
                <Lottie
                  animationData={contactus}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </motion.div>

            {/* Contact Info Cards */}
            <div style={{ display: "flex", gap: 14 }}>
              <ContactInfoCard icon="✉️" label="Email us" value="info@codecreative.com" delay={0.4} />
              <ContactInfoCard icon="📞" label="Call us" value="+91 9998677347" delay={0.5} />
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN: Form ── */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 48 }}
            animate={leftInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: "rgba(255,255,255,0.78)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              borderRadius: 28,
              padding: "40px 36px",
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0 24px 80px rgba(23,28,31,0.07)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top gradient bar */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 3,
              background: "linear-gradient(90deg,#4648d4,#6063ee,#4648d4)",
              borderRadius: "28px 28px 0 0",
            }} />

            {/* ── Success overlay ── */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: "absolute", inset: 0, borderRadius: 28,
                    background: "#ec5b13",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", gap: 16, zIndex: 10,
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
                    style={{ fontSize: 56 }}
                  >
                    ✅
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{ fontFamily: " sans-serif", fontSize: 24, fontWeight: 900, color: "#fff", textAlign: "center" }}
                  >
                    Message Sent!
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", textAlign: "center" }}
                  >
                    We'll get back to you within 24 hours.
                  </motion.div>
                  <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ background: "rgba(255,255,255,0.3)" }}
                    whileTap={{ scale: 0.96 }}
                    onClick={resetForm}
                    style={{
                      marginTop: 8,
                      background: "rgba(255,255,255,0.18)",
                      border: "1px solid rgba(255,255,255,0.3)",
                      color: "#FFF",
                      borderRadius: 12,
                      padding: "11px 28px",
                      fontFamily: " sans-serif",
                      fontWeight: 700,
                      fontSize: 14,
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                  >
                    Send another →
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form title */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div style={{ fontFamily: " sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", color: "#ec5b13", marginBottom: 4 }}>
                Send us a message
              </div>
              <div style={{ fontSize: 13, color: "#767586", marginBottom: 28 }}>
                Fill out the form and we'll be in touch soon.
              </div>
            </motion.div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Name + Phone */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <FormField label="Full Name" delay={0.15} inView={formInView}>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={handleChange("name")}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="John Doe"
                    required
                    style={{ ...inputBase, ...getFocusStyle("name") }}
                  />
                </FormField>
                <FormField label="Phone Number" delay={0.2} inView={formInView}>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange("phone")}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="+1 (555) 000-0000"
                    style={{ ...inputBase, ...getFocusStyle("phone") }}
                  />
                </FormField>
              </div>

              {/* Email */}
              <FormField label="Email Address" delay={0.25} inView={formInView}>
                <input
                  type="email"
                  value={formData.email}
                  onChange={handleChange("email")}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="john@company.com"
                  required
                  style={{ ...inputBase, ...getFocusStyle("email") }}
                />
              </FormField>

              {/* Service */}
              <FormField label="Service" delay={0.3} inView={formInView}>
                <select
                  value={formData.service}
                  onChange={handleChange("service")}
                  onFocus={() => setFocusedField("service")}
                  onBlur={() => setFocusedField(null)}
                  style={{ ...inputBase, ...getFocusStyle("service"), appearance: "none" as const, cursor: "pointer" }}
                >
                  <option value="" disabled>Select a service...</option>
                  <option>Web Development</option>
                  <option>Mobile App</option>
                  <option>API & Microservices</option>
                  <option>UI/UX Design</option>
                  <option>Other</option>
                </select>
              </FormField>

              {/* Message */}
              <FormField label="Message" delay={0.35} inView={formInView}>
                <textarea
                  value={formData.message}
                  onChange={handleChange("message")}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="How can we help you?"
                  rows={4}
                  style={{ ...inputBase, ...getFocusStyle("message"), resize: "none" }}
                />
              </FormField>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={sending}
                whileHover={!sending ? { y: -2, scale: 1.01, boxShadow: "0 14px 36px rgba(70,72,212,0.4)" } : {}}
                whileTap={!sending ? { scale: 0.97 } : {}}
                style={{
                  marginTop: 6,
                  background: "linear-gradient(135deg,#4648d4,#6063ee)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 14,
                  padding: "15px 24px",
                  fontFamily: " sans-serif",
                  fontSize: 16,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  cursor: sending ? "not-allowed" : "pointer",
                  boxShadow: "0 8px 28px rgba(70,72,212,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  position: "relative",
                  overflow: "hidden",
                  opacity: sending ? 0.8 : 1,
                }}
              >
                {/* Shine overlay */}
                <div style={{
                  position: "absolute", inset: 0, borderRadius: "inherit",
                  background: "#ec5b13",
                  pointerEvents: "none",
                }} />
                <span style={{ position: "relative", zIndex: 1 }}>
                  {sending ? "⏳ Sending..." : "Send Message"}
                </span>
                {!sending && (
                  <motion.span
                    whileHover={{ x: 4 }}
                    style={{ position: "relative", zIndex: 1, fontSize: 20 }}
                  >
                    →
                  </motion.span>
                )}
              </motion.button>
            </form>

            {/* Response note */}
            <div style={{ textAlign: "center", fontSize: 12, color: "#767586", marginTop: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
              ⏱ We usually respond within 24 hours
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  SETUP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

npm install framer-motion lottie-react

To use the FULL customer-support Lottie:
1. Save document 6 JSON as /public/lottie/customer-support.json
2. Replace the inline customerSupportLottie object with:

   import customerSupportLottie from "@/public/lottie/customer-support.json"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/