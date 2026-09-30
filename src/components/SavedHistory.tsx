import { Search, Trash2, Download } from 'lucide-react';
import { useState } from 'react';

const SavedHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Saved Playbooks</h1>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-slate-500" size={20} />
          <input
            type="text"
            placeholder="Search by business name or date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-900 border-b border-slate-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Business Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Industry</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Location</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date Created</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-700 hover:bg-slate-700 transition">
              <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                No saved playbooks yet. Generate your first one to get started!
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SavedHistory;
