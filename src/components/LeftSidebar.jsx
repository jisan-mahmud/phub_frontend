import { FiTrendingUp, FiHash } from 'react-icons/fi';

function LeftSidebar() {
  const trendingTags = [
    { name: 'javascript', count: 234 },
    { name: 'python', count: 185 },
    { name: 'react', count: 142 },
    { name: 'node', count: 98 },
  ];

  const topContributors = [
    { name: 'Sarah Johnson', snippets: 45, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
    { name: 'Mike Chen', snippets: 38, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
    { name: 'Lisa Anderson', snippets: 31, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <h2 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white mb-4">
          <FiTrendingUp className="mr-2" />
          Trending Tags
        </h2>
        <div className="space-y-2">
          {trendingTags.map(tag => (
            <div
              key={tag.name}
              className="flex items-center justify-between text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
            >
              <span className="flex items-center">
                <FiHash className="mr-1" />
                {tag.name}
              </span>
              <span className="text-sm text-gray-500">{tag.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Top Contributors
        </h2>
        <div className="space-y-4">
          {topContributors.map(user => (
            <div key={user.name} className="flex items-center space-x-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                <p className="text-xs text-gray-500">{user.snippets} snippets</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeftSidebar;