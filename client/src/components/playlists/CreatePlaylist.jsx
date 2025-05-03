// import { useState } from 'react';
// import { createPlaylist } from '../../api/playlists';

// const CreatePlaylist = ({setPlaylists, onCreated }) => {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [isPublic, setIsPublic] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
    
//     try {
//       let data = await createPlaylist({ name, description, isPublic });
//       console.log(data);
//       setPlaylists((prev) => [...prev, data]);
//       onCreated();
//       setName('');
//       setDescription('');
//       setIsPublic(false);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to create playlist');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="create-playlist">
//       <h3>Create New Playlist</h3>
//       {error && <div className="error">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>
//             <input
//               type="checkbox"
//               checked={isPublic}
//               onChange={(e) => setIsPublic(e.target.checked)}
//             />
//             Public
//           </label>
//         </div>
//         <button type="submit" disabled={loading}>
//           {loading ? 'Creating...' : 'Create Playlist'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreatePlaylist;


import { useState } from 'react';
import { createPlaylist } from '../../api/playlists';

const CreatePlaylist = ({ setPlaylists, onCreated, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const newPlaylist = await createPlaylist({ name, description, isPublic });
      setPlaylists(prev => [...prev, newPlaylist]);
      onCreated(newPlaylist);
      setName('');
      setDescription('');
      setIsPublic(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create playlist');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-playlist">
      <div className="modal-header">
        <h3>Create New Playlist</h3>
        {/* <button className="close-button" onClick={onClose}>&times;</button> */}
      </div>

      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Description (Optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        <div className="checkbox-group">
          <input
            type="checkbox"
            id="isPublic"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          <label htmlFor="isPublic">Make playlist public</label>
        </div>
        
        <div className="modal-actions">
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading || !name.trim()}
          >
            {loading ? 'Creating...' : 'Create Playlist'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePlaylist;