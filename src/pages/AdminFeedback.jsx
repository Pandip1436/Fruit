import { useEffect, useState } from "react";
import {
  fetchAdminFeedbacks,
  approveFeedback,
  deleteFeedback
} from "../services/api";

import {
  CheckCircleIcon,
  TrashIcon,
  StarIcon,
  ClockIcon
} from "@heroicons/react/24/solid";

function AdminFeedback() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchAdminFeedbacks().then(setReviews);
  }, []);

  const handleApprove = async id => {
    await approveFeedback(id);
    fetchAdminFeedbacks().then(setReviews);
  };

  const handleDelete = async id => {
    await deleteFeedback(id);
    fetchAdminFeedbacks().then(setReviews);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 px-6 py-12">

      {/* ================= HEADER ================= */}
      <div className="max-w-6xl mx-auto mb-10">
        <h2 className="text-3xl font-bold text-gray-900">
          Feedback Moderation
        </h2>
        <p className="text-gray-600 mt-2">
          Review, approve, or remove customer feedback submissions.
        </p>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-6xl mx-auto space-y-6">

        {reviews.length === 0 && (
          <div className="text-center text-gray-500 py-20">
            No feedback found.
          </div>
        )}

        {reviews.map(r => (
          <div
            key={r._id}
            className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6"
          >
            {/* STATUS STRIP */}
            <div
              className={`absolute inset-x-0 top-0 h-1 rounded-t-2xl ${
                r.approved
                  ? "bg-gradient-to-r from-green-400 to-emerald-500"
                  : "bg-gradient-to-r from-yellow-400 to-orange-500"
              }`}
            />

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              {/* USER INFO */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 uppercase">
                  {r.name}
                </h4>
                <p className="text-sm text-gray-500">
                  {r.location}
                </p>
              </div>

              {/* RATING */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${
                      i <= r.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

            </div>

            {/* MESSAGE */}
            <p className="mt-4 text-gray-700 italic">
              “{r.message}”
            </p>

            {/* FOOTER */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              {/* STATUS BADGE */}
              <div className="flex items-center gap-2 text-sm">
                {r.approved ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-100 text-green-700 px-3 py-1">
                    <CheckCircleIcon className="h-4 w-4" />
                    Approved
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 text-yellow-700 px-3 py-1">
                    <ClockIcon className="h-4 w-4" />
                    Pending Approval
                  </span>
                )}
              </div>

              {/* ACTIONS */}
              <div className="flex gap-3">
                {!r.approved && (
                  <button
                    onClick={() => handleApprove(r._id)}
                    className="inline-flex items-center gap-1 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition"
                  >
                    <CheckCircleIcon className="h-4 w-4" />
                    Approve
                  </button>
                )}

                <button
                  onClick={() => handleDelete(r._id)}
                  className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
                >
                  <TrashIcon className="h-4 w-4" />
                  Delete
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminFeedback;
