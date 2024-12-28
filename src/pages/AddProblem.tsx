import { useState } from 'react';
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

const AddProblem = () => {
  const navigate = useNavigate();
  const [problem, setProblem] = useState<Partial<Problem>>({
    difficulty: 'Medium',
    status: 'Todo',
    date: new Date().toISOString().split('T')[0],
    timeTaken: 0,
    projectLink: ''
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const problems = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const newProblem = {
      ...problem,
      id: Date.now().toString()
    };
    
    problems.push(newProblem);
    localStorage.setItem(storageKey, JSON.stringify(problems));
    navigate('/problems');
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Yeni Problem Ekle</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Problem Başlığı
          </label>
          <input
            type="text"
            required
            className="input-primary"
            value={problem.title || ''}
            onChange={(e) => setProblem({...problem, title: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Zorluk Seviyesi
            </label>
            <select
              className="input-primary"
              value={problem.difficulty}
              onChange={(e) => setProblem({...problem, difficulty: e.target.value as 'Easy' | 'Medium' | 'Hard'})}
            >
              <option value="Easy">Kolay</option>
              <option value="Medium">Orta</option>
              <option value="Hard">Zor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Durum
            </label>
            <select
              className="input-primary"
              value={problem.status}
              onChange={(e) => setProblem({...problem, status: e.target.value as 'Solved' | 'Attempted' | 'Todo'})}
            >
              <option value="Todo">Yapılacak</option>
              <option value="Attempted">Denendi</option>
              <option value="Solved">Çözüldü</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Çözüm Süresi (Dakika)
          </label>
          <input
            type="number"
            min="0"
            className="input-primary"
            value={problem.timeTaken || 0}
            onChange={(e) => setProblem({...problem, timeTaken: Number(e.target.value)})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Proje Linki
          </label>
          <input
            type="url"
            className="input-primary"
            value={problem.projectLink || ''}
            onChange={(e) => setProblem({...problem, projectLink: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Notlar
          </label>
          <textarea
            className="input-primary"
            rows={4}
            value={problem.notes || ''}
            onChange={(e) => setProblem({...problem, notes: e.target.value})}
          ></textarea>
        </div>

        <div className="flex gap-4">
          <button type="submit" className="btn-primary">
            Kaydet
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/problems')}
            className="btn-primary bg-gray-500"
          >
            İptal
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProblem;