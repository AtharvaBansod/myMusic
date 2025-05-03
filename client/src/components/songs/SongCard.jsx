// import { usePlayer } from '../../context/PlayerContext';
// import AddToPlaylist from '../playlists/AddToPlaylist';
// import { deleteSongFromPlaylist } from '../../api/playlists';

// const SongCard = ({ song, onPlay , playListId, setPlaylist}) => {
//   const { currentSong, isPlaying } = usePlayer();
//   const isCurrentSong = currentSong?._id === song._id;

//   return (
//     <div className={`song-card ${isCurrentSong ? 'active' : ''}`}>
//       <div className="song-image" onClick={() => onPlay(song)}>
//         <img src={song.imageUrl || '/default-song.png'} alt={song.title} />
//         {isCurrentSong && isPlaying && (
//           <div className="playing-indicator">▶️</div>
//         )}
//       </div>
//       <div className="song-info">
//         <h3>{song.title}</h3>
//         <p>{song.artist}</p>
//         <span>{formatDuration(song.duration)}</span>
//         <AddToPlaylist songId={song._id} onClose={()=>console.log('closed')
//         }/>
//         <button onClick={async()=>{
//             try {
//                 const updatedPlaylist = await deleteSongFromPlaylist(playListId, song._id);
          
//                 // Update only the modified playlist in the list of all playlists
//                 setPlaylist(prev => ({
//                     ...prev,
//                     songs: updatedPlaylist.songs
//                   }));
//               } catch (error) {
//                 console.error('Failed to delete song:', error);
//               }
//         }}>Del</button>
//       </div>
//     </div>
//   );
// };

// const formatDuration = (seconds) => {
//   const mins = Math.floor(seconds / 60);
//   const secs = Math.floor(seconds % 60);
//   return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
// };

// export default SongCard;


import { useState } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import AddToPlaylist from '../playlists/AddToPlaylist';
import { deleteSongFromPlaylist } from '../../api/playlists';
import Modal from '../ui/Modal';

const SongCard = ({ song, onPlay, playListId, setPlaylist }) => {
  const { currentSong, isPlaying } = usePlayer();
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);
  const isCurrentSong = currentSong?._id === song._id;

  const handleDelete = async () => {
    try {
      const updatedPlaylist = await deleteSongFromPlaylist(playListId, song._id);
      setPlaylist(prev => ({
        ...prev,
        songs: updatedPlaylist.songs
      }));
    } catch (error) {
      console.error('Failed to delete song:', error);
    }
  };

  return (
    <>
      <div className={`song-card ${isCurrentSong ? 'active' : ''}`}>
        <div className="song-image" onClick={() => onPlay(song)}>
          <img src={song.imageUrl || '/default-song.png'} alt={song.title} />
          {isCurrentSong && isPlaying && (
            <div className="playing-indicator">▶️</div>
          )}
        </div>
        <div className="song-info">
          <h3>{song.title}</h3>
          <p>{song.artist}</p>
          <span>{formatDuration(song.duration)}</span>
          
          <div className="song-actions">
            <button 
              className="btn btn-sm btn-primary"
              onClick={(e) => {
                e.stopPropagation();
                setShowAddToPlaylist(true);
              }}
            >
              Add
            </button>
            
            {playListId && (
              <button 
                className="btn btn-sm btn-danger"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      {showAddToPlaylist && (
        <Modal onClose={() => setShowAddToPlaylist(false)}>
          <AddToPlaylist 
            songId={song._id} 
            onClose={() => setShowAddToPlaylist(false)}
          />
        </Modal>
      )}
    </>
  );
};

const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export default SongCard;