import React, { useContext } from 'react';
import { Menu } from '@headlessui/react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import KashanMoinLogo from '../Images/Kashan_Moin_Logo.jpeg';
import { AuthContext } from '../../AuthContext';

const LoggedInNavbar = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="flex items-center cursor-pointer">
        <Link to="/shopping-list">
          <img src={KashanMoinLogo} alt="Kashan Moin Logo" className="h-8 w-8 mr-2 rounded-full" />
        </Link>
        <Link to="/shopping-list">
          <span className="text-lg font-bold">Shopping List</span>
        </Link>
      </div>
      <div className="relative">
        <Menu>
          <Menu.Button className="flex items-center">
            <span className="text-lg font-bold">☰</span>
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2">
            <Menu.Item as={Link} to="/profile" className={({ active }) => `${active ? 'bg-blue-100' : ''} block px-4 py-2 text-sm text-gray-700`}> 
              Profile 
            </Menu.Item>
            <Menu.Item as={Link} to="/details" className={({ active }) => `${active ? 'bg-blue-100' : ''} block px-4 py-2 text-sm text-gray-700`}> 
              Details 
            </Menu.Item>
            <Menu.Item as="div" onClick={handleLogout} className={({ active }) => `${active ? 'bg-blue-100' : ''} block px-4 py-2 text-sm text-gray-700 cursor-pointer`}> 
              Logout 
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
    </nav>
  );
};

export default LoggedInNavbar;
