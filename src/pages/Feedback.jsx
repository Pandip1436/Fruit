import { useEffect, useState } from "react";
import {
  StarIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon
} from "@heroicons/react/24/solid";
import { submitFeedback, fetchFeedbacks } from "../services/api";

function Feedback() {
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [toast, setToast] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    message: ""
  });

  /* ---------------- FETCH REVIEWS ---------------- */
  useEffect(() => {
    fetchFeedbacks().then(setReviews);
  }, []);

  /* ---------------- AVG RATING ---------------- */
  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) /
    (reviews.length || 1);

  /* ---------------- FORM HANDLERS ---------------- */
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    await submitFeedback({ ...form, rating });

    setToast("✅ Feedback submitted successfully!");
    setForm({ name: "", phone: "", location: "", message: "" });
    setRating(0);

    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-yellow-100">

      {/* ================= HEADER ================= */}
      <section className="py-16 text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Customer Feedback
        </h1>
        <p className="mt-3 text-gray-600">
          Your experience matters to us. Share your thoughts and help us serve you better.
        </p>
      </section>

    

      {/* ================= MAIN ================= */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* ================= FORM ================= */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-semibold mb-6">Leave Your Feedback</h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* NAME */}
            <div>
              <label className="text-sm font-medium">Full Name *</label>
              <div className="flex items-center border rounded-lg px-3 mt-1">
                <UserIcon className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  placeholder="Enter your name"
                  onChange={handleChange}
                  className="w-full px-3 py-2 outline-none"
                />
              </div>
            </div>

            {/* PHONE */}
            <div>
              <label className="text-sm font-medium">Phone Number</label>
              <div className="flex items-center border rounded-lg px-3 mt-1">
                <PhoneIcon className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  placeholder="Enter phone number"
                  onChange={handleChange}
                  className="w-full px-3 py-2 outline-none"
                />
              </div>
            </div>

            {/* LOCATION */}
            <div>
              <label className="text-sm font-medium">Location *</label>
              <div className="flex items-center border rounded-lg px-3 mt-1">
                <MapPinIcon className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="location"
                  required
                  value={form.location}
                  placeholder="Your city / area"
                  onChange={handleChange}
                  className="w-full px-3 py-2 outline-none"
                />
              </div>
            </div>

            {/* RATING */}
            <div>
              <label className="text-sm font-medium">Rate Your Experience *</label>
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <StarIcon
                    key={star}
                    onClick={() => setRating(star)}
                    className={`h-7 w-7 cursor-pointer ${
                      star <= rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* MESSAGE */}
            <div>
              <label className="text-sm font-medium">Your Feedback *</label>
              <textarea
                name="message"
                rows="4"
                required
                value={form.message}
                placeholder="Share your experience..."
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1 resize-none outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition"
            >
              ★ Submit Feedback
            </button>
              {/* ================= TOAST ================= */}
      {toast && (
        <div className="max-w-md mx-auto mb-6 text-center bg-green-100 text-green-700 py-2 rounded-lg">
          {toast}
        </div>
      )}
          </form>
        </div>

        {/* ================= REVIEWS ================= */}
        <div className="space-y-6">

          {/* SUMMARY */}
          <div className="bg-yellow-50 border rounded-xl p-6 text-center">
            <div className="flex justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map(i => (
                <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
              ))}
            </div>
            <h3 className="text-lg font-bold">
              {avgRating.toFixed(1)}
            </h3>
            <p className="text-sm text-gray-600">
              Based on {reviews.length} customer reviews
            </p>
          </div>

          {/* CARDS */}
          {reviews.map(review => (
            <div
              key={review._id}
              className="bg-white rounded-xl shadow-md p-5 border-l-4 border-yellow-400"
            >
              <div className="flex justify-between">
                <div>
                  <h4 className="font-semibold uppercase">
                    {review.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {review.location}
                  </p>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(i => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${
                        i <= review.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="mt-3 text-gray-600 text-sm italic">
                “{review.message}”
              </p>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
}

export default Feedback;
