import { FiArrowUp, FiArrowDown, FiMessageSquare } from 'react-icons/fi';
import Comment from './Comment';

function CommentList({ comments }) {
  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {comments && comments.length > 0 ? (
        <div className="space-y-4">
         {comments.map((comment) => (
            <Comment key={comment.id} comment={comment}></Comment>
         ))}

        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center">
          No comments to display.
        </p>
      )}
    </div>
  );
}

export default CommentList;
