import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SnippetCard from '../components/SnippetCard';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import { fetchSnippet } from '../services/snippetService';

function Comments() {
  const { snippetId } = useParams(); // Get the snippetId from the URL
  const [comments, setComments] = useState([
    {
      id: 1,
      content: "This is really helpful! I've been looking for a clean way to handle file uploads.",
      author: {
        name: 'Emma Wilson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma'
      },
      timestamp: '2 hours ago',
      likes: 5,
      replies: [
        {
          id: 2,
          content: "Glad you found it useful! Don't forget to add error handling.",
          author: {
            name: 'John Doe',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
          },
          timestamp: '1 hour ago',
          likes: 2
        }
      ]
    }
  ]);
  
  const [snippet, setSnippet] = useState(null); // Initialize snippet state

  useEffect(() => {
    const loadSnippet = async () => {
      try {
        const fetchedSnippet = await fetchSnippet(snippetId); // Fetch snippet data
        setSnippet(fetchedSnippet); // Set the snippet state
      } catch (error) {
        console.error('Error fetching snippet:', error);
      }
    };
    
    loadSnippet(); // Call the function to load the snippet
  }, [snippetId]); // Dependency array to run the effect whenever snippetId changes

  const handleAddComment = (content) => {
    const newComment = {
      id: comments.length + 1,
      content,
      author: {
        name: 'Current User',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Current'
      },
      timestamp: 'Just now',
      likes: 0,
      replies: []
    };
    setComments([newComment, ...comments]); // Add new comment to the state
  };

  return (
    <div className="space-y-6">
      {snippet && <SnippetCard snippet={snippet} />} {/* Render SnippetCard if snippet is not null */}
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Comments ({comments.length})
        </h2>
        
        <CommentForm onSubmit={handleAddComment} />
        
        <div className="mt-8">
          <CommentList comments={comments} />
        </div>
      </div>
    </div>
  );
}

export default Comments;
