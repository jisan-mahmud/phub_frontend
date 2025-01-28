import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utility';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';
import CommentForm from './CommentForm';

const Comment = ({ comment }) => {
  const { user, content, upvotes, downvotes, links } = comment;
  const { first_name, last_name, profile_image } = user;
  const voteUrl = links.vote;

  const [upVotes, setUpVotes] = useState(upvotes);
  const [downVotes, setDownVotes] = useState(downvotes);
  const [voted, setVoted] = useState(0); 
  const [replyFormVisible, setReplyFormVisible] = useState(false);
  const navigate = useNavigate();

  const handleVote = async (voteType) => {
    if (!isAuthenticated()) {
      return navigate('/login');
    }

    if (voteType === 'upvote') {
      if (voted === 1) {
        setUpVotes(upVotes - 1);
        setVoted(0);
      } else {
        setUpVotes(upVotes + 1);
        if (voted === -1) setDownVotes(downVotes - 1);
        setVoted(1);
      }
    } else {
      if (voted === -1) {
        setDownVotes(downVotes - 1);
        setVoted(0);
      } else {
        setDownVotes(downVotes + 1);
        if (voted === 1) setUpVotes(upVotes - 1);
        setVoted(-1);
      }
    }

    try {
      const response = await fetch(voteUrl, {
        method: 'POST', // or 'GET', depending on what you're doing
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
          vote_type: voteType
        })
      })

      if(!response.ok){
        console.log(response)
      }
    } catch (error) {
      console.error('An error occurred while voting:', error);
      // Revert optimistic UI update on error
      voteType === 'upvote'
        ? setUpVotes((prev) => prev - 1)
        : setDownVotes((prev) => prev - 1);
      setVoted(0);
    }
  };

  return (
    <div className="group">
      <div className="flex space-x-3">
        {/* User Avatar */}
        <img
          src={profile_image}
          alt={`${first_name} ${last_name}`}
          className="w-8 h-8 rounded-full flex-shrink-0"
        />

        <div className="w-full">
          {/* User Information */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-baseline space-x-2">
              <span className="font-semibold text-sm text-gray-900 dark:text-white">
                {first_name} {last_name}
              </span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 break-words">
              {content}
            </p>
          </div>

          {/* Vote and Reply Actions */}
          <div className="flex items-center space-x-4 mt-2">
            {/* Upvote */}
            <div className="flex items-center space-x-1">
              <span
                className={`text-sm ${
                  upVotes > 0 ? 'text-indigo-500' : 'text-gray-500'
                }`}
              >
                {upVotes}
              </span>
              <button
                onClick={() => handleVote('upvote')}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Upvote"
              >
                <FiArrowUp
                  className={`w-4 h-4 ${voted === 1 ? 'text-indigo-600' : ''}`}
                />
              </button>
            </div>

            {/* Downvote */}
            <div className="flex items-center space-x-1">
              <span
                className={`text-sm ${
                  downVotes > 0 ? 'text-indigo-500' : 'text-gray-500'
                }`}
              >
                {downVotes}
              </span>
              <button
                onClick={() => handleVote('downvote')}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Downvote"
              >
                <FiArrowDown
                  className={`w-4 h-4 ${voted === -1 ? 'text-indigo-600' : ''}`}
                />
              </button>
            </div>

            {/* Reply */}
            <button
              onClick={() => setReplyFormVisible(!replyFormVisible)}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Reply"
            >
              <span className="text-sm text-indigo-500">Reply</span>
            </button>
          </div>

          {/* Reply Form */}
          {replyFormVisible && (
            <div className="mt-4 w-[80%]">
              <CommentForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
