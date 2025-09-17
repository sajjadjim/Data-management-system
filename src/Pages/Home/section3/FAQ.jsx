import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"; // Icons for expand/collapse

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "What is this website about?",
      answer:
        "This website is a platform for managing products, orders, and customer interactions. It offers easy-to-use features for inventory management, order tracking, and customer support.",
    },
    {
      question: "How can I add a new product?",
      answer:
        "To add a new product, go to the 'Products' section in the dashboard and click on the 'Add Product' button. Fill in the product details and save.",
    },
    {
      question: "How can I update my profile information?",
      answer:
        "You can update your profile information in the 'Settings' section. Here, you can change your name, email, profile picture, and other personal details.",
    },
    {
      question: "What do I do if I forget my password?",
      answer:
        "If you forget your password, click on the 'Forgot Password' link on the login page. Follow the instructions to reset your password via email.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can contact customer support by visiting the 'Contact' page, where you'll find our contact form and support email. We will respond within 24 hours.",
    },
  ];

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle the active index for showing the answer
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Frequently Asked Questions (FAQ)</h1>

      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleAnswer(index)}
            >
              <h2 className="text-xl font-semibold text-gray-800">{faq.question}</h2>
              {activeIndex === index ? (
                <AiOutlineMinus size={20} className="text-blue-600" />
              ) : (
                <AiOutlinePlus size={20} className="text-blue-600" />
              )}
            </div>
            {activeIndex === index && (
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
