import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utility';
import { FiArrowDown, FiArrowUp, FiMessageSquare } from 'react-icons/fi';
import CommentForm from './CommentForm';

const Comment = (comment) => {

  console.log(comment.comment)
  const [upVotes, setUpVotes] = useState(comment.comment.upvotes);
  const [downVotes, setDownVotes] = useState(comment.comment.downvotes);
  const [voted, setVoted] = useState(0);
  const [reply, setReply] = useState(false)
  const voted_color = "text-indigo-600";

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

    const {first_name, last_name,  profile_image} = comment.comment.user

    return (
        <div className="group">
        <div className="flex space-x-3">
          {/* Assuming comment has an 'avatar' field */}
          <img
            src= {profile_image}
            className="w-8 h-8 rounded-full flex-shrink-0"
          />
          <div className="w-full">

            <div className='flex-1 min-w-0'>
              <div className="flex flex-wrap items-baseline space-x-2">
                <span className="font-semibold text-sm text-gray-900 dark:text-white">
                  {first_name} {last_name}
                </span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 break-words">
                {comment.comment.content}
              </p>
            </div>
            

            <div>
              <div className="">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <span className={`text-sm ${
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
                        <FiArrowUp className={`w-4 h-4 ${voted === 1 && voted_color}`} />
                      </button>
                      
                      <span className={`text-sm ${
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
                        <FiArrowDown className={`w-4 h-4 ${voted === -1 && voted_color}`} />
                      </button>
                      <button
                        onClick={() => setReply(!reply)}
                        className={`p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700`}
                        aria-label="reply"
                      >
                        <span className='text-sm text-indigo-500'>Reply</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${!reply ? 'hidden' : ''} w-[80%]`}>
              <CommentForm className="!hidden" />
            </div>
          </div>
        </div>
      </div>
    );
};

export default Comment;