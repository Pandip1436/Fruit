import {
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon
} from "@heroicons/react/24/solid";

function Contact() {
  return (
    <div className="bg-white min-h-screen">

      {/* ================= HEADER ================= */}
      <section className="py-16 text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Get in Touch
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
          Have questions about our products or need assistance?
          We're here to help! Reach out to us through any of the channels below.
        </p>
      </section>

      {/* ================= CONTACT CARDS ================= */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* CALL */}
        <div className="rounded-xl border bg-white p-8 text-center shadow-sm hover:shadow-md transition">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <PhoneIcon className="h-6 w-6" />
          </div>
          <h3 className="font-semibold mb-2">Call Us</h3>
          <p className="text-sm text-gray-600 mb-2">
            Speak directly with our team
          </p>
          <a href="tel:+918056564775" className="text-blue-600 font-medium text-sm">
            +91 8056564775
          </a>
        </div>

        {/* WHATSAPP */}
        <div className="rounded-xl border bg-white p-8 text-center shadow-sm hover:shadow-md transition">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
            <ChatBubbleLeftRightIcon className="h-6 w-6" />
          </div>
          <h3 className="font-semibold mb-2">WhatsApp</h3>
          <p className="text-sm text-gray-600 mb-4">
            Quick response guaranteed
          </p>
          <a
            href="https://wa.me/918056564775"
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-md bg-green-500 px-5 py-2 text-sm font-semibold text-white hover:bg-green-600"
          >
            Chat Now
          </a>
        </div>

        {/* EMAIL */}
        <div className="rounded-xl border bg-white p-8 text-center shadow-sm hover:shadow-md transition">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-500">
            <EnvelopeIcon className="h-6 w-6" />
          </div>
          <h3 className="font-semibold mb-2">Email Us</h3>
          <p className="text-sm text-gray-600 mb-2">
            For detailed inquiries
          </p>
          <p className="text-sm text-red-600 font-medium">
            fruitshop@gmail.com
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Response within 24 hours
          </p>
        </div>

      </section>

      {/* ================= STORE + MAP ================= */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* STORE INFO */}
        <div className="rounded-xl border bg-white p-8 shadow-sm">
          <h3 className="font-semibold mb-6 flex items-center gap-2">
            <MapPinIcon className="h-5 w-5 text-gray-600" />
            Visit Our Store
          </h3>

          <div className="text-sm text-gray-600 space-y-2">
            <p className="font-medium text-gray-800">Address</p>
            <p>
              Fruit Shop<br />
              157-F, Sivakasi to Srivilliputhur Main Road<br />
              Opposite to Malli Police Station<br />
              Malli – 626141, Tamil Nadu, India
            </p>
          </div>

          <hr className="my-6" />

          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex items-center gap-2 font-medium text-gray-800">
              <ClockIcon className="h-5 w-5 text-gray-500" />
              Business Hours
            </div>
            <p>Monday – Sunday</p>
            <p className="font-medium text-gray-900">
              9:00 AM – 9:00 PM
            </p>
          </div>

        </div>

        {/* MAP */}
        <div className="rounded-xl border overflow-hidden shadow-sm h-[350px]">
          <iframe
            title="Store Location"
            src="https://www.google.com/maps?q=Malli%20Police%20Station&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
          ></iframe>
        </div>

      </section>

    </div>
  );
}

export default Contact;
