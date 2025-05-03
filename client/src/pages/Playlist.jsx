import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPlaylistById } from '../api/playlists';
import SongCard from '../components/songs/SongCard';
import { usePlayer } from '../context/PlayerContext';

const Playlist = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const { playSong } = usePlayer();

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const data = await getPlaylistById(id);
        setPlaylist(data);
      } catch (error) {
        console.error('Error fetching playlist:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [id]);

  

  if (loading) return <div>Loading playlist...</div>;
  if (!playlist) return <div>Playlist not found</div>;

  return (
    <div className="playlist">
      <h1>{playlist.name}</h1>
      <p>{playlist.description}</p>
      
      <h2>Songs</h2>
      <div className="songs-grid">
        {playlist.songs.map(song => (
          <SongCard 
            key={song._id} 
            song={song} 
            onPlay={() => playSong(song)} 
            playListId={id}
            setPlaylist={setPlaylist}
          />
        ))}
        
      </div>
      
    </div>
  );
};

export default Playlist;