import React, { useState, useEffect } from 'react';
import UserCard from './components/UserCard';
import SearchBar from './components/SearchBar';
import SkeletonCard from './components/SkeletonCard';

function App() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchUsers = async (pageNum) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://api.freeapi.app/api/v1/public/randomusers?page=${pageNum}&limit=12`);
      if (!res.ok) throw new Error('Failed to fetch users');
      
      const json = await res.json();
      const newUsers = json.data.data.map(u => u.data); // flatten per GEMINI.md
      
      setUsers(prev => pageNum === 1 ? newUsers : [...prev, ...newUsers]);
    } catch (err) {
      setError(err.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const filteredUsers = users.filter(user => {
    const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
    const email = user.email.toLowerCase();
    const query = searchQuery.toLowerCase();
    return fullName.includes(query) || email.includes(query);
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-2">Random Users</h1>
          <p className="text-gray-600">Discover people from around the world</p>
        </header>

        <SearchBar onSearch={handleSearch} />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-[10px] mb-8 text-center">
            {error}
            <button 
              onClick={() => fetchUsers(page)}
              className="ml-4 font-semibold underline hover:text-red-800"
            >
              Try Again
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUsers.map((user, index) => (
            <UserCard key={`${user.email}-${index}`} user={user} />
          ))}
          
          {loading && Array.from({ length: 12 }).map((_, i) => (
            <SkeletonCard key={`skeleton-${i}`} />
          ))}
        </div>

        {!loading && filteredUsers.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No users found matching "{searchQuery}"</p>
          </div>
        )}

        {!loading && filteredUsers.length > 0 && (
          <div className="mt-12 text-center">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-[10px] shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Load More Users
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
