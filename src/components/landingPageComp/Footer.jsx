import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const FooterLink = ({ href, children }) => (
  <a
    href={href}
    className="text-gray-300 hover:text-white transition-colors duration-200"
  >
    {children}
  </a>
);

const SocialIcon = ({ href, Icon }) => (
  <a
    href={href}
    className="text-gray-300 hover:text-white transition-colors duration-200"
  >
    <Icon size={20} />
  </a>
);

const Footer = () => (
  <footer className="bg-gray-800 text-white">
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-gray-400">
            We are a leading institution dedicated to providing quality
            education and fostering innovation.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <FooterLink href="/programs">Programs</FooterLink>
            </li>
            <li>
              <FooterLink href="/admissions">Admissions</FooterLink>
            </li>
            <li>
              <FooterLink href="/campus-life">Campus Life</FooterLink>
            </li>
            <li>
              <FooterLink href="/research">Research</FooterLink>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <address className="text-gray-400 not-italic">
            Flex Edu
            <br />
            algeria, 16000
            <br />
            Phone: (123) 456-7890
            <br />
            Email: info@flux.edu
          </address>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <SocialIcon href="https://facebook.com" Icon={FaFacebookF} />
            <SocialIcon href="https://twitter.com" Icon={FaTwitter} />
            <SocialIcon href="https://instagram.com" Icon={FaInstagram} />
            <SocialIcon href="https://linkedin.com" Icon={FaLinkedinIn} />
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} FlexEdu . All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
