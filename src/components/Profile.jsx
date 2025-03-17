import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

function Profile() {
  const { user } = useContext(UserContext);
  console.log(user);

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-blue-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <br></br><br></br>
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-4xl mx-auto transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-4xl font-semibold text-indigo-900 mb-8 text-center">Profile Details</h2>
        <div className="user-info space-y-6">
          <p className="text-xl text-indigo-800 font-medium"><strong>Name:</strong> {user.displayName}</p>
          <p className="text-xl text-indigo-800 font-medium"><strong>Email:</strong> {user.email}</p>   
          <p className="text-xl text-indigo-800 font-medium"><strong>Grade:</strong> {user.grade}</p>
          <p className="text-xl text-indigo-800 font-medium"><strong>School:</strong> {user.school}</p>
          <p className="text-xl text-indigo-800 font-medium"><strong>Locality:</strong> {user.locality}</p>
        </div>
       
      </div>
    </div>
  );
}

export default Profile;
