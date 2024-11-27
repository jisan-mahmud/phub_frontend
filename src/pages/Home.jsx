import { useState } from 'react';
import SnippetList from '../components/SnippetList';

function Home() {
  const [sortBy, setSortBy] = useState('latest');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Latest Snippets</h1>
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-white dark:bg-gray-800 border border-gray-300 
                   dark:border-gray-700 rounded-lg px-3 py-2"
        >
          <option value="latest">Latest</option>
          <option value="popular">Most Popular</option>
          <option value="commented">Most Commented</option>
        </select>
      </div>
      
      <SnippetList />
    </div>
  );
}

export default Home;