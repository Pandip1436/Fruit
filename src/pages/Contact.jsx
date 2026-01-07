import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [toast, setToast] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    setToast("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });

    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Contact Us
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* LEFT – FORM */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            Send us a message
          </h2>

          <form onSubmit={handleSubmit} className=" max-w-8xl space-y-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Message</label>
              <textarea
                name="message"
                placeholder="Write your message..."
                rows="5"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              Send Message
            </button>

            {toast && (
              <div className="mt-3 text-green-700 bg-green-100 border border-green-300 px-4 py-2 rounded-md text-center">
                {toast}
              </div>
            )}
          </form>
        </div>

        {/* RIGHT – INFO */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <h2 className="text-xl font-semibold">Get in touch</h2>
          <p className="text-gray-600">
            We would love to receive your feedbacks
          </p>

          <div className="space-y-2 text-gray-700">
            <p>📧 contact@myfruitsshop.com</p>
            <p>📞 +91 8056564775</p>
            <p>
              📍 157-F, Sivakasi to Srivilliputhur Main Road,
              Opposite to Malli Police Station,
              Malli – 626141
            </p>
          </div>

          {/* MAP */}
          <div className="w-full h-64 rounded-md overflow-hidden border">
            <iframe
              title="location"
              src="https://www.google.com/maps?q=UNI%20360%20TURF%20MINI%20STADIUM&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
