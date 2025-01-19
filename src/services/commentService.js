import { get_base_url } from "../utility"

export const fetchComments = async (snippetId) => {
    const baseUrl = get_base_url()
    const url = `${baseUrl}api/snippets/${snippetId}/comments/?root-comment=true`
    const token = localStorage.getItem('token')
    
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
}