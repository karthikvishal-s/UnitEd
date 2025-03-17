/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ArrowLeft, Upload, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

function ShowcaseTalent({ userData }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("art");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category || !description || !displayName || !fileUrl) {
      setError("Please fill in all fields");
      return;
    }

    setUploading(true);
    const fileIdMatch = fileUrl.match(/\/d\/(.*)\/view/);
    if (!fileIdMatch) {
      setError("Invalid Google Drive link");
      setUploading(false);
      return;
    }

    const fileId = fileIdMatch[1];
    const thumbnailUrl = `https://drive.google.com/thumbnail?id=${fileId}`;

    try {
      await addDoc(collection(db, "showcases"), {
        title,
        category,
        description,
        fileUrl: thumbnailUrl,
        author: displayName,
        likes: 0,
        timestamp: new Date(),
      });

      setSubmitted(true);
      setTimeout(() => resetForm(), 3000);
    } catch (err) {
      console.error("Error submitting showcase:", err);
      setError("Failed to submit showcase");
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setCategory("art");
    setDescription("");
    setFileUrl("");
    setDisplayName("");
    setSubmitted(false);
    setError("");
  };

  const categoryIcons = {
    art: "🎨",
    music: "🎵",
    writing: "✍️",
    academic: "📚",
    technology: "💻",
    sports: "🏆",
    other: "🌟",
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
            Showcase Your Talent
          </h2>
        </div>

        <div className="p-6 md:p-8">
          {submitted ? (
            <div className="bg-green-800 p-8 rounded-xl text-center border border-green-600 shadow-sm">
              <CheckCircle size={64} className="mx-auto mb-4 text-green-400" />
              <h3 className="text-2xl font-semibold text-green-300 mb-2">
                Your talent has been showcased!
              </h3>
              <p className="text-lg text-green-400">
                Your submission is now visible to other students.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-800 text-red-300 p-4 rounded-lg border border-red-600 shadow-sm">
                  {error}
                </div>
              )}

              {/* Display Name */}
              <div>
                <label
                  htmlFor="displayName"
                  className="block text-lg font-medium text-gray-300"
                >
                  Display Name
                </label>
                <input
                  type="text"
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter Display Name"
                  required
                  className="mt-2 block w-full px-4 py-3 border border-gray-700 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-lg font-medium text-gray-300"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your work a title"
                  required
                  className="mt-2 block w-full px-4 py-3 border border-gray-700 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-lg font-medium text-gray-300"
                >
                  Category
                </label>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(categoryIcons).map(([cat, icon]) => (
                    <div
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`p-3 text-center rounded-lg cursor-pointer border transition-all ${
                        category === cat
                          ? "bg-purple-500 border-purple-400"
                          : "border-gray-600 hover:border-purple-400"
                      }`}
                    >
                      <div className="text-2xl mb-1">{icon}</div>
                      <div className="text-sm capitalize text-gray-300">
                        {cat}
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
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your work..."
                  rows="4"
                  required
                  className="mt-2 block w-full px-4 py-3 border border-gray-700 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>
              <div className="bg-black p-6 rounded-lg ">
                <h4 className="text-lg font-medium text-white mb-4">Upload Your Work</h4>
                <button
                  type="button"
                  onClick={() =>
                    window.open(
                      'https://drive.google.com/drive/folders/1-zuFHvIavdIxofwgTLqTuneB-qCTngPu?usp=sharing',
                      '_blank'
                    )
                  }
                  className="w-full py-3 bg-white text-purple-700 font-semibold rounded-lg border-2 border-purple-300 hover:bg-purple-100 transition-all duration-300 flex items-center justify-center"
                >
                  <Upload size={20} className="mr-2" />
                  Upload to Google Drive
                </button>

                <div className="mt-4">
                  <label htmlFor="fileUrl" className="block text-sm font-lg text-white">
                    Paste Google Drive link below
                  </label>
                  <input
                    type="text"
                    id="fileUrl"
                    value={fileUrl}
                    onChange={(e) => setFileUrl(e.target.value)}
                    placeholder="https://drive.google.com/file/d/..."
                    required
                  className="mt-2 block w-full px-4 py-3 border border-gray-700 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                   
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={uploading}
                className={`w-full py-4 bg-purple-700 text-white font-semibold rounded-lg shadow-md transition-all ${
                  uploading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-purple-600"
                }`}
              >
                {uploading ? "Uploading..." : "Share Your Talent"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowcaseTalent;
