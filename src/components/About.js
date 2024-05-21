import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="text-gray-700 mb-4">
          Welcome to Mailbox Stream, your trusted solution for managing your emails efficiently and effectively. Our mission is to provide a seamless and intuitive platform that helps you stay organized and productive.
        </p>
        <p className="text-gray-700 mb-4">
          Our team is dedicated to constantly improving our services to meet your needs. With years of experience in email management and a passion for innovation, we aim to bring you the best tools and features to handle your correspondence.
        </p>
        <p className="text-gray-700 mb-4">
          Thank you for choosing Mailbox Stream. We are committed to delivering exceptional service and support to ensure your satisfaction.
        </p>
        <p className="text-gray-700">
          If you have any questions or feedback, feel free to <a href="/contact" className="text-blue-600 hover:underline">contact us</a>.
        </p>
      </div>
    </div>
  );
};

export default About;
