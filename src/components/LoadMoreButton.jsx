function LoadMoreButton({ onClick, isLoading }) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="w-full py-3 px-4 border border-gray-300 dark:border-gray-600 
                rounded-lg shadow-sm text-sm font-medium text-gray-700 
                dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 
                dark:hover:bg-gray-700 transition-colors disabled:opacity-50 
                disabled:cursor-not-allowed flex items-center justify-center"
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading more...
        </>
      ) : (
        'Load More'
      )}
    </button>
  );
}

export default LoadMoreButton;