import { useState, useEffect, useCallback } from 'react';
import SnippetCard from './SnippetCard';
import SnippetSkeleton from './skeletons/SnippetSkeleton';
import LoadMoreButton from './LoadMoreButton';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { fetchSnippets } from '../services/snippetService';

function SnippetList() {
  const [snippets, setSnippets] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    if (isLoadingMore) return;
    
    setIsLoadingMore(true);
    try {
      const { snippets: newSnippets, hasMore: more } = await fetchSnippets(page + 1);
      setSnippets(prev => [...prev, ...newSnippets]);
      setHasMore(more);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Failed to load more snippets:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [page, isLoadingMore]);

  useInfiniteScroll(loadMore, hasMore && !isLoadingMore);

  useEffect(() => {
    const loadInitialSnippets = async () => {
      try {
        const { snippets: initialSnippets, hasMore: more } = await fetchSnippets(1);
        setSnippets(initialSnippets);
        setHasMore(more);
      } catch (error) {
        console.error('Failed to load initial snippets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialSnippets();
  }, []);

  console.log(snippets)
  if (isLoading) {
    return (
      <div className="space-y-6">
        <SnippetSkeleton />
        <SnippetSkeleton />
        <SnippetSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {snippets.map(snippet => (
        <SnippetCard key={snippet.id} snippet={snippet} />
      ))}
      
      {hasMore && (
        <div className="mt-6">
          <LoadMoreButton onClick={loadMore} isLoading={isLoadingMore} />
        </div>
      )}
      
      {!hasMore && snippets.length > 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
          No more snippets to load
        </p>
      )}
    </div>
  );
}

export default SnippetList;