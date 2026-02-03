import {
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ArrowTopRightOnSquareIcon
} from "@heroicons/react/24/solid";

function Contact() {

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* ================= HEADER ================= */}
      <section className="relative py-24 text-center px-4 bg-white border-b border-gray-100 overflow-hidden">
        {/* Subtle Decorative Background Element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40"></div>
        
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Get in Touch
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
            Have questions about our fresh harvest or need help with an order? 
            Our team is ready to assist you. Reach out through any of these channels.
          </p>
        </div>
      </section>

      {/* ================= CONTACT CARDS ================= */}
      <section className="max-w-6xl mx-auto px-6 -mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20">

        {/* CALL CARD */}
        <div className="group rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-xl shadow-gray-200/50 hover:-translate-y-1 transition-all duration-300">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
            <PhoneIcon className="h-7 w-7" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Call Us</h3>
          <p className="text-sm text-gray-500 mb-6">Available for immediate support</p>
          <a 
            href="tel:+918056564775" 
            className="text-lg font-bold text-blue-600 hover:text-blue-700 underline underline-offset-4"
          >
            +91 80565 64775
          </a>
        </div>

        {/* WHATSAPP CARD */}
        <div className="group rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-xl shadow-gray-200/50 hover:-translate-y-1 transition-all duration-300">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
            <ChatBubbleLeftRightIcon className="h-7 w-7" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">WhatsApp</h3>
          <p className="text-sm text-gray-500 mb-6">Best for quick inquiries</p>
          <a
            href="https://wa.me/918056564775"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-green-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-green-200 hover:bg-green-600 hover:shadow-green-300 transition-all"
          >
            Chat with us
          </a>
        </div>

        {/* EMAIL CARD */}
        <div className="group rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-xl shadow-gray-200/50 hover:-translate-y-1 transition-all duration-300">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors duration-300">
            <EnvelopeIcon className="h-7 w-7" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Email Us</h3>
          <p className="text-sm text-gray-500 mb-6">For business & bulk orders</p>
          <p className="text-md font-bold text-gray-800 break-words">
            fruitshop@gmail.com
          </p>
          <span className="inline-block mt-2 text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Replies in 24h
          </span>
        </div>

      </section>

      {/* ================= STORE + MAP ================= */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-5 gap-10">

        {/* STORE INFO */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center gap-3">
              <MapPinIcon className="h-8 w-8 text-red-500" />
              Visit Our Store
            </h2>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <p className="font-bold text-gray-900 text-lg mb-2">Main Outlet</p>
              <address className="not-italic text-gray-600 leading-relaxed mb-6">
                Fruit Shop <br />
                157-F, Sivakasi to Srivilliputhur Main Road <br />
                Opposite to Malli Police Station <br />
                <span className="font-semibold text-gray-800">Malli – 626141</span>, Tamil Nadu, India
              </address>

              <div className="pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3 text-gray-900 font-bold mb-3">
                  <ClockIcon className="h-6 w-6 text-green-600" />
                  Business Hours
                </div>
                <div className="grid grid-cols-2 text-sm">
                  <span className="text-gray-500">Mon – Sun</span>
                  <span className="text-right font-bold text-gray-800">9:00 AM – 9:00 PM</span>
                </div>
              </div>
            </div>
          </div>
          
          <a 
            href="https://maps.app.goo.gl/j2vRQQJY4v1PryyH8" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-all"
          >
            Open in Google Maps
            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          </a>
        </div>

        {/* MAP EMBED */}
        <div className="lg:col-span-3">
          <div className="rounded-[2.5rem] border-8 border-white overflow-hidden shadow-2xl h-[450px] lg:h-full min-h-[400px]">
            <iframe
              title="Interactive Store Map"
              src="https://www.google.com/maps?q=Malli%20Police%20Station&output=embed"

              className="w-full h-full border-0 grayscale-[0.2] contrast-[1.1]"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </section>

    </div>
  );
}

export default Contact;