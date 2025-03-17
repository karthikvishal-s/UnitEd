import React, { useState } from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function Complain() {
  const [incidentType, setIncidentType] = useState("bullying");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim() || !date || !location.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      await addDoc(collection(db, "complaints"), {
        incidentType,
        description,
        date,
        location,
        isAnonymous,
        createdAt: new Date(),
      });

      setSubmitted(true);
      setTimeout(() => resetForm(), 4000);
    } catch (err) {
      console.error("Error submitting complaint:", err);
      setError("Failed to submit report. Please try again.");
    }
  };

  const resetForm = () => {
    setIncidentType("bullying");
    setDescription("");
    setDate("");
    setLocation("");
    setIsAnonymous(false);
    setSubmitted(false);
    setError("");
  };

  const incidentTypes = {
    bullying: "🛑",
    verbal_harassment: "🗣️",
    physical_harassment: "👊",
    cyberbullying: "💻",
    discrimination: "🚫",
    other: "❓",
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
            Report an Incident
          </h2>
        </div>

        <div className="p-6 md:p-8">
          {submitted ? (
            <div className="bg-green-800 p-8 rounded-xl text-center border border-green-600 shadow-sm">
              <CheckCircle size={64} className="mx-auto mb-4 text-green-400" />
              <h3 className="text-2xl font-semibold text-green-300 mb-2">
                Thank you for speaking up!
              </h3>
              <p className="text-lg text-green-400">
                Your report has been submitted and will be reviewed by our team.We've got your back✌🏻
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-800 text-red-300 p-4 rounded-lg border border-red-600 shadow-sm">
                  {error}
                </div>
              )}

              {/* Incident Type */}
              <div>
                <label
                  htmlFor="incidentType"
                  className="block text-lg font-medium text-gray-300"
                >
                  Type of Incident
                </label>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(incidentTypes).map(([type, icon]) => (
                    <div
                      key={type}
                      onClick={() => setIncidentType(type)}
                      className={`p-3 text-center rounded-lg cursor-pointer border transition-all ${
                        incidentType === type
                          ? "bg-purple-500 border-purple-400"
                          : "border-gray-600 hover:border-purple-400"
                      }`}
                    >
                      <div className="text-2xl mb-1">{icon}</div>
                      <div className="text-sm capitalize text-gray-300">
                        {type.replace(/_/g, " ")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-lg font-medium text-gray-300"
                >
                  Description of Incident
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what happened..."
                  rows="4"
                  required
                  className="mt-2 block w-full px-4 py-3 border border-gray-700 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              {/* Date */}
              <div>
                <label
                  htmlFor="date"
                  className="block text-lg font-medium text-gray-300"
                >
                  Date of Incident
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="mt-2 block w-full px-4 py-3 border border-gray-700 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-lg font-medium text-gray-300"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Where did this happen?"
                  required
                  className="mt-2 block w-full px-4 py-3 border border-gray-700 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              {/* Anonymous Option */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="h-6 w-6 text-purple-500 focus:ring-purple-500 border-gray-300 rounded-md"
                />
                <label htmlFor="anonymous" className="text-lg text-gray-300">
                  Submit Anonymously
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full py-4 bg-purple-700 text-white font-semibold rounded-lg shadow-md transition-all ${
                  submitted
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-purple-600"
                }`}
              >
                {submitted ? "Submitting..." : "Submit Report"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Complain;
