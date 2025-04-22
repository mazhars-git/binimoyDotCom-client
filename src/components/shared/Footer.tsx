import { Facebook, Instagram, X } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/products", label: "App Products" },
    { href: "/about", label: "About Us" },
    { href: "/testimonial", label: "Testimonial" },
    { href: "/blogs", label: "Blogs" },
    { href: "/contact", label: "Contact Us" },
  ];

  const socialLinks = [
    { href: "#", icon: Facebook },
    { href: "#", icon: Instagram },
    { href: "#", icon: X },
  ];
  return (
    <footer className="py-6 bg-sky-400 dark:bg-gray-800 text-gray-500 dark:text-gray-50">
      <div className="container px-6 mx-auto space-y-6 divide-y divide-gray-400 dark:divide-gray-600 md:space-y-6 divide-opacity-50">
        <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0 py-6">
          <div className="">
            <a
              rel="noopener noreferrer"
              href="#"
              className="flex justify-center space-x-3 md:justify-start"
            >
              <span className="self-center text-2xl font-semibold">
                AdolBodol
              </span>
            </a>
          </div>
          <div className="">
            <ul className="flex flex-wrap justify-center text-sm text-nowrap  font-medium gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
          <span>Team Pixel Syndicate©2025 All rights reserved</span>

          <div className="flex items-center space-x-4">
            {socialLinks.map(({ href, icon: Icon }, index) => (
              <Link
                href={href}
                key={index}
                className="text-gray-600 hover:text-white"
              >
                <Icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
