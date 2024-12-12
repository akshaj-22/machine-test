import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import img4 from '../assets/images/img4.png';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto grid grid-cols-3 gap-6 text-center">
        {/* Connect With Us */}
        <div className="border border-gray-600 p-4 rounded-lg">
          <p className="text-blue-500 font-semibold">CONNECT WITH US</p>
          <p className="mt-2 text-sm">
            <i className="fas fa-phone-alt"></i> +91 9567843340
          </p>
          <p className="mt-1 text-sm">
            <i className="fas fa-envelope"></i> info@deepnetsoft.com
          </p>
        </div>

        {/* Logo and Social Icons */}
        <div className="border border-gray-600 p-4 rounded-lg">
          <img
            src={img4} // Replace with your logo's path
            alt="Deep Net Soft Logo"
            className="mx-auto mb-4 h-12"
          />
          <p className="text-blue-500 font-semibold">DEEP <span className="text-gray-200">NET</span> <span className="text-gray-400">SOFT</span></p>
          <div className="flex justify-center gap-4 mt-4">
            <a
              href="#"
              className="text-gray-400 hover:text-blue-500"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-500"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-500"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Find Us */}
        <div className="border border-gray-600 p-4 rounded-lg">
          <p className="text-blue-500 font-semibold">FIND US</p>
          <p className="mt-2 text-sm">
            <i className="fas fa-map-marker-alt"></i> First Floor, Geo Infopark,
          </p>
          <p className="text-sm">Infopark EXPY, Kakkanad</p>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="mt-8 border-t border-gray-700 pt-8 flex justify-between text-sm text-gray-400">
        <p>© 2024 Deepnetsoft Solutions. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-blue-500">Terms & Conditions</a>
          <a href="#" className="hover:text-blue-500">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
