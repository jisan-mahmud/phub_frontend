import { useState } from 'react';

function CommentForm({ onSubmit, onCancel, placeholder = 'Write a comment...' }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content.trim());
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-start space-x-2">
      <img
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Current"
        alt="Current user"
        className="w-8 h-8 rounded-full flex-shrink-0"
      />
      <div className="flex-1 relative">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 
                   dark:border-gray-600 rounded-full text-sm text-gray-900 dark:text-white
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        {content.trim() && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
            {onCancel && (
              <button
                type="button"
                onClick={() => {
                  setContent('');
                  onCancel();
                }}
                className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700"
            >
              Post
            </button>
          </div>
        )}
      </div>
    </form>
  );
}

export default CommentForm;