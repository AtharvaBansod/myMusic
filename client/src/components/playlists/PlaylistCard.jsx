// import { Link } from 'react-router-dom';
// import { deletePlaylist } from '../../api/playlists';

// const PlaylistCard = ({ playlist, setPlaylists }) => {
//     return (
//         <Link to={`/playlist/${playlist._id}`} className="playlist-card">
//             <div className="playlist-image">
//                 {playlist.songs.length > 0 && playlist.songs[0].imageUrl ? (
//                     <img src={playlist.songs[0].imageUrl} alt="Playlist cover" />
//                 ) : (
//                     <div className="default-playlist-image">🎵</div>
//                 )}
//             </div>
//             <div className="playlist-info">
//                 <h3>{playlist.name}</h3>
//                 <p>{playlist.songs.length} songs</p>
//                 <button
//                     onClick={async (e) => {
//                         e.preventDefault(); // prevent Link navigation
//                         try {
//                             await deletePlaylist(playlist._id);
//                             setPlaylists(prev => prev.filter(p => p._id !== playlist._id));
//                         } catch (err) {
//                             console.error('Failed to delete playlist:', err);
//                         }
//                     }}
//                 >
//                     del
//                 </button>

//             </div>
//         </Link>
//     );
// };

// export default PlaylistCard;


import { Link } from 'react-router-dom';
import { deletePlaylist } from '../../api/playlists';

const PlaylistCard = ({ playlist, setPlaylists }) => {
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deletePlaylist(playlist._id);
      setPlaylists(prev => prev.filter(p => p._id !== playlist._id));
    } catch (err) {
      console.error('Failed to delete playlist:', err);
    }
  };

  return (
    <Link to={`/playlist/${playlist._id}`} className="playlist-card">
      <div className="playlist-image">
        {playlist.songs.length > 0 && playlist.songs[0].imageUrl ? (
          <img src={playlist.songs[0].imageUrl} alt="Playlist cover" />
        ) : (
        //   <div className="default-playlist-image">🎵</div>
          <div className="default-playlist-image"><i className='fas fa-music' style={{'color':'white'}}></i></div>
        )}
      </div>
      <div className="playlist-info">
        <h3>{playlist.name}</h3>
        <p>{playlist.songs.length} songs</p>
        <button
          className="btn btn-sm btn-danger"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </Link>
  );
};

export default PlaylistCard;