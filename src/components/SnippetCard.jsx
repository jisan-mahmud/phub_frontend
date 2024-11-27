import { useState } from 'react';
import { FiArrowUp, FiArrowDown, FiMessageSquare, FiBookmark, FiShare2, FiCopy } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {timeAgo, isAuthenticated} from '../utility'

function SnippetCard({ snippet }) {
  const [isSaved, setIsSaved] = useState(false);
  const [upVotes, setUpVotes] = useState(snippet.upvotes);
  const [downVotes, setDownVotes] = useState(snippet.downvotes);
  const [voted, setVoted] = useState(0);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate()

  const handleVote = (voteType) => {
    if(isAuthenticated()){
      if (voteType == 'upvote') {
        if(voted === 1){
          setVoted(0)
          setUpVotes(upVotes - 1);
        }else if(voted === -1){
          setDownVotes(downVotes - 1);
          setVoted(1)
          setUpVotes(upVotes + 1);
        }else{
          setVoted(1)
          setUpVotes(upVotes + 1);
        }
      } else {
        if(voted === -1){
          setVoted(0)
          setDownVotes(downVotes - 1);
        }else if(voted === 1){
          setUpVotes(upVotes - 1);
          setVoted(-1)
          setDownVotes(downVotes + 1);
        }else{
          setVoted(-1)
          setDownVotes(downVotes + 1);
        }
      }
    }else{
     navigate('/login')
    }
    
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: snippet.title,
        text: snippet.description,
        url: window.location.href
      });
    } catch (err) {
      console.log('Share failed:', err);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={snippet.user.profile_image}
              alt={snippet.user.username}
              className="w-10 h-10 rounded-full ring-2 ring-gray-100 dark:ring-gray-700"
            />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {snippet.user.first_name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {timeAgo(snippet.created_at)}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700
              ${isSaved ? 'text-indigo-500' : 'text-gray-400'}`}
            aria-label="Save snippet"
          >
            <FiBookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {snippet.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {snippet.description}
        </p>

        {/* <div className="flex flex-wrap gap-2 mb-4">
          {snippet.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 text-sm bg-indigo-50 dark:bg-indigo-900/30 
                       text-indigo-600 dark:text-indigo-400 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div> */}

        <div className="relative rounded-xl overflow-hidden bg-gray-900 group">
          <div className="absolute right-2 top-2 flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white 
                       rounded-lg text-sm font-medium transition-colors
                       flex items-center space-x-1"
            >
              <FiCopy className="w-4 h-4" />
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
          <SyntaxHighlighter
            language={snippet.language}
            style={atomOneDark}
            customStyle={{
              padding: '1.5rem',
              borderRadius: '0.75rem',
              margin: 0,
              fontSize: '0.875rem'
            }}
            showLineNumbers={true}
          >
            {snippet.snippet}
          </SyntaxHighlighter>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <span className={`font-medium ${
                  upVotes > 0 ? 'text-indigo-500' :
                  upVotes < 0 ? 'text-red-500' :
                  'text-gray-500'
                }`}>
                {upVotes}
              </span>
              <button
                onClick={() => handleVote('upvote', 1)}
                className={`p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700`}
                aria-label="Upvote"
              >
                <FiArrowUp className="w-5 h-5" />
              </button>
              
              <span className={`font-medium ${
                  downVotes > 0 ? 'text-indigo-500' :
                  downVotes < 0 ? 'text-red-500' :
                  'text-gray-500'
                }`}>
                {downVotes}
              </span>
              <button
                onClick={() => handleVote('downvote',-1)}
                className={`p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700`}
                aria-label="Downvote"
              >
                <FiArrowDown className="w-5 h-5" />
              </button>
            </div>
            <Link
              to={`/snippets/${snippet.id}/comments`}
              className="flex items-center space-x-1.5 text-gray-500 hover:text-gray-700 
                       dark:hover:text-gray-300"
            >
              <FiMessageSquare className="w-5 h-5" />
              <span className="font-medium">{snippet.total_comment}</span>
            </Link>
          </div>
          <button
            onClick={handleShare}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-700 
                     hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Share"
          >
            <FiShare2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SnippetCard;