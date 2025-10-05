export function filterPapers(papers, query, field = 'title') {
    if (!query || !papers) {
        return papers;
    }

    const lowerQuery = query.toLowerCase();

    return papers.filter(paper=>{
        const searchValue = getSearchValue(paper, field);
        return searchValue && searchValue.toLowerCase().includes(lowerQuery);
    });
}


const getSearchValue = (paper, field) => {
    switch (field) {
        case 'title':
          return paper.title || paper.Title || '';
        case 'authors':
          return Array.isArray(paper.authors) 
            ? paper.authors.join(', ')
            : paper.authors || paper.Authors || '';
        case 'journal':
          return paper.journal || paper.Journal || paper.journalName || '';
        case 'doi':
          return paper.doi || paper.DOI || '';
        default:
          return '';
    }
}

export function sortPapers(papers, field = 'year', order = 'desc') {
    if (!papers) return [];
    
    return [...papers].sort((a, b) => {
      const aValue = getSortValue(a, field);
      const bValue = getSortValue(b, field);
      
      if (field === 'year' || field === 'impactFactor') {
        const aNum = parseFloat(aValue) || 0;
        const bNum = parseFloat(bValue) || 0;
        return order === 'asc' ? aNum - bNum : bNum - aNum;
      }
      

      const aStr = String(aValue || '').toLowerCase();
      const bStr = String(bValue || '').toLowerCase();
      
      if (order === 'asc') {
        return aStr.localeCompare(bStr);
      } else {
        return bStr.localeCompare(aStr);
      }
    });
  }


  function getSortValue(paper, field) {
    switch (field) {
      case 'title':
        return paper.title || paper.Title || '';
      case 'year':
        return paper.year || paper.Year || paper.publicationYear || 0;
      case 'impactFactor':
        return paper.impactFactor || paper.ImpactFactor || paper.IF || 0;
      case 'authors':
        return Array.isArray(paper.authors) 
          ? paper.authors[0] || ''
          : paper.authors || paper.Authors || '';
      case 'journal':
        return paper.journal || paper.Journal || paper.journalName || '';
      default:
        return '';
    }
  }
  
  export function paginatePapers(papers, page = 1, pageSize = 12) {
    if (!papers) return { data: [], meta: { page, pageSize, total: 0, totalPages: 0 } };
    
    const total = papers.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const data = papers.slice(startIndex, endIndex);
    
    return {
      data,
      meta: {
        page,
        pageSize,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };
  }
  
  export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  

  export function normalizePaper(paper) {
    const journalInfo = paper.journal || {};
    const journalTitle = journalInfo.title || journalInfo.journalabbreviation || 'Unknown Journal';
    
    let authors = [];
    if (paper.coauthors) {
      authors = paper.coauthors.split(',').map(a => a.trim()).filter(a => a);
    } else if (paper.client) {
      const client = paper.client;
      const authorName = `${client.firstname || ''} ${client.lastname || ''}`.trim();
      if (authorName) authors = [authorName];
    }
    
    let year = new Date().getFullYear();
    if (paper.published_at) {
      year = new Date(paper.published_at).getFullYear();
    } else if (paper.created_at) {
      year = new Date(paper.created_at).getFullYear();
    }

    let impactFactor = 0;
    if (journalInfo.impactfactor) {
      impactFactor = parseFloat(journalInfo.impactfactor);
    } else if (paper.journalaltimpactfactor) {
      impactFactor = parseFloat(paper.journalaltimpactfactor);
    }
    
    const publisher = paper.publisher?.publishername || paper.publishername || 'Unknown Publisher';
    
    return {
      id: paper.id || Math.random().toString(36).substr(2, 9),
      title: String(paper.papertitle || paper.title || 'Untitled'),
      authors: authors.length > 0 ? authors : ['Unknown Author'],
      year: Number(year),
      journal: String(journalTitle),
      journalDetails: String(journalInfo.statementofscope || ''),
      doi: String(paper.doi || ''),
      impactFactor: Number(impactFactor),
      pdfUrl: String(paper.articlelink || paper.pdfUrl || ''),
      abstract: String(paper.abstract || ''),
      keywords: Array.isArray(paper.keywords) ? paper.keywords : [],
      citationCount: Number(paper.citationCount || 0),
      publishedDate: paper.published_at || paper.created_at,
      publisher: String(publisher),
      journalAbbreviation: String(journalInfo.journalabbreviation || ''),
      issn: String(journalInfo.issn || ''),
      serviceType: String(paper.servicetype?.servicename || ''),
      subjectArea: String(paper.salevelone?.name || ''),
      rawData: paper
    };
  }