/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  StarIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  CheckBadgeIcon
} from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { submitFeedback, fetchFeedbacks } from "../services/api";
import { motion, AnimatePresence } from "framer-motion"; 

function Feedback() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    message: ""
  });

  useEffect(() => {
    fetchFeedbacks().then(setReviews);
  }, []);

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (rating === 0) return alert("Please select a rating");
    
    setIsSubmitting(true);
    try {
      await submitFeedback({ ...form, rating });
      setToast("✨ Thank you! Your feedback has been published.");
      setForm({ name: "", phone: "", location: "", message: "" });
      setRating(0);
      // Re-fetch to show latest
      const updated = await fetchFeedbacks();
      setReviews(updated);
    } catch (err) {
      setToast("❌ Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setToast(""), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF7] text-slate-900 font-sans selection:bg-yellow-200">
      
      {/* --- PREMIUM NAVIGATION SPACING --- */}
      <div className="h-20" />

      {/* --- HERO SECTION --- */}
      <section className="max-w-4xl mx-auto text-center px-6 mb-16">
        <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-yellow-700 uppercase bg-yellow-100 rounded-full">
          Customer Feedback
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
          Voices of our <span className="text-yellow-500">Community.</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          We believe in constant evolution. Your insights provide the roadmap for our next big thing.
        </p>
      </section>

      <main className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* --- LEFT: FORM SIDE --- */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 bg-white border border-slate-100 rounded-3xl shadow-2xl shadow-slate-200/60 p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-yellow-500 rounded-2xl">
                <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">Write a Review</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Full Name</label>
                <div className="group flex items-center bg-slate-50 border border-transparent focus-within:border-yellow-500 focus-within:bg-white transition-all rounded-xl px-4">
                  <UserIcon className="h-5 w-5 text-slate-400 group-focus-within:text-yellow-500 transition-colors" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    placeholder="Mani"
                    onChange={handleChange}
                    className="w-full bg-transparent px-3 py-4 outline-none text-sm font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Phone</label>
                  <div className="group flex items-center bg-slate-50 border border-transparent focus-within:border-yellow-500 focus-within:bg-white transition-all rounded-xl px-4">
                    <PhoneIcon className="h-5 w-5 text-slate-400 group-focus-within:text-yellow-500 transition-colors" />
                    <input
                      type="text"
                      name="phone"
                      value={form.phone}
                      placeholder="+91..."
                      onChange={handleChange}
                      className="w-full bg-transparent px-3 py-4 outline-none text-sm font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Location</label>
                  <div className="group flex items-center bg-slate-50 border border-transparent focus-within:border-yellow-500 focus-within:bg-white transition-all rounded-xl px-4">
                    <MapPinIcon className="h-5 w-5 text-slate-400 group-focus-within:text-yellow-500 transition-colors" />
                    <input
                      type="text"
                      name="location"
                      required
                      value={form.location}
                      placeholder="Malli"
                      onChange={handleChange}
                      className="w-full bg-transparent px-3 py-4 outline-none text-sm font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="py-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Overall Rating</label>
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="transition-transform active:scale-90"
                    >
                      {star <= (hoverRating || rating) ? (
                        <StarIcon className="h-6 w-6 text-yellow-400 drop-shadow-sm" />
                      ) : (
                        <StarOutline className="h-6 w-6 text-slate-300" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Message</label>
                <textarea
                  name="message"
                  rows="4"
                  required
                  value={form.message}
                  placeholder="Tell us about your experience..."
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-transparent focus:border-yellow-500 focus:bg-white transition-all rounded-xl px-4 py-4 outline-none text-sm font-medium resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-yellow-500 hover:shadow-lg hover:shadow-yellow-200 transition-all active:scale-[0.98] disabled:opacity-70"
              >
                {isSubmitting ? "Submitting..." : "Publish Feedback"}
              </button>
            </form>
          </div>
        </div>

        {/* --- RIGHT: REVIEWS LIST --- */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* RATING SUMMARY CARD */}
          <div className="bg-yellow-500 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-yellow-100">
            <div>
              <p className="text-yellow-100 font-medium uppercase tracking-widest text-xs">Total Score</p>
              <div className="flex items-end gap-2 mt-1">
                <span className="text-6xl font-black">{avgRating.toFixed(1)}</span>
                <span className="text-yellow-200 text-xl mb-2 font-bold">/ 5.0</span>
              </div>
            </div>
            <div className="text-center md:text-right">
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-6 w-6 text-white" />
                ))}
              </div>
              <p className="text-sm font-medium text-yellow-50">Verified Reviews: {reviews.length}</p>
            </div>
          </div>

          {/* INDIVIDUAL FEEDBACK CARDS */}
          <div className="space-y-6">
            {reviews.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-3xl">
                <p className="text-slate-400">No reviews yet. Be the first to share!</p>
              </div>
            ) : (
              reviews.map((review) => (
                <div
                  key={review._id}
                  className="group bg-white rounded-3xl p-8 border border-slate-100 hover:border-yellow-200 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500 uppercase tracking-tighter">
                        {review.name.substring(0, 2)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 leading-none">{review.name}</h4>
                          <CheckBadgeIcon className="h-4 w-4 text-blue-500" title="Verified Customer" />
                        </div>
                        <p className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">
                          {review.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex bg-slate-50 px-3 py-1.5 rounded-full">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < review.rating ? "text-yellow-400" : "text-slate-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="mt-6 text-slate-600 leading-relaxed font-medium italic">
                    “{review.message}”
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* --- TOAST NOTIFICATION --- */}
      <AnimatePresence>
        {toast && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-bounce">
             <div className="bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-800">
                <span className="font-bold">{toast}</span>
             </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Feedback;