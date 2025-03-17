/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../services/authService';
import { UserContext } from '../UserContext';
const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [school, setSchool] = useState('');
  const [locality, setLocality] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {user,setUser}=useContext(UserContext);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          setError("Passwords don't match");
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError("Password must be at least 6 characters");
          setLoading(false);
          return;
        }
        const userData = await signUp(email, password, name, grade, school, locality);
        if (!userData) {
          throw new Error('Failed to get user data after signup');
        }
        
        // Make sure userData has the expected properties before setting it
        if (userData && typeof userData === 'object') {
          setUser(userData);
          navigate('/dashboard');
        }else {
          throw new Error('Invalid user data received');
        }
      }else {
        const userData = await signIn(email, password);
        if (!userData) {
          throw new Error('Failed to get user data after signin');
        }
        
        // Make sure userData has the expected properties before setting it
        if (userData && typeof userData === 'object') {
          setUser(userData);
          navigate('/dashboard');
        } else {
          throw new Error('Invalid user data received');
        }
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4" style={{backgroundImage:'url(./src/assets/wallpaperflare.com_wallpaper-2.jpg)'}}>
      
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md" >
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          {isSignUp ? 'Create Account' : 'Log In'}
        </h2>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-600">Full Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {isSignUp && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-600">Confirm Password</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded-lg"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Grade</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  placeholder="Enter your grade"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">School</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder="Enter your school"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Locality</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  placeholder="Enter your locality"
                  required
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        <div className="text-center mt-4">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button className="text-blue-600 font-bold ml-2" onClick={toggleForm}>
            {isSignUp ? 'Log In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
