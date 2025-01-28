export function timeAgo(postedTime) {
  const givenTime = new Date(postedTime); // Convert to Date object
  const currentTime = new Date(); // Current time
  const timeDifferenceMs = currentTime - givenTime; // Difference in milliseconds

  if (timeDifferenceMs < 0) return 'Posted in the future'; // Handle future times

  // Time difference in seconds
  const seconds = Math.floor(timeDifferenceMs / 1000);

  // Built-in formatter
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (seconds < 60) return rtf.format(-seconds, 'seconds');
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return rtf.format(-minutes, 'minutes');
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return rtf.format(-hours, 'hours');
  const days = Math.floor(hours / 24);
  if (days < 7) return rtf.format(-days, 'days');
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return rtf.format(-weeks, 'weeks');
  const months = Math.floor(days / 30); // Approximation
  if (months < 12) return rtf.format(-months, 'months');
  const years = Math.floor(days / 365); // Approximation
  return rtf.format(-years, 'years');
}

export const isAuthenticated = () => {
  const token = localStorage.getItem('accessToken');
  return token? true : false; 
};

export const get_base_url = () => {
  return 'http://127.0.0.1:8000/'
}


export const get_access_token = async () => {
  const base_url = get_base_url();
  const url = `${base_url}api/accounts/auth/jwt/refresh/`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh: localStorage.getItem('authToken'),
      }),
    });

    if (response.ok) {
      const data = await response.json(); // Parse the JSON data
      if (data.access) {
        localStorage.setItem('authToken', data.access); // Store the new access token
      }
    } else {
      localStorage.removeItem('authToken'); // Remove token if refresh fails
    }
  } catch (e) {
    console.error('Something went wrong:', e); // Log the error
  }
};
