import { useEffect, useState } from 'react';
import { getUserPlaylists } from '../api/playlists';
import PlaylistCard from '../components/playlists/PlaylistCard';
import CreatePlaylist from '../components/playlists/CreatePlaylist';

const Library = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await getUserPlaylists();
        setPlaylists(data);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  if (loading) return <div>Loading your library...</div>;

  return (
    <div className="library">
      <h1>Your Library</h1>
      <div className="playlists-grid">
        {playlists.map(playlist => (
          <PlaylistCard key={playlist._id} playlist={playlist} setPlaylists={setPlaylists}  />
        ))}
        
      </div>
      <CreatePlaylist setPlaylists={setPlaylists} onCreated={()=>console.log('PlaylistCreated')
        }/>
    </div>
  );
};

export default Library;