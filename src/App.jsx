import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import './App.css';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Header, Footer } from './components/index';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (!userData) {
      authService.getCurrentUser().then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      }).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [userData, dispatch]);

  return !loading ? (
    <div className="min-h-screen bg-blue-200 flex flex-col">
      <div className="w-full">
        <Header />
        <main className="flex-grow py-6 px-4 sm:px-6 md:px-8">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen bg-gray-800 text-white text-2xl animate-pulse">
      <span>Loading...</span>
    </div>
  );
}

export default App;
