import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
      const data = await response.json();

      if (data.status === 'error' || !data.totalSolved) {
        throw new Error('Kullanıcı bulunamadı veya veriler alınamadı');
      }

      const userData = {
        username,
        totalSolved: data.totalSolved || 0,
        easySolved: data.easySolved || 0,
        mediumSolved: data.mediumSolved || 0,
        hardSolved: data.hardSolved || 0,
        lastUpdated: new Date().toISOString()
      };

      localStorage.setItem('leetcode_user', JSON.stringify(userData));
      navigate('/dashboard');
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Login Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">LeetCode Tracker</h1>
          <p className="text-gray-400">Coding yolculuğunuzu takip edin</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LeetCode Kullanıcı Adı
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-primary"
                  placeholder="Kullanıcı adınızı girin"
                  required
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full"
              >
                {isLoading ? 'Yükleniyor...' : 'Takip Etmeye Başla'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;