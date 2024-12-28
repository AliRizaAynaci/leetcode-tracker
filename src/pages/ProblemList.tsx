import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  date: string;
  notes: string;
  status: 'Solved' | 'Attempted' | 'Todo';
  timeTaken: number; // Dakika cinsinden
  projectLink: string; // Proje linki
}

const getDifficultyStyle = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-500 text-white';
    case 'Medium':
      return 'bg-yellow-500 text-white';
    case 'Hard':
      return 'bg-red-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'Solved':
      return 'bg-blue-500 text-white';
    case 'Attempted':
      return 'bg-purple-500 text-white';
    case 'Todo':
      return 'bg-gray-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

const ProblemList = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Kullanıcı adını lokal storage'dan al
  const getUsername = () => {
    const userData = localStorage.getItem('leetcode_user');
    if (userData) {
      const user = JSON.parse(userData);
      return user.username;
    }
    return 'guest';
  };

  const username = getUsername();
  const storageKey = `leetcode_problems_${username}`;

  useEffect(() => {
    const savedProblems = JSON.parse(localStorage.getItem(storageKey) || '[]');
    setProblems(savedProblems);
  }, [storageKey]);

  const filteredProblems = problems.filter(problem =>
    problem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Problem Listesi</h1>
          <p className="mt-2 text-sm text-gray-400">
            Çözdüğünüz ve çalıştığınız tüm LeetCode problemlerinin listesi
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={() => navigate('/add-problem')}
            className="btn-primary flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Yeni Problem Ekle
          </button>
        </div>
      </div>

      <div className="mt-6">
        <input
          type="text"
          placeholder="Problem ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-primary max-w-md"
        />
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                Problem
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                Zorluk
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                Durum
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                Çözüm Süresi (Dakika)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                Proje Linki
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                Tarih
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-700">
            {filteredProblems.map((problem) => (
              <tr key={problem.id} className="hover:bg-gray-800 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                  <div className="font-medium">{problem.title}</div>
                  {problem.notes && (
                    <div className="text-gray-400 text-xs">{problem.notes}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded ${getDifficultyStyle(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded ${getStatusStyle(problem.status)}`}>
                    {problem.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {problem.timeTaken} dakika
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {problem.projectLink ? (
                    <a href={problem.projectLink} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
                      Soruya Git
                    </a>
                  ) : (
                    <span className="text-gray-500">Link yok</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {new Date(problem.date).toLocaleDateString('tr-TR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProblems.length === 0 && (
          <div className="mt-16 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-100">Problem bulunamadı</h3>
            <p className="mt-1 text-sm text-gray-400">
              Yeni bir problem ekleyerek başlayın.
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/add-problem')}
                className="btn-primary inline-flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Yeni Problem Ekle
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemList;