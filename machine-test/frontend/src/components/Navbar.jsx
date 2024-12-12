import React from 'react';
import img4 from '../assets/images/img4.png'

const Navbar = () => {
  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">
      {/* Logo and Brand Name */}
      <div className="flex items-center gap-3">
        <img
          src={img4}
          alt="Deep Net Soft Logo"
          className="h-8 w-auto" // Adjust size as needed
        />
        <div className="text-2xl font-semibold">DEEP NET SOFT</div>
      </div>
      
      {/* Navigation Links */}
      <ul className="flex gap-6 text-[17px] font-bold">
        <li>
          <a href="#home" className="hover:text-blue-400">HOME</a>
        </li>
        <li>
          <a href="#menu" className="hover:text-blue-400">MENU</a>
        </li>
        <li>
          <a href="#make" className="hover:text-blue-400">MAKE A RESERVATION </a>
        </li>
        <li>
          <a href="#contact" className="hover:text-blue-400">CONTACT US</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
