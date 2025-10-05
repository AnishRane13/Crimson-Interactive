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

export async function fetchPaperById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching paper:', error);
      return { 
        data: null, 
        error: error.message || 'Failed to fetch paper details' 
      };
    }
  }
  

  export async function fetchPapersWithFilters({
    page = 1,
    pageSize = 12,
    search = '',
    searchField = 'title',
    sortBy = 'year',
    sortOrder = 'desc'
  } = {}) {
    try {
      const params = new URLSearchParams();
      
      params.append('pagination[page]', page);
      params.append('pagination[pageSize]', pageSize);
      
      if (search) {
        params.append(`filters[${searchField}][$containsi]`, search);
      }
      
      params.append('sort', `${sortBy}:${sortOrder}`);
      
      params.append('populate', '*');
  
      const response = await fetch(`${API_BASE_URL}?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      
      return { 
        data: result.data || result,
        meta: result.meta || { pagination: { page, pageSize, total: result.length } },
        error: null 
      };
    } catch (error) {
      console.error('Error fetching papers with filters:', error);
      return { 
        data: null, 
        meta: null,
        error: error.message || 'Failed to fetch filtered papers' 
      };
    }
  }