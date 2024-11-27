function RightSidebar() {
  const following = [
    { name: 'Alex Turner', status: 'online', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
    { name: 'Emma Wilson', status: 'offline', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma' },
    { name: 'David Kim', status: 'online', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Following
      </h2>
      <div className="space-y-4">
        {following.map(user => (
          <div key={user.name} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span
                  className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ${
                    user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                />
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
            </div>
            <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
              Unfollow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RightSidebar;