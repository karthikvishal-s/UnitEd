import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

function FeedbackReport({ userData }) {
  const [feedbackType, setFeedbackType] = useState('teacher');
  const [feedbackText, setFeedbackText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log('Rendering FeedbackReport component'); // Debugging log

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedbackType || !feedbackText.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await addDoc(collection(db, 'feedback'), {
        type: feedbackType,
        text: feedbackText,
        anonymous: isAnonymous,
        userData: isAnonymous ? null : userData,
        timestamp: new Date(),
      });

      setSubmitted(true);
      setTimeout(resetForm, 3000);
    } catch (err) {
      console.error(err);
      setError('Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFeedbackType('teacher');
    setFeedbackText('');
    setIsAnonymous(false);
    setSubmitted(false);
    setError(null);
  };

  const feedbackTypeIcons = {
    teacher: "👨‍🏫",
    facility: "🏫",
    curriculum: "📝",
    other: "🔍"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-black rounded-2xl shadow-xl overflow-hidden">
        {/* Header with Back Button */}
        <br></br><br></br>
        <div className="bg-gradient-to-r from-purple-700 to-pink-600 px-6 py-4 flex items-center">
          <Link
            to="/dashboard"
            className="text-white hover:text-grey-300 flex items-center mr-4 transition-all"
          >
            <ArrowLeft size={20} className="mr-1" />
            <span>Back</span>
          </Link>
          <h2 className="text-2xl font-bold text-white flex-1 text-center">
            Feedback & Reporting System
          </h2>
        </div>

        <div className="p-6 md:p-8">
          {submitted ? (
            <div className="bg-green-800 p-8 rounded-xl text-center border border-green-600 shadow-sm">
              <CheckCircle size={64} className="mx-auto mb-4 text-green-400" />
              <h3 className="text-2xl font-semibold text-green-300 mb-2">
                Thank you for your feedback!
              </h3>
              <p className="text-lg text-green-400">
                Your input helps improve education quality for everyone.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-800 text-red-300 p-4 rounded-lg border border-red-600 shadow-sm">
                  {error}
                </div>
              )}

              {/* Feedback Type */}
              <div>
                <label
                  htmlFor="feedbackType"
                  className="block text-lg font-medium text-gray-300"
                >
                  Feedback Type
                </label>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(feedbackTypeIcons).map(([type, icon]) => (
                    <div
                      key={type}
                      onClick={() => setFeedbackType(type)}
                      className={`p-3 text-center rounded-lg cursor-pointer border transition-all ${
                        feedbackType === type
                          ? "bg-purple-500 border-purple-400"
                          : "border-gray-600 hover:border-purple-400"
                      }`}
                    >
                      <div className="text-2xl mb-1">{icon}</div>
                      <div className="text-sm capitalize text-gray-300">
                        {type}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feedback Text */}
              <div>
                <label
                  htmlFor="feedbackText"
                  className="block text-lg font-medium text-gray-300"
                >
                  Your Feedback
                </label>
                <textarea
                  id="feedbackText"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Describe your concern or feedback in detail..."
                  rows="6"
                  required
                  className="mt-2 block w-full px-4 py-3 border border-gray-700 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              {/* Anonymous Option */}
              <div className="flex items-center bg-gray-800 p-4 rounded-lg">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="h-5 w-5 text-purple-600 border-gray-700 rounded focus:ring-purple-500"
                />
                <label htmlFor="anonymous" className="ml-3 text-gray-300 text-lg">
                  Submit Anonymously
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 bg-purple-700 text-white font-semibold rounded-lg shadow-md transition-all ${
                  loading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-purple-600"
                }`}
              >
                {loading ? "Submitting..." : "Submit Feedback"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default FeedbackReport;