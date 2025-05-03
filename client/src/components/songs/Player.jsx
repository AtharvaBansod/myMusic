// import { usePlayer } from '../../context/PlayerContext';

// const Player = () => {
//   const {
//     currentSong,
//     isPlaying,
//     progress,
//     togglePlay,
//     handleSeek
//   } = usePlayer();

//   if (!currentSong) return null;

//   return (
//     <div className="player-bar">
//       <div className="song-info">
//         <h4>{currentSong.title}</h4>
//         <p>{currentSong.artist}</p>
//       </div>
      
//       <div className="player-controls">
//         <button onClick={togglePlay}>
//           {isPlaying ? '❚❚' : '▶'}
//         </button>
//         <input
//           type="range"
//           min="0"
//           max="100"
//           value={progress}
//           onChange={handleSeek}
//         />
//         <span>
//           {formatTime((progress / 100) * currentSong.duration)} / {formatTime(currentSong.duration)}
//         </span>
//       </div>
//     </div>
//   );
// };

// const formatTime = (seconds) => {
//   const mins = Math.floor(seconds / 60);
//   const secs = Math.floor(seconds % 60);
//   return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
// };

// export default Player;


import { usePlayer } from '../../context/PlayerContext';

const Player = () => {
  const {
    currentSong,
    isPlaying,
    progress,
    togglePlay,
    handleSeek
  } = usePlayer();

  if (!currentSong) return null;

  return (
    <div className="player-bar">
      <div className="song-info">
        {currentSong.imageUrl && (
          <img src={currentSong.imageUrl} alt={currentSong.title} />
        )}
        <div className="song-text">
          <h4>{currentSong.title}</h4>
          <p>{currentSong.artist}</p>
        </div>
      </div>
      
      <div className="player-controls">
        <button onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? '❚❚' : '▶'}
        </button>
        <div className="progress-container">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            aria-label="Song progress"
          />
          <span className="time-display">
            {formatTime((progress / 100) * currentSong.duration)} / {formatTime(currentSong.duration)}
          </span>
        </div>
      </div>
    </div>
  );
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export default Player;