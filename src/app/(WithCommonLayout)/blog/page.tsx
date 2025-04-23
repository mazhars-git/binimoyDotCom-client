"use client";

import Image from "next/image";

const Blog = () => {
  return (
    <section className="bg-white dark:bg-[#1A2238] py-16">
      <div className="container px-6 mx-auto">
        <h1 className="text-2xl text-center font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
          From The Blog
        </h1>

        <div className="mt-2 mb-20 flex items-center justify-center">
          <span className="inline-block w-40 h-1 bg-blue-600 rounded-full"></span>
          <span className="inline-block w-3 h-1 ml-1 bg-blue-600 rounded-full"></span>
          <span className="inline-block w-1 h-1 ml-1 bg-blue-600 rounded-full"></span>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Top 5 Budget Phones to Buy in 2025",
              date: "April 10, 2025",
              image:
                "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=1470&q=80",
            },
            {
              title: "How to Safely Sell Your Old Gadgets Online",
              date: "March 30, 2025",
              image:
                "https://images.unsplash.com/photo-1688566842889-ff5cd19cac00?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              title: "Essential Features to Check Before Buying a Laptop",
              date: "March 20, 2025",
              image:
                "https://images.unsplash.com/photo-1706669932082-fc2a1a5351ec?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              title: "Gadget Maintenance Tips to Prolong Lifespan",
              date: "February 28, 2025",
              image:
                "https://images.unsplash.com/photo-1628130235364-9e412ffaae5a?q=80&w=1941&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              title: "Where to Find the Best Deals on Used Devices",
              date: "February 10, 2025",
              image:
                "https://images.unsplash.com/photo-1574920162043-b872873f19c8?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              title: "Why Buying Refurbished Tech is a Smart Move",
              date: "January 25, 2025",
              image:
                "https://images.unsplash.com/photo-1515940175183-6798529cb860?q=80&w=1929&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
          ].map((post, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#273043] border border-[#A0C4FF] dark:border-[#4361EE] rounded-2xl shadow-md overflow-hidden transition-transform hover:scale-105"
            >
              <Image
                className="object-cover w-full h-56"
                src={post.image}
                alt={post.title}
                width={600}
                height={300}
              />
              <div className="p-6 flex flex-col justify-between h-full">
                <a
                  href="#"
                  className="text-xl font-semibold text-[#1D3557] dark:text-[#F0F6FF] hover:text-[#4361EE] dark:hover:text-[#A0C4FF] transition-colors"
                >
                  {post.title}
                </a>
                <span className="text-sm text-[#457B9D] dark:text-[#F0F6FF] mt-3">
                  On: {post.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
