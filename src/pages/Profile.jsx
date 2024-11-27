import { useState } from 'react';
import SnippetCard from '../components/SnippetCard';

function Profile() {
  const [activeTab, setActiveTab] = useState('snippets');
  
  const userProfile = {
    name: 'John Doe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    bio: 'Full-stack developer passionate about React and Node.js',
    stats: {
      snippets: 24,
      followers: 156,
      following: 89
    }
  };

  const userSnippets = [
    {
      id: 1,
      title: 'Node.js File Upload',
      description: 'Example of handling file uploads in Node.js',
      language: 'javascript',
      code: `const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ file: req.file });
});`,
      author: userProfile,
      likes: 15,
      comments: 2,
      tags: ['nodejs', 'express']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-4">
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {userProfile.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">{userProfile.bio}</p>
          </div>
        </div>

        <div className="flex space-x-8 mt-6">
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              {userProfile.stats.snippets}
            </div>
            <div className="text-sm text-gray-500">Snippets</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              {userProfile.stats.followers}
            </div>
            <div className="text-sm text-gray-500">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              {userProfile.stats.following}
            </div>
            <div className="text-sm text-gray-500">Following</div>
          </div>
        </div>
      </div>

      <div className="border-b dark:border-gray-700">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('snippets')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors
              ${activeTab === 'snippets'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
          >
            My Snippets
          </button>
          <button
            onClick={() => setActiveTab('liked')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors
              ${activeTab === 'liked'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
          >
            Liked Snippets
          </button>
        </nav>
      </div>

      <div className="space-y-6">
        {userSnippets.map(snippet => (
          <SnippetCard key={snippet.id} snippet={snippet} />
        ))}
      </div>
    </div>
  );
}

export default Profile;