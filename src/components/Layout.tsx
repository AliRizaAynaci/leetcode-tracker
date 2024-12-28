import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface UserData {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  lastUpdated?: string;
}

const Layout = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('leetcode_user');
    if (!userData) {
      navigate('/');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('leetcode_user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-opacity-90 backdrop-blur-sm bg-gray-800 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white p-2 rounded-lg hover:bg-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center space-x-4">
            <span className="text-white font-medium">{user?.username}</span>
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
              {user?.username?.[0]?.toUpperCase()}
            </div>
            <button
              onClick={handleLogout}
              className="ml-4 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <nav className={`fixed left-0 top-16 bottom-0 w-64 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out bg-gray-800 text-white z-20`}>
          <div className="p-6 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl">
                <div className="text-3xl font-bold">{user?.totalSolved}</div>
                <div className="text-sm opacity-80">Toplam</div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-xl">
                <div className="text-3xl font-bold">{user?.easySolved}</div>
                <div className="text-sm opacity-80">Kolay</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-4 rounded-xl">
                <div className="text-3xl font-bold">{user?.mediumSolved}</div>
                <div className="text-sm opacity-80">Orta</div>
              </div>
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-xl">
                <div className="text-3xl font-bold">{user?.hardSolved}</div>
                <div className="text-sm opacity-80">Zor</div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-2">
              <Link
                to="/dashboard"
                className="block px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <span>Dashboard</span>
                </div>
              </Link>
              <Link
                to="/problems"
                className="block px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H3a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  <span>Problemler</span>
                </div>
              </Link>
              <Link
                to="/statistics"
                className="block px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                  <span>İstatistikler</span>
                </div>
              </Link>
            </div>

            {/* Add Problem Button */}
            <button
              onClick={() => navigate('/add-problem')}
              className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>Yeni Problem Ekle</span>
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} p-8`}>
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;