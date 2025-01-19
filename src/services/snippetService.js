export const fetchSnippets = async (page) => {
  const url = `http://127.0.0.1:8000/api/snippets/`;
  const token = localStorage.getItem('token');

  let header = {
    'Content-Type': 'application/json',
  }
  if(token){
    header['Authorization'] = `JWT ${token}`
  }

  try {
    const response = await fetch(`${url}?page=${page}`, { method: 'GET', header });

    if (!response.ok) {
      throw new Error(`Failed to fetch snippets: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      snippets: data.results || [],
      hasMore: !!data.next,
    };
  } catch (error) {
    console.error('Error fetching snippets:', error);
    return { snippets: [], hasMore: false };
  }
};

export const fetchSnippet = async (snippetId) => {
  const url = `http://127.0.0.1:8000/api/snippets/${snippetId}/`;
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
  };
  if(token){
    headers['Authorization'] = `JWT ${token}`
  }

  try {
    const response = await fetch(url, { method: 'GET', headers });

    if (!response.ok) {
      throw new Error(`Failed to fetch snippet: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching snippet:', error);
    return null;
  }
};
