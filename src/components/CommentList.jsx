import { useState } from 'react';
import { FiArrowUp, FiArrowDown, FiMessageSquare } from 'react-icons/fi';
import CommentForm from './CommentForm';

function CommentList({ comments: initialComments }) {
  const [comments, setComments] = useState(initialComments.map(comment => ({
    ...comment,
    votes: 0,
    userVote: 0,
    replies: comment.replies?.map(reply => ({
      ...reply,
      votes: 0,
      userVote: 0
    })) || [],
    showReplies: false
  })));

  const handleVote = (commentId, replyId = null, voteType) => {
    setComments(prevComments => 
      prevComments.map(comment => {
        if (replyId) {
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: comment.replies.map(reply => {
                if (reply.id === replyId) {
                  const newVote = reply.userVote === voteType ? 0 : voteType;
                  const voteDiff = newVote - reply.userVote;
                  return {
                    ...reply,
                    votes: reply.votes + voteDiff,
                    userVote: newVote
                  };
                }
                return reply;
              })
            };
          }
        } else if (comment.id === commentId) {
          const newVote = comment.userVote === voteType ? 0 : voteType;
          const voteDiff = newVote - comment.userVote;
          return {
            ...comment,
            votes: comment.votes + voteDiff,
            userVote: newVote
          };
        }
        return comment;
      })
    );
  };

  const toggleReplies = (commentId) => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === commentId
          ? { ...comment, showReplies: !comment.showReplies }
          : comment
      )
    );
  };

  const handleReply = (commentId, content) => {
    const newReply = {
      id: Date.now(),
      content,
      author: {
        name: 'Current User',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Current'
      },
      timestamp: 'Just now',
      votes: 0,
      userVote: 0
    };

    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === commentId
          ? { 
              ...comment, 
              replies: [...(comment.replies || []), newReply],
              showReplies: true
            }
          : comment
      )
    );
  };

  const Comment = ({ comment, onReply, parentId = null }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const hasReplies = comment.replies && comment.replies.length > 0;

    return (
      <div className="group">
        <div className="flex space-x-3">
          <img
            src={comment.author.avatar}
            alt={comment.author.name}
            className="w-8 h-8 rounded-full flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-baseline space-x-2">
              <span className="font-semibold text-sm text-gray-900 dark:text-white">
                {comment.author.name}
              </span>
              <p className="text-sm text-gray-700 dark:text-gray-300 break-words">
                {comment.content}
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
              <span>{comment.timestamp}</span>
              {comment.votes !== 0 && (
                <span>{comment.votes} votes</span>
              )}
              <button
                className="font-semibold hover:text-gray-700 dark:hover:text-gray-300"
                onClick={() => setShowReplyForm(!showReplyForm)}
              >
                Reply
              </button>
              {hasReplies && (
                <button
                  className="font-semibold hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => toggleReplies(comment.id)}
                >
                  {comment.showReplies ? 'Hide replies' : `View ${comment.replies.length} replies`}
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2 mt-1">
              <button
                onClick={() => handleVote(parentId || comment.id, parentId ? comment.id : null, 1)}
                className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  comment.userVote === 1 ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'
                }`}
              >
                <FiArrowUp className="h-3 w-3" />
              </button>
              <button
                onClick={() => handleVote(parentId || comment.id, parentId ? comment.id : null, -1)}
                className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  comment.userVote === -1 ? 'text-red-600 dark:text-red-400' : 'text-gray-400'
                }`}
              >
                <FiArrowDown className="h-3 w-3" />
              </button>
            </div>

            {showReplyForm && (
              <div className="mt-2">
                <CommentForm
                  onSubmit={(content) => {
                    onReply(parentId || comment.id, content);
                    setShowReplyForm(false);
                  }}
                  onCancel={() => setShowReplyForm(false)}
                  placeholder={`Reply to ${comment.author.name}...`}
                />
              </div>
            )}

            {hasReplies && comment.showReplies && (
              <div className="mt-2 space-y-3 border-l-2 border-gray-100 dark:border-gray-700 pl-4">
                {comment.replies.map(reply => (
                  <Comment
                    key={reply.id}
                    comment={reply}
                    onReply={onReply}
                    parentId={comment.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div className="space-y-4">
        {comments.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            onReply={handleReply}
          />
        ))}
      </div>
    </div>
  );
}

export default CommentList;