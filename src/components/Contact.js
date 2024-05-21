
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., send data to backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        {submitted ? (
          <p className="text-green-600">Thank you for your message! We will get back to you soon.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
