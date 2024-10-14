"use client"; // Ensure this is a client-side component
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Header() {
  const [userName, setUserName] = useState(''); // Store the username
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track menu open/close state

  useEffect(() => {
    // Retrieve the username from localStorage
    const storedUserName = localStorage.getItem('userId');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const Menu = [
    {
      id: 1,
      name: "Home",
      path: "/"
    },
    {
      id: 2,
      name: "Add",
      path: "/Add"
    },
    {
      id: 3,
      name: "About Us",
      path: "/About"
    }
  ];

  const router = useRouter();

  const handleLogout = () => {
    // Clear authentication status
    localStorage.removeItem('auth');
    localStorage.removeItem('userName'); // Remove the stored username
    router.push('/Login'); // Redirect to login page
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="p-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Logo and Menu Items */}
        <div className="flex items-center gap-4">
          <Image src='/images/logo.svg' alt='logo' width={180} height={80} />
          {/* Responsive navigation menu */}
          <ul className='hidden md:flex gap-8'>
            {Menu.map((item) => (
              <li key={item.id} className="hover:text-primary cursor-pointer hover:scale-105 transition-all ease-out">
                <Link href={item.path}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
            {isMenuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {/* Display username and logout button for desktop */}
        <div className="hidden md:flex items-center gap-4">
          {userName && (
            <p className="text-gray-700">
              Hello, <b>{userName}</b>
            </p>
          )}
          <button
            onClick={handleLogout}
            className="p-2 text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Dropdown for mobile menu */}
      {isMenuOpen && (
        <ul className="md:hidden mt-4 space-y-4">
          {Menu.map((item) => (
            <li key={item.id} className="hover:text-primary cursor-pointer hover:scale-105 transition-all ease-out">
              <Link href={item.path}>
                {item.name}
              </Link>
            </li>
          ))}

          {/* Display username in mobile dropdown */}
          {userName && (
            <li className="text-gray-700">
              Hello, <b>{userName}</b>
            </li>
          )}

          {/* Logout button for mobile */}
          <li>
            <button
              onClick={handleLogout}
              className="p-2 w-full text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Header;
