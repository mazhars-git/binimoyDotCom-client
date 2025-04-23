import Image from "next/image";
import React from "react";

const FeatureSection = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
          Explore our <br /> awesome features
        </h1>

        <div className="mt-2">
          <span className="inline-block w-40 h-1 bg-blue-600 rounded-full"></span>
          <span className="inline-block w-3 h-1 ml-1 bg-blue-600 rounded-full"></span>
          <span className="inline-block w-1 h-1 ml-1 bg-blue-600 rounded-full"></span>
        </div>

        <div className="mt-8 xl:mt-12 lg:flex lg:items-center">
          <div className="grid w-full grid-cols-1 gap-8 lg:w-1/2 xl:gap-16 md:grid-cols-2">
            {[
              {
                icon: "📦",
                title: "Fast Delivery System",
                description:
                  "Get your gadgets delivered within 24–72 hours. Our logistics partners ensure your orders are safe, fast, and always trackable in real-time.",
              },
              {
                icon: "🔒",
                title: "Secure Transactions",
                description:
                  "All your transactions are protected with end-to-end encryption and trusted payment gateways like ShurjoPay, bKash, and more.",
              },
              {
                icon: "🛒",
                title: "Smart Gadget Listings",
                description:
                  "List and discover gadgets with ease using advanced filters, keyword-based search, and dynamic recommendations.",
              },
              {
                icon: "⚡",
                title: "Real-Time Chat",
                description:
                  "Connect directly with buyers or sellers through built-in messaging to negotiate, ask questions, and close deals quickly.",
              },
              {
                icon: "⭐",
                title: "Verified Reviews",
                description:
                  "Read honest feedback from real users before buying. We only show reviews from verified gadget owners.",
              },
              {
                icon: "🧠",
                title: "AI-Powered Suggestions",
                description:
                  "Our system learns from your behavior to recommend gadgets you might love based on your preferences and previous searches.",
              },
            ].map((feature, idx) => (
              <div className="space-y-3" key={idx}>
                <span className="inline-block p-3 text-blue-600 bg-blue-100 rounded-xl dark:text-white dark:bg-blue-600 text-2xl">
                  {feature.icon}
                </span>
                <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
                  {feature.title}
                </h1>
                <p className="text-gray-500 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex lg:w-1/2 lg:justify-center">
            <Image
              className="w-[28rem] h-[28rem] flex-shrink-0 object-cover xl:w-[34rem] xl:h-[34rem] rounded-full shadow-lg ring-4 ring-blue-600/40"
              src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              width={2400}
              height={1600}
              alt="Gadget display"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
