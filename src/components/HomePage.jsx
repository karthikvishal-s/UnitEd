import React from 'react';
import { Link } from 'react-router-dom';
import { FeatureCard } from './ui/FeatureCard';
export function HomePage() {
  return (
    <div className="bg-gray-50 pt-20">
      <div className="relative h-screen flex items-center justify-center bg-gradient-to-b from-indigo-800 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-yellow-400"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-blue-300"></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-red-400"></div>
        </div>
        <div className="text-center px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">A Platform for All Students</h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Empowering students to express, connect, and support each other
          </p>
          <Link 
            to="/login" 
            className="px-8 py-4 bg-yellow-500 text-indigo-900 font-bold rounded-full text-lg shadow-lg hover:bg-yellow-400 transition-all duration-300 hover:shadow-xl"
          >
            Join Now
          </Link>
        </div>
      </div>

      <div className="py-20 px-6 md:px-16 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-900 mb-12">
          Addressing Student Challenges
        </h2>
        <div className="max-w-4xl mx-auto">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Not able to give feedback publicly on teachers",
              "Not able to stand up against bullies and harassments",
              "Not able to question the edu. facilities publicly",
              "Being a person with disability",
              "Can't able to express their expertise in their skills",
              "Without pre-primary education"
            ].map((item, index) => (
              <li 
                key={index} 
                className="flex items-start p-4 bg-blue-50 rounded-lg shadow-sm"
              >
                <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-indigo-800 font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="py-20 px-6 md:px-16 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-900 mb-14">
          What We Facilitate
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard 
            title="Individual Login" 
            description="Secure ID system with password, grade, locality, school, and DOB"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
          />
          
          <FeatureCard 
            title="Feedback System" 
            description="Express concerns about education quality and facilities"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            }
          />
          
          <FeatureCard 
            title="Anti-Bullying Platform" 
            description="Report and stand up against bullying and harassment"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            }
          />
          
          <FeatureCard 
            title="Talent Showcase" 
            description="Share your skills and expertise with your peers"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            }
          />
          
          <FeatureCard 
            title="Inclusive Design" 
            description="Accessible for students with disabilities"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
}