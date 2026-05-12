import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { subscribeToAuthChanges } from '../../../services/authService';
import useCartStore from '../../../store/cartStore';

export default function NavBar() {
  const location = useLocation();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    /*
      // BACKUP: OLD LOCALSTORAGE METHOD
      // const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
      // setLoggedInUser(user);
    */
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setLoggedInUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const isActive = (path) => location.pathname === path;

  /*
    // BACKUP: OLD LOCALSTORAGE METHOD
    // const handleLogout = () => {
    //   localStorage.removeItem('loggedInUser');
    //   setLoggedInUser(null);
    //   navigate('/login');
    // };
  */

  return (
    <nav className="sticky top-0 z-50 bg-[#0f172a]/70 backdrop-blur-md border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-2xl font-bold hover:opacity-80 transition-opacity"
          >
            <span className="font-sans bg-gradient-to-r from-purple-400 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
              The Dark Store
            </span>
          </Link>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center space-x-8">
            <li>
              <Link
                to="/galeria"
                className={`font-sans text-base font-medium transition-all duration-300 pb-2 border-b-2 ${
                  isActive('/galeria')
                    ? 'text-purple-400 border-purple-400'
                    : 'text-gray-400 border-transparent hover:text-white hover:border-gray-500'
                }`}
              >
                Galería
              </Link>
            </li>
            <li>
              <Link
                to="/carrito"
                className={`font-sans text-base font-medium transition-all duration-300 pb-2 border-b-2 ${
                  isActive('/carrito')
                    ? 'text-purple-400 border-purple-400'
                    : 'text-gray-400 border-transparent hover:text-white hover:border-gray-500'
                }`}
              >
                Carrito ({totalItems})
              </Link>
            </li>
            {loggedInUser ? (
              <li>
                <Link
                  to="/profile"
                  className={`font-sans text-base font-medium transition-all duration-300 pb-2 border-b-2 ${
                    isActive('/profile')
                      ? 'text-purple-400 border-purple-400'
                      : 'text-gray-400 border-transparent hover:text-white hover:border-gray-500'
                  }`}
                >
                  Profile
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/iniciar-sesion"
                    className={`font-sans text-base font-medium transition-all duration-300 pb-2 border-b-2 ${
                      isActive('/iniciar-sesion')
                        ? 'text-purple-400 border-purple-400'
                        : 'text-gray-400 border-transparent hover:text-white hover:border-gray-500'
                    }`}
                  >
                    Iniciar Sesión
                  </Link>
                </li>
                <li>
                  <Link
                    to="/registrarse"
                    className={`font-sans text-base font-medium transition-all duration-300 pb-2 border-b-2 ${
                      isActive('/registrarse')
                        ? 'text-purple-400 border-purple-400'
                        : 'text-gray-400 border-transparent hover:text-white hover:border-gray-500'
                    }`}
                  >
                    Registrarse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Mobile Menu Button (opcional para futuro) */}
          <button className="md:hidden p-2 rounded-md text-gray-400 hover:bg-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
