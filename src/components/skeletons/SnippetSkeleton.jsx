function SnippetSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden animate-pulse">
      <div className="p-6">
        {/* Author Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div>
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded mt-2"></div>
            </div>
          </div>
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>

        {/* Title and Description */}
        <div className="space-y-3 mb-4">
          <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          ))}
        </div>

        {/* Code Block */}
        <div className="rounded-xl bg-gray-200 dark:bg-gray-700 h-48"></div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default SnippetSkeleton;