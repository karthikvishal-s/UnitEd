import React from 'react';

function About() {
  return (
    <div className="min-h-screen bg-cover bg-center py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundImage: 'url(./src/assets/img1.wallspic.com-visual_arts-dark-smartphone-art-the_arts-1620x2880.jpg)' }}>
      <br></br>
      <br></br>
      <br></br>
      <div className="max-w-4xl mx-auto bg-white bg-opacity-40 rounded-lg p-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-b-100 mb-4">About Us</h2>
          <div className="h-1 w-24 bg-blue-200 mx-auto"></div>
        </div>
        
        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6">Our Mission</h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            We are committed to creating an inclusive platform that supports quality education
            for all students, aligned with Sustainable Development Goal 4. We believe that every
            student deserves a voice to express concerns, share talents, and stand together against challenges.
            <br></br>
            <br></br>
             <a href="https://sdgs.un.org/goals/goal4" target="blank"><b><u>Click here for more information</u></b> </a>
          </p>
        </div>
        
        {/* SDG Section */}
        <div className="bg-blue-50 rounded-lg shadow-sm p-8 mb-12">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6">Sustainable Development Goal 4</h3>
          <p className="text-lg text-gray-600 mb-6">Our platform addresses multiple targets under SDG 4:</p>
          <ul className="space-y-4">
            {[
              { num: "4.1", text: "Ensure all girls and boys complete free, equitable and quality primary and secondary education" },
              { num: "4.3", text: "Ensure equal access to affordable technical, vocational and higher education" },
              { num: "4.4", text: "Increase the number of people with relevant skills for financial success" },
              { num: "4.6", text: "Ensure all youth achieve literacy and numeracy" },
              { num: "4.c", text: "Increase the supply of qualified teachers" }
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-200 flex items-center justify-center mr-3 mt-1">
                  <span className="text-sm font-medium text-blue-800">{index + 1}</span>
                </span>
                <div>
                  <span className="font-semibold text-blue-800">{item.num}:</span>
                  <span className="text-gray-600 ml-2">{item.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Values Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-700 text-center mb-8">Our Values</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Inclusivity", desc: "Creating a platform accessible to all students regardless of background or ability" },
              { title: "Empowerment", desc: "Giving students the tools to speak up and make positive changes" },
              { title: "Safety", desc: "Providing a secure environment to express concerns without fear" },
              { title: "Growth", desc: "Fostering personal and academic development through peer support" }
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-200 hover:shadow-md transition-shadow duration-300">
                <h4 className="text-xl font-semibold text-gray-700 mb-3">{value.title}</h4>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Team Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-gray-700 text-center mb-10">Our Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Karthik Vishal", role: "Frontend Developer", bio: "Passionate about creating intuitive and accessible user interfaces." },
              { name: "Rishiikesh", role: "Backend Engineer", bio: "Dedicated to building robust and scalable backend solutions." },
              { name: "Chandana", role: "UI/UX Designer", bio: "Committed to crafting beautiful and user-centered design experiences." }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="h-40 bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center">
                  <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center">
                    <span className="text-2xl text-blue-400 font-light">{member.name.charAt(0)}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-700 mb-1">{member.name}</h4>
                  <p className="text-blue-500 text-sm mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
