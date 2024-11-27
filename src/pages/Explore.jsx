import { useState } from 'react';
import SnippetCard from '../components/SnippetCard';

function Explore() {
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  const languages = [
    { id: 'all', name: 'All Languages' },
    { id: 'javascript', name: 'JavaScript' },
    { id: 'python', name: 'Python' },
    { id: 'java', name: 'Java' },
    { id: 'cpp', name: 'C++' }
  ];

  const snippets = [
    {
      id: 1,
      title: 'Python List Comprehension',
      description: 'A quick example of list comprehension in Python',
      language: 'python',
      code: `numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers if x % 2 == 0]
print(squares)  # Output: [4, 16]`,
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
      },
      likes: 28,
      comments: 3,
      tags: ['python', 'lists']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Explore Snippets</h1>
        
        <div className="flex flex-wrap gap-2">
          {languages.map(lang => (
            <button
              key={lang.id}
              onClick={() => setSelectedLanguage(lang.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedLanguage === lang.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {snippets.map(snippet => (
          <SnippetCard key={snippet.id} snippet={snippet} />
        ))}
      </div>
    </div>
  );
}

export default Explore;