import { useState } from "react";
import "../pages/css/Contact.css";

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

    // auto hide toast
    setTimeout(() => setToast(""), 3000);
  };


  return (
    <div className="contact-page">
      <h1 className="contact-title">Contact Us</h1>

      <div className="contact-container">
        {/* LEFT – FORM */}
        <div className="contact-card">
          <h2>Send us a message</h2>

          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label>Message</label>
            <textarea
              name="message"
              placeholder="Write your message..."
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" className="send-btn">
              Send Message
            </button>
            {toast && (
              <div className="toast-success">
                   {toast}
              </div>
            )}

          </form>
        </div>

        {/* RIGHT – INFO */}
        <div className="contact-card">
          <h2>Get in touch</h2>
          <p className="subtitle">
            We would love to receive your feedbacks
          </p>

          <div className="contact-info">
            <p>📧 contact@myfruitsshop.com</p>
            <p>📞 +91 8056564775</p>
            <p>
              📍 157-F, Sivakasi to Srivilliputhur Main Road,
              Opposite to Malli Police Station,
              Malli – 626141
            </p>
          </div>

          {/* MAP */}
          <div className="map-box">
            <iframe
              title="location"
              src="https://www.google.com/maps?q=UNI%20360%20TURF%20MINI%20STADIUM&output=embed"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
