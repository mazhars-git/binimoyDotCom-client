"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How can I pay for a gadget?",
    answer:
      "We offer multiple secure payment options to make your purchase smooth and flexible. You can pay using debit or credit cards, mobile banking apps (like bKash or Nagad), and even our integrated gateway such as ShurjoPay. Once payment is confirmed, you’ll receive a digital receipt via email and can track your order through your dashboard.",
  },
  {
    question: "What is your return policy?",
    answer:
      "Your satisfaction is our priority. If the gadget you receive is defective, not as described, or damaged during delivery, you can request a return within 7 days of receiving the product. All returned items must be in original packaging with all accessories intact. Once approved, we will initiate a refund or replacement within 3-5 business days.",
  },
  {
    question: "Can I sell my old device here?",
    answer:
      "Yes, you can list any used or new gadgets for sale on our platform. Simply create an account, go to the “Sell a Gadget” section, upload clear images, write an accurate description, set a price, and publish your listing. Once listed, interested buyers will contact you directly through the platform to negotiate or make a purchase.",
  },
  {
    question: "Is my transaction secure?",
    answer:
      "Absolutely. Our platform uses modern encryption technologies (SSL/TLS) to protect your data and payment information. We’ve partnered with secure payment gateways, and we never store sensitive card details. Additionally, we monitor all transactions to detect suspicious activity and ensure a safe environment for buyers and sellers.",
  },
  {
    question: "Do I need an account to buy?",
    answer:
      "You can browse products without logging in. However, to make a purchase, leave a review, save favorites, or track your orders, you’ll need to create a free account. Having an account also allows you to contact sellers directly and access special offers exclusive to registered users.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-orange-500 mb-4">FAQs</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Got questions about buying or selling gadgets? We’ve got you covered.
        </p>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div key={index} className="border rounded-lg dark:border-gray-700">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full px-4 py-3 text-left bg-blue-50 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 focus:outline-none"
              >
                <span className="font-medium">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-blue-600 transition-transform duration-200 ${
                    openIndex === index ? "rotate-45" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-4 py-3 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-t dark:border-gray-700">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
          {filteredFaqs.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400">
              No questions matched your search.
            </p>
          )}
        </div>

        {/* Need Help*/}
        <div className="mt-12 bg-blue-100 dark:bg-gray-800 p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-2">Need more help?</h3>
          <p className="mb-4">
            Can’t find your answer? Our support team is here to help you
            anytime.
          </p>
          <a
            href="#contactSection"
            className="inline-block px-6 py-2 bg-orange-500 text-white rounded-xl hover:bg-slate-400 transition"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}
