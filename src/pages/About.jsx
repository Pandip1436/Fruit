// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  SparklesIcon,
  StarIcon,
  CheckBadgeIcon,
  LightBulbIcon
} from "@heroicons/react/24/solid";

/* ================= ANIMATIONS ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 }
  }
};

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50">

      {/* ================= HEADER ================= */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 text-center px-6"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          About Fruit Shop 🍎
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
          Fresh fruits delivered with quality, trust, and and care —
          blending tradition with modern convenience.
        </p>
      </motion.section>

      {/* ================= MISSION & VISION ================= */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 py-20"
      >
        <h2 className="text-xl font-semibold text-center mb-16">
          Our Mission & Vision
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* CARD */}
          <motion.div
            variants={fadeUp}
            className="relative rounded-2xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-t-2xl" />

            <div className="p-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 shadow">
                <SparklesIcon className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Our Mission</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                To deliver farm-fresh fruits with premium quality, hygienic handling,
                and reliable service that customers can trust every day.
              </p>
            </div>
          </motion.div>

          {/* CARD */}
          <motion.div
            variants={fadeUp}
            className="relative rounded-2xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-2xl" />

            <div className="p-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 shadow">
                <StarIcon className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Our Vision</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                To become a trusted destination for fresh fruit shopping by
                combining traditional sourcing with modern digital convenience.
              </p>
            </div>
          </motion.div>

        </div>
      </motion.section>

      {/* ================= CORE VALUES ================= */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 py-20"
      >
        <h2 className="text-xl font-semibold text-center mb-16">
          Our Core Values
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* VALUE CARD */}
          {[
            {
              title: "Quality",
              icon: CheckBadgeIcon,
              color: "from-yellow-400 to-orange-500",
              bg: "bg-yellow-100 text-yellow-600",
              text: "Every fruit is carefully selected to meet high standards of freshness and safety."
            },
            {
              title: "Trust",
              icon: CheckBadgeIcon,
              color: "from-blue-400 to-indigo-500",
              bg: "bg-blue-100 text-blue-600",
              text: "Built on transparency, honest pricing, and consistent customer satisfaction."
            },
            {
              title: "Innovation",
              icon: LightBulbIcon,
              color: "from-green-400 to-emerald-500",
              bg: "bg-green-100 text-green-600",
              text: "Blending traditional fruit sourcing with smart inventory and modern shopping."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="relative rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition"
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.color} rounded-t-2xl`} />

              <div className="p-8 text-center">
                <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full ${item.bg} shadow`}>
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}

        </div>
      </motion.section>

    </div>
  );
}

export default About;
