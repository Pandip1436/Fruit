/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  SparklesIcon, 
  HeartIcon, 
  ShieldCheckIcon, 
  TruckIcon,
  GlobeAltIcon,
  UserGroupIcon 
} from "@heroicons/react/24/outline";

/* --- ANIMATION VARIANTS --- */
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

function About() {
  return (
    <div className="bg-[#FCFCFD] text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* 1. HERO SECTION: THE VISION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6">
        {/* Abstract Background Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-[120px] mix-blend-multiply animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-2000" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 max-w-5xl text-center"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-8 text-[11px] font-black tracking-[0.4em] uppercase bg-slate-900 text-white rounded-full shadow-xl shadow-slate-200"
          >
             Premium Quality
          </motion.span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 leading-[0.9] mb-8">
            Elevating the <br /> 
            <span className="text-emerald-600 italic font-serif">Harvest Experience.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            We bridge the gap between organic orchards and your doorstep, 
            redefining freshness through technology and tradition.
          </p>
        </motion.div>
      </section>

      {/* 2. STATS BAR: SOCIAL PROOF */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { label: "Active Farmers", val: "150+" },
            { label: "Quality Checks", val: "100%" },
            { label: "Daily Deliveries", val: "2.4k" },
            { label: "States Served", val: "12" },
          ].map((stat, i) => (
            <div key={i} className="text-center border-r last:border-none border-slate-800">
              <h4 className="text-4xl font-black text-white mb-1 tracking-tight">{stat.val}</h4>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CORE STORY: IMAGE + TEXT */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={container}
            className="space-y-10"
          >
            <motion.h2 variants={item} className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Rooted in trust, <br />grown with <span className="text-emerald-600 underline decoration-emerald-200 underline-offset-8">integrity.</span>
            </motion.h2>
            <motion.p variants={item} className="text-lg text-slate-500 leading-relaxed font-medium">
              Fruit Shop isn't just a store; it’s a commitment. We spent years identifying 
              the best soil conditions and farmers who refuse to compromise on chemicals. 
              Our logistics ensure your fruit spends more time on the tree and less time in a truck.
            </motion.p>
            
            <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <GlobeAltIcon className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900">Direct Sourcing</h5>
                  <p className="text-sm text-slate-500">Eliminating middlemen to ensure farmers earn more.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <ShieldCheckIcon className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900">Zero-Waste Goal</h5>
                  <p className="text-sm text-slate-500">Recyclable packaging and bio-compost initiatives.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-emerald-50 rounded-[3rem] -z-8 " />
            <img 
              src="https://images.unsplash.com/photo-1609780447631-05b93e5a88ea?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJ1aXQlMjBzaG9wfGVufDB8fDB8fHww" 
              alt="Fresh Produce" 
              className="rounded-[2.5rem] shadow-2xl object-cover h-150 w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* 4. VALUES GRID: GLASSMORPHISM */}
      <section className="bg-slate-50 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-600 mb-4">Our Core Values</h3>
            <p className="text-4xl font-black text-slate-900 tracking-tight">The principles that guide every single delivery.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Ethical Sourcing", 
                icon: HeartIcon, 
                desc: "We prioritize farmers who treat their land and their workers with dignity.",
                color: "emerald"
              },
              { 
                title: "Precision Logistic", 
                icon: TruckIcon, 
                desc: "Real-time temperature control ensures the 'crunch' stays in every bite.",
                color: "blue"
              },
              { 
                title: "Community Growth", 
                icon: UserGroupIcon, 
                desc: "5% of our revenue goes back into rural education and farming technology.",
                color: "indigo"
              }
            ].map((value, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -12 }}
                className="group p-10 bg-white/70 backdrop-blur-md border border-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 hover:bg-white transition-all duration-500"
              >
                <div className={`w-14 h-14 rounded-2xl bg-${value.color}-50 text-${value.color}-600 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  <value.icon className="h-7 w-7 stroke-[1.5]" />
                </div>
                <h4 className="text-xl font-bold mb-4 tracking-tight text-slate-900">{value.title}</h4>
                <p className="text-slate-500 leading-relaxed text-sm font-medium">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-32 text-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-emerald-600 rounded-[3rem] p-16 text-white shadow-2xl shadow-emerald-200 relative overflow-hidden"
        >
          {/* Subtle Graphic background for CTA */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          
          <SparklesIcon className="h-12 w-12 mx-auto mb-8 opacity-50" />
          <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Ready to taste the <br /> difference of real quality?</h2>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-white text-emerald-600 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl"
          >
            <Link to="/products" >
               Start Shopping Now
            </Link>
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}

export default About;