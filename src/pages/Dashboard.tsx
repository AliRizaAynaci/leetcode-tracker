import { useEffect, useState } from 'react';
import { User } from '../types';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('leetcode_user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('leetcode_user');
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 bg-gray-950 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
        >
          Çıkış Yap
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-r from-indigo-600 to-purple-600">
          <h3 className="text-xl font-semibold text-white mb-2">Toplam Çözülen</h3>
          <p className="text-5xl font-extrabold text-yellow-300">{user.totalSolved}</p>
        </div>
        
        <div className="card bg-gradient-to-r from-green-500 to-teal-500">
          <h3 className="text-xl font-semibold text-white mb-2">Son Güncelleme</h3>
          <p className="text-lg text-gray-200">
            {user.lastUpdated ? new Date(user.lastUpdated).toLocaleDateString('tr-TR') : '-'}
          </p>
        </div>

        <div className="card bg-gradient-to-r from-red-500 to-pink-500">
          <h3 className="text-xl font-semibold text-white mb-4">Zorluk Dağılımı</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-green-300 font-medium">Kolay:</span>
              <span className="text-white">{user.easySolved}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-yellow-300 font-medium">Orta:</span>
              <span className="text-white">{user.mediumSolved}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-300 font-medium">Zor:</span>
              <span className="text-white">{user.hardSolved}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;