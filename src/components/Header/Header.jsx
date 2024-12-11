import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  
  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ];

  return (
    <header className="py-3 shadow-lg bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="mr-4">
            <Link to="/">
              <Logo width={'70px'} />
            </Link>
          </div>
          {/* Desktop and large screen navigation */}
          <ul className="hidden md:flex space-x-6">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="inline-block px-6 py-2 text-white duration-200 hover:bg-blue-700 rounded-full"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li >
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="text-white text-2xl"
              
              // Add logic to toggle the menu here if needed
            >
              &#9776; {/* Hamburger icon */}
            </button>
            
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
