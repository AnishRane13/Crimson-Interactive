const API_BASE_URL = 'https://easydash.enago.com/acceptedpapers';

export const fetchPapers = async () => {
    try {
     const response = await fetch(API_BASE_URL,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
     });
     if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
     }
     const data = await response.json();
     return {data, error: null};
    } catch (error) {
        console.error('Error fetching papers:', error);
        return { 
          data: null, 
          error: error.message || 'Failed to fetch research papers' 
        };
    }
}