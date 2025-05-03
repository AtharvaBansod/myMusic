import { useEffect, useState } from 'react';
import { getAllSongs } from '../api/songs';
import SongCard from '../components/songs/SongCard';
import { usePlayer } from '../context/PlayerContext';

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { playSong } = usePlayer();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await getAllSongs();
        setSongs(data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  if (loading) return <div>Loading songs...</div>;

  return (
    <div className="home">
      <h1>All Songs</h1>
      <div className="songs-grid">
        {songs.map(song => (
          <SongCard 
            key={song._id} 
            song={song} 
            onPlay={() => playSong(song)} 
          />
        ))}
      </div>
    </div>
  );
};

export default Home;