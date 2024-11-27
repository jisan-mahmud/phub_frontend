function SidebarSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex items-center justify-between">
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <div className="h-6 w-36 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SidebarSkeleton;