export const fetchSnippets = async (page) => {
  const url = 'http://127.0.0.1:8000/api/snippets/';
  const token = localStorage.getItem('token')
  let header = {
    'Content-Type': 'application/json',
  }
  if(token){
    header['Authorization'] = `JWT ${token}`
  }

  try {
    const response = await fetch(`${url}?snippet_page=${page}`, {
      method: 'GET',
      headers: header
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    const hasMore = data.next != null; // Determine if there are more pages
    return { snippets: data?.results, hasMore };
  } catch (error) {
    console.error('Error fetching snippets:', error);
    return { snippets: null, hasMore: false }; // Handle error case
  }
};

export const fetchSnippet = async (snippet_id) => {
  const url = `http://127.0.0.1:8000/api/snippets/${snippet_id}/`;
  const token = localStorage.getItem('token')
  let header = {
    'Content-Type': 'application/json',
  }
  if(token){
    header['Authorization'] = `JWT ${token}`
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: header
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const snippet = await response.json();
    return snippet
  } catch (error) {
    console.error('Error fetching snippets:', error);
    return null
  }
}