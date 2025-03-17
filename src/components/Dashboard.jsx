/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { UserContext } from '../UserContext';

function Dashboard() {
  const { user } = useContext(UserContext);
  const [feedback, setFeedback] = useState([]);
  const [issues, setIssues] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [showcases, setShowcases] = useState([]);
  const navigate = useNavigate(); 
  const [showComments, setShowComments] = useState({});
  const [commentText, setCommentText] = useState('');
  const [isLiking, setIsLiking] = useState({});
  const [isSupporting,setIsSupporting] = useState({});

  // Fetch Data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const feedbackSnapshot = await getDocs(collection(db, 'feedback'));
        setFeedback(feedbackSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const issuesSnapshot = await getDocs(collection(db, 'issues'));
        setIssues(issuesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        const complaintsSnapshot = await getDocs(collection(db, 'complaints'));
        setComplaints(complaintsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Real-time sync for showcases
    const unsubscribe = onSnapshot(collection(db, 'showcases'), (snapshot) => {
      setShowcases(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    fetchData();
    return () => unsubscribe(); // Cleanup
  }, []);

  // Handle Like Button - Toggle between like and unlike
// Handle Like Button - Toggle between like and unlike
const handleLike = async (id, currentLikes = 0, likedBy = []) => {
  if (isLiking[id]) return; // Prevent rapid clicking

  setIsLiking((prev) => ({ ...prev, [id]: true }));

  try {
    const showcaseRef = doc(db, 'showcases', id);
    const userHasLiked = likedBy.includes(user?.uid);

    let newLikes;
    let updatedLikedBy;

    if (userHasLiked) {
      // Unlike the post
      newLikes = Math.max(0, currentLikes - 1);
      updatedLikedBy = likedBy.filter((uid) => uid !== user?.uid);
    } else {
      // Like the post
      newLikes = currentLikes + 1;
      updatedLikedBy = [...likedBy, user?.uid];
    }

    // Update Firestore
    await updateDoc(showcaseRef, {
      likes: newLikes,
      likedBy: updatedLikedBy,
    });

    // Update local state manually
    setShowcases((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, likes: newLikes, likedBy: updatedLikedBy }
          : item
      )
    );
  } catch (err) {
    console.error('Failed to update likes:', err);
  } finally {
    setIsLiking((prev) => ({ ...prev, [id]: false }));
  }
};

// Handle Support Button - Toggle between support and unsupport
const handleSupport = async (id, currentSupports = 0, supportedBy = []) => {
  if (isSupporting[id]) return;

  setIsSupporting((prev) => ({ ...prev, [id]: true }));

  try {
    const issueRef = doc(db, 'issues', id);
    const userHasSupported = supportedBy.includes(user?.uid);

    let newSupports;
    let updatedSupportedBy;

    if (userHasSupported) {
      newSupports = Math.max(0, currentSupports - 1);
      updatedSupportedBy = supportedBy.filter((uid) => uid !== user?.uid);
    } else {
      newSupports = currentSupports + 1;
      updatedSupportedBy = [...supportedBy, user?.uid];
    }
    await updateDoc(issueRef, {
      supports: newSupports,
      supportedBy: updatedSupportedBy,
    });

    // Update Firestore
  
    ;

    // Update local state manually
    setIssues((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, supports: newSupports, supportedBy: updatedSupportedBy }
          : item
      )
    );
  } catch (err) {
    console.error('Failed to update support:', err);
  } finally {
    setIsSupporting((prev) => ({ ...prev, [id]: false }));
  }
};

  

  // Toggle Comments Section
  const toggleComments = (id) => {
    setShowComments(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Handle Add Comment
  const handleAddComment = async (id, comments = []) => {
    if (!commentText.trim()) return;

    try {
      const showcaseRef = doc(db, 'showcases', id);
      const newComment = {
        text: commentText,
        author: user?.displayName || 'Anonymous',
        timestamp: new Date().toISOString()
      };

      await updateDoc(showcaseRef, {
        comments: [...comments, newComment]
      });

      setCommentText('');
    } catch (err) {
      console.error('Failed to add comment:', err);
    }
  };

  return (
    <div className="min-h-screen flex bg-black">
      {/* Sidebar */}
      <div className="w-1/4 bg-bllack p-6 flex flex-col space-y-6">
  <br /><br /><br /><br />

  {/* Feedback Button */}
  <div className="relative group">
    <div className="absolute -inset-2 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100"></div>
    <button
      onClick={() => navigate('/feedback')}
      className="relative px-7 py-4 bg-black rounded-lg leading-none"
    >
      <h3 className="text-indigo-300 text-2xl font-bold mb-4 group-hover:text-gray-100 transition duration-200">
        Feedback
      </h3>
      <p className="pl-6 text-indigo-300 group-hover:text-gray-100 transition duration-200">
        Submit feedback or report issues on your problems →
      </p>
    </button>
  </div>

  {/* Complain Button */}
  <div className="relative group">
    <div className="absolute -inset-2 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100"></div>
    <button
      onClick={() => navigate('/complain')}
      className="relative px-7 py-4 bg-black rounded-lg leading-none"
    >
      <h3 className="text-indigo-300 text-2xl font-bold mb-4 group-hover:text-gray-100 transition duration-200">
        Complain
      </h3>
      <p className="pl-6 text-indigo-300 group-hover:text-gray-100 transition duration-200">
        Speak up against bullying and harassment →
      </p>
    </button>
  </div>

  {/* Raise-Issue Button */}
  <div className="relative group">
    <div className="absolute -inset-2 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100"></div>
    <button
      onClick={() => navigate('/raise-issue')}
      className="relative px-7 py-4 bg-black rounded-lg leading-none"
    >
      <h3 className="text-indigo-300 text-2xl font-bold mb-4 group-hover:text-gray-100 transition duration-200">
        Issues
      </h3>
      <p className="pl-6 text-indigo-300 group-hover:text-gray-100 transition duration-200">
        Get support from other students for common problems →
      </p>
    </button>
  </div>

  {/* Showcase Button */}
  <div className="relative group">
    <div className="absolute -inset-2 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100"></div>
    <button
      onClick={() => navigate('/showcase')}
      className="relative px-7 py-4 bg-black rounded-lg leading-none"
    >
      <h3 className="text-indigo-300 text-2xl font-bold mb-4 group-hover:text-gray-100 transition duration-200">
        Showcase
      </h3>
      <p className="pl-6 text-indigo-300 group-hover:text-gray-100 transition duration-200">
        Share your skills and achievements with others →
      </p>
    </button>
  </div>
</div>


      {/* Right Side Panel */}
      <div className="bg-black min-h-screen p-4 w-2/5">
      <br></br><br></br><br></br><br></br>
      <h1 className="text-purple-200 text-4xl font-extrabold mb-4 text-center uppercase tracking-wide transition duration-300 hover:drop-shadow-[0_0_20px_#ffd700]">
  Spotlight
</h1>
<br></br>


        <div className="space-y-4">
          {showcases.map((showcase) => (
            <div key={showcase.id} className="bg-black shadow-md overflow-hidden">
              {/* Username */}
              <div className="px-2 py-2 border-4 border-purple-500">
              <span className="font-semibold text-lg italic text-white tracking-tight">
    @ {showcase.author || 'Anonymous'}
</span>

              </div>

              {/* Post Content */}
              <div className="px-2 py-2 border-4 border-purple-500">
<h2 className="text-2xl font-semibold text-red-400 tracking-tight">
  {showcase.title}
</h2>                <p className="text-white mb-3">{showcase.description}</p>
                {showcase.fileUrl && (
                  showcase.fileUrl.includes('.mp4') ? (
                    <video controls className="w-full h-64 object-cover rounded-lg">
                      <source src={showcase.fileUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={showcase.fileUrl}
                      alt="Uploaded"
                      className="w-full h-64 object-contain rounded-lg"
                    />
                  )
                )}
              </div>

              {/* Like and Comments Section */}
              <div className="grid grid-cols-2 px-2 py-2 border-4 border-purple-500">
                <button
                  onClick={() => handleLike(showcase.id, showcase.likes || 0, showcase.likedBy || [])}
                  className={`p-4 text-center text-white font-semibold border-r hover:bg-gray-700 ${
                    (showcase.likedBy || []).includes(user?.uid) ? 'text-red-500' : 'text-white'
                  }`}
                >
                  ❤️ {showcase.likes || 0}
                </button>
                <button 
                  onClick={() => toggleComments(showcase.id)}
                  className="p-4 text-center text-white font-semibold hover:bg-gray-700 flex items-center justify-center gap-2"
                >
                  💬 {showcase.comments?.length || 0}
                </button>
              </div>

              {showComments[showcase.id] && (
                <div className="border-t border-gray-200 p-4 bg-gray-900">
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="flex-1 p-3 border rounded-lg focus:outline-none"
                    />
                    <button
                      onClick={() => handleAddComment(showcase.id, showcase.comments || [])}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      Post
                    </button>
                  </div>
                  {showcase.comments?.map((comment, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg shadow-sm mb-2">
                      <span className="font-semibold text-gray-800">{comment.author}</span>
                      <p className="text-gray-700">{comment.text}</p>
                    </div>
                  ))}
                </div>
              )}<br></br>
            </div>
          ))}
        </div>
      </div>
       {/* Display Issues */}
       <div className="bg-black min-h-screen p-4 w-2/6">
       <br></br><br></br><br></br><br></br>
       <h1 className="text-yellow-200 text-4xl font-extrabold mb-4 text-center uppercase tracking-wide transition duration-300 hover:drop-shadow-[0_0_20px_#ffd700]">
  New Issues
</h1>
       <br></br>
          {issues.length === 0 ? (
            <div className="text-center text-gray-400">
              No issues found.
            </div>
          ) : (
            issues.map((issue) => (
              <div
                key={issue.id}
                className="bg-black p-5 rounded-xl shadow-md"
              >
                {/* Issue Author */}
                <div className="px-2 py-2 border-4 border-yellow-500">
                  <span className="font-semibold text-lg italic text-white tracking-tight">
                    @ {issue.anonymous ? 'Anonymous' : issue.userData?.name || 'Unknown'}
                  </span>
                </div>

                {/* Issue Content */}
                <div className="px-2 py-2 border-4 border-yellow-500"><br></br>
                  <h2 className="text-xl font-bold text-blue-400 capitalize text-center">
                    {issue.type}
                  </h2><br></br>
                  <p className="text-white text-xl mb-3">{issue.text}</p>
                </div>

                {/* Like and Comments Section */}
                <div className="text-center border-4 border-yellow-500">
                <button
                  onClick={() => handleSupport(issue.id, issue.supports || 0, issue.supportedBy )}
                  className={`p-4 text-center text-white font-semibold  hover:bg-gray-700 ${
                    (issue.supportedBy || []).includes(user?.uid) ? 'text-red-500' : 'text-white'
                  }`}
                >
                  Support 👍🏻       {issue.supports}
                </button>
                 
                </div>

                {/* Comments Section */}
                
              </div>
            ))
          )}
        </div>
    </div>
  );
}

export default Dashboard;