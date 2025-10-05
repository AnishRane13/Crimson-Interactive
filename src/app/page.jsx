'use client';

import { useEffect, useState } from "react";

export default function Home() {

  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
      const loadPapers = async () => {
        try {
          const response = await fetch('https://easydash.enago.com/acceptedpapers');
          const data = await response.json();
          setPapers(data);
          setLoading(false);
        } catch (error) {
          console.error('Error loading papers:', error);
          setLoading(false);
        }
      };
      loadPapers();
  },[]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {papers.map((paper)=>(
            <div key={paper.id}>{paper.title}</div>
          ))}
        </div>
      )}
    </div>
  );
}