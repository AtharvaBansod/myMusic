// import { useState, useEffect } from 'react';
// import { getUserPlaylists, addSongToPlaylist } from '../../api/playlists';

// const AddToPlaylist = ({ songId, onClose }) => {
//   const [playlists, setPlaylists] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   useEffect(() => {
//     const fetchPlaylists = async () => {
//       try {
//         const data = await getUserPlaylists();
//         setPlaylists(data);
//       } catch (err) {
//         setError('Failed to load playlists');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPlaylists();
//   }, []);

//   const handleAddToPlaylist = async (playlistId) => {
//     setError('');
//     setSuccess('');
    
//     try {
//       await addSongToPlaylist(playlistId, songId);
//       setSuccess('Song added to playlist successfully!');
//       setTimeout(onClose, 1500);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to add song to playlist');
//     }
//   };

//   if (loading) return <div>Loading playlists...</div>;

//   return (
//     <div className="add-to-playlist">
//       <h3>Add to Playlist</h3>
//       {error && <div className="error">{error}</div>}
//       {success && <div className="success">{success}</div>}
      
//       <div className="playlist-list">
//         {playlists.length === 0 ? (
//           <p>You don't have any playlists yet.</p>
//         ) : (
//           playlists.map(playlist => (
//             <div key={playlist._id} className="playlist-item">
//               <button onClick={() => handleAddToPlaylist(playlist._id)}>
//                 {playlist.name}
//               </button>
//             </div>
//           ))
//         )}
//       </div>
      
//       <button onClick={onClose}>Cancel</button>
//     </div>
//   );
// };

// export default AddToPlaylist;


import { useState, useEffect } from 'react';
import { getUserPlaylists, addSongToPlaylist } from '../../api/playlists';
import CreatePlaylist from './CreatePlaylist';

const AddToPlaylist = ({ songId, onClose }) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await getUserPlaylists();
        setPlaylists(data);
      } catch (err) {
        setError('Failed to load playlists');
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  const handleAddToPlaylist = async (playlistId) => {
    setError('');
    setSuccess('');
    
    try {
      await addSongToPlaylist(playlistId, songId);
      setSuccess('Song added to playlist successfully!');
      setTimeout(onClose, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add song to playlist');
    }
  };

  const handlePlaylistCreated = (newPlaylist) => {
    setPlaylists(prev => [...prev, newPlaylist]);
    setShowCreateForm(false);
  };

  if (loading) return <div className="loading">Loading playlists...</div>;

  return (
    <div className="add-to-playlist">
      <div className="modal-header">
        <h3>Add to Playlist</h3>
        <button className="close-button" onClick={onClose}>&times;</button>
      </div>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      
      <div className="playlist-list">
        {playlists.length === 0 ? (
          <p className="text-center">You don't have any playlists yet.</p>
        ) : (
          playlists.map(playlist => (
            <div key={playlist._id} className="playlist-item">
              <button 
                onClick={() => handleAddToPlaylist(playlist._id)}
                disabled={playlist.songs.some(s => s._id === songId)}
              >
                {playlist.name}
                {playlist.songs.some(s => s._id === songId) && ' (Already added)'}
              </button>
            </div>
          ))
        )}
      </div>
      
      <div className="modal-actions">
        <button 
          className="btn btn-secondary"
          onClick={() => setShowCreateForm(true)}
        >
          Create New Playlist
        </button>
      </div>

      {showCreateForm && (
        <CreatePlaylist 
          setPlaylists={setPlaylists}
          onCreated={handlePlaylistCreated}
          onClose={() => setShowCreateForm(false)}
        />
      )}
    </div>
  );
};

export default AddToPlaylist;