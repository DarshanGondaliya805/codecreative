import { motion } from "framer-motion";

const fadeUp:any = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

const stagger:any = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

export default function EcommercePage() {
    return (
        <div className="bg-[#fdf7f4] text-[#1c110b] overflow-hidden">

            {/* HERO */}
            <section className="relative min-h-[90vh] flex items-center px-6 py-20">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        animate="show"
                        className="space-y-8"
                    >
                        <motion.h1
                            variants={fadeUp}
                            className="text-5xl md:text-7xl font-bold leading-tight"
                        >
                            Powerful <span className="text-[#f5611b]">E-Commerce</span> Solutions
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            className="text-lg text-gray-600 max-w-xl"
                        >
                            Scalable, secure, high-performance stores engineered to convert.
                        </motion.p>

                        <motion.div variants={fadeUp} className="flex gap-4">
                            <button className="bg-[#f5611b] text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition">
                                Start Store
                            </button>
                            <button className="border px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition">
                                Free Consultation
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* IMAGE */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hidden lg:block"
                    >
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhd8JkudXe0dgo6Ne5I7qSvP-zarfA5JKdJp2PWyZnKsYnUfkXTQkF7o8CeHkyjB3hMf0-I7lrYq8DjxRVIPFkhNeE0sspF3fxO6IQ5oNh7WQCiYGVF-6J0ftoANx7QtvQOW_OxpQBdXfVC8m6XDu4jst6ICmmALw00a36t1aEjnThgMmVKJpSqUMdJ9k2ABXqQORsfd76Os4oPU_EJPBOLV8HEgUDFfTKthRSApHK2aFqsE927ftcKTfu7HXCu9609IbNqXVEbws"
                            className="rounded-3xl shadow-2xl"
                        />
                    </motion.div>
                </div>
            </section>

            {/* SERVICES */}
            <section className="py-24 px-6 bg-white">
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {[
                        "Custom Web Dev",
                        "Shopify Experts",
                        "Headless Commerce",
                        "Magento / Adobe",
                        "API Integration",
                        "E-Commerce Apps",
                        "Multi-Vendor",
                        "Fast Checkout",
                    ].map((title, i) => (
                        <motion.div
                            key={i}
                            variants={fadeUp}
                            whileHover={{ scale: 1.05 }}
                            className="p-8 rounded-3xl border bg-[#fff7f3] hover:shadow-xl transition"
                        >
                            <h3 className="font-bold text-lg mb-3">{title}</h3>
                            <p className="text-sm text-gray-600">
                                High-performance scalable solution tailored for your business.
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* PLATFORM */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">

                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2 p-10 rounded-3xl bg-[#fff7f3]"
                    >
                        <h3 className="text-3xl font-bold mb-4">
                            Tech-Agnostic Approach
                        </h3>
                        <p className="text-gray-600 mb-6">
                            We select the right platform for your business.
                        </p>

                        <div className="flex gap-4 flex-wrap">
                            {["Shopify", "WooCommerce", "Magento", "BigCommerce"].map(
                                (p, i) => (
                                    <span
                                        key={i}
                                        className="px-4 py-2 bg-white rounded-xl border text-sm font-semibold"
                                    >
                                        {p}
                                    </span>
                                )
                            )}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="p-10 rounded-3xl bg-[#f5611b] text-white"
                    >
                        <h3 className="text-2xl font-bold mb-4">Fort Knox Security</h3>
                        <p>PCI-DSS compliant architecture with advanced protection.</p>
                    </motion.div>
                </div>
            </section>

            {/* PROCESS */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
                    {["Analysis", "Design", "Development", "Integration", "Testing", "Launch"].map(
                        (step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-6 rounded-2xl border hover:shadow-lg transition"
                            >
                                <div className="text-xl font-bold mb-2">
                                    {String(i + 1).padStart(2, "0")}
                                </div>
                                <h4 className="font-semibold">{step}</h4>
                            </motion.div>
                        )
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="max-w-7xl mx-auto bg-[#f5611b] text-white rounded-3xl p-16 text-center"
                >
                    <h2 className="text-4xl font-bold mb-6">
                        Ready to Launch Your Store?
                    </h2>
                    <button className="bg-white text-[#f5611b] px-10 py-4 rounded-xl font-bold hover:scale-105 transition">
                        Build My Store
                    </button>
                </motion.div>
            </section>

            {/* CONTACT */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">

                    <div>
                        <h2 className="text-4xl font-bold mb-6">
                            Let's Discuss Your Project
                        </h2>
                        <p className="text-gray-600">
                            Reach out for a specialized technical audit.
                        </p>
                    </div>

                    <motion.form
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="p-10 rounded-3xl border space-y-6"
                    >
                        <input
                            placeholder="Full Name"
                            className="w-full p-3 rounded-lg border"
                        />
                        <input
                            placeholder="Email"
                            className="w-full p-3 rounded-lg border"
                        />
                        <textarea
                            placeholder="Project Details"
                            className="w-full p-3 rounded-lg border"
                        />

                        <button className="w-full bg-[#f5611b] text-white py-4 rounded-xl font-bold">
                            Submit Inquiry
                        </button>
                    </motion.form>
                </div>
            </section>

        </div>
    );
}