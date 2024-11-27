import { useEffect, useCallback } from 'react';

export function useInfiniteScroll(callback, hasMore) {
  const handleScroll = useCallback(() => {
    if (!hasMore) return;
    
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      callback();
    }
  }, [callback, hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
}