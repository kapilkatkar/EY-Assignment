import { useState, useEffect } from 'react';
import './Home.css';
import { useNavigate } from '@tanstack/react-router';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

interface ApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

const Home = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const navigate = useNavigate();
  const [info, setInfo] = useState<ApiInfo | null>(null);
  const [page, setPage] = useState<number>(1);

  const fetchCharacters = async () => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
      const data = await response.json();
      setCharacters(data.results);
      setInfo(data.info);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, [page]);

  
  const handleCardClick = (id: number) => {
    console.log("ok", id);
     navigate({ to: `/character/${id}` });
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (info?.pages && page < info.pages) setPage(page + 1);
  };

  return (
    <div>
      <div className="character-list">
        {characters.map((char) => (
          <div key={char.id} className="character-card"  onClick={() => handleCardClick(char.id)} >
            <img src={char.image} alt={char.name} />
            <h2>{char.name}</h2>
          </div>
        ))}
      </div>
      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
        <span>Page {page}</span>
        <button onClick={handleNextPage} disabled={page === info?.pages}>Next</button>
      </div>
    </div>
  );
};

export default Home;
