import React from "react";
import { motion } from "framer-motion";

const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const ContactPage: React.FC = () => {
  return (
    <div className="bg-surface text-on-surface font-body">
      {/* HERO */}
      <section className="pt-32 pb-20 px-8 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="max-w-3xl"
        >
          <span className="text-xs uppercase tracking-widest text-primary">
            Get in touch
          </span>

          <h1 className="text-5xl md:text-7xl font-headline font-bold mt-6">
            Contact Us
          </h1>

          <p className="text-xl mt-6 text-on-surface-variant">
            Have a project in mind? Let’s talk and build something amazing
            together.
          </p>
        </motion.div>
      </section>

      {/* CONTACT CARDS */}
      <section className="px-8 pb-24 max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
        {[
          {
            title: "Email",
            desc: "Drop us a line anytime.",
            value: "hello@neuralagency.io",
          },
          {
            title: "Phone",
            desc: "Mon-Fri from 8am to 5pm.",
            value: "+1 (555) 000-1234",
          },
          {
            title: "Location",
            desc: "Visit our SF headquarters.",
            value: "San Francisco, CA",
          },
        ].map((card, i) => (
          <motion.div
            key={card.title}
            custom={i}
            initial="hidden"
            whileInView="show"
            variants={fadeUp}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10"
          >
            <h3 className="text-xl font-bold mb-2">{card.title}</h3>
            <p className="text-on-surface-variant mb-4">{card.desc}</p>
            <p className="text-primary font-bold">{card.value}</p>
          </motion.div>
        ))}
      </section>

      {/* FORM + MAP */}
      <section className="px-8 pb-32 max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="lg:col-span-7 bg-surface-container-low p-10 rounded-xl"
        >
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input className="input" placeholder="Name" />
              <input className="input" placeholder="Email" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <input className="input" placeholder="Phone" />
              <select className="input">
                <option>UI/UX Design</option>
                <option>Frontend</option>
                <option>Backend</option>
              </select>
            </div>

            <textarea className="input h-32" placeholder="Message" />

            <motion.button
              whileTap={{ scale: 0.97 }}
              className="w-full py-5 bg-primary-container rounded-xl font-bold"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* MAP */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="lg:col-span-5"
        >
          <div className="h-[400px] rounded-xl overflow-hidden relative">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCTW4TKKsE2UNIoSGn892DO7zCn6fmgu5_pNGGmLLGr66EcfXkBM9QxVKnK6FCksZYOM4u0G45HyBR6vX2R14aMQa1fK-Br0sIFP9r5F2Tk38gP4PjSJa7Bnot9NAiFCy3qEgJPBPz9sW6IJTsAC05gcG9gVhVHZOpyt9r8OM3WGbkf_HgmBb_nRPYddeiH-4Xgv9UVAQ6nPOrWmtoQQ0N8LP2GozvXuSCQpZd2HFE2gCmqFEC0atzaD8dMUuWdIQL1f64RnZ7048"
              className="w-full h-full object-cover opacity-50"
            />

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              📍
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="bg-surface-container-low py-24 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          {[
            "What is your typical response time?",
            "Do you offer global support?",
            "What services do you specialize in?",
          ].map((q, i) => (
            <motion.details
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mb-4 bg-surface-container p-6 rounded-xl"
            >
              <summary className="cursor-pointer font-bold">{q}</summary>
              <p className="mt-4 text-on-surface-variant">
                We respond within 24 hours and provide top-tier services.
              </p>
            </motion.details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-primary-container to-secondary-container p-16 rounded-3xl"
        >
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>

          <div className="flex gap-4 justify-center">
            <button className="btn-primary">Hire Experts</button>
            <button className="btn-secondary">Book a Call</button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ContactPage;