const Playlist = require('../models/playlist');
const User = require('../models/user');

exports.createPlaylist = async (req, res) => {
    try {
        const { name, description, isPublic } = req.body;
        const playlist = new Playlist({
            name,
            description,
            createdBy: req.userId,
            isPublic
        });

        await playlist.save();

        // Add playlist to user's playlists
        await User.findByIdAndUpdate(req.userId, {
            $push: { playlists: playlist._id }
        });

        res.status(201).json(playlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addSongToPlaylist = async (req, res) => {
    try {
        const { playlistId, songId } = req.params;

        const playlist = await Playlist.findOneAndUpdate(
            { _id: playlistId, createdBy: req.userId },
            { $addToSet: { songs: songId } },
            { new: true }
        );

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found or not owned by user' });
        }

        res.json(playlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.removeSongFromPlaylist = async (req, res) => {
    try {
      const { playlistId, songId } = req.params;
  
      const playlist = await Playlist.findOneAndUpdate(
        { _id: playlistId, createdBy: req.userId },
        { $pull: { songs: songId } },
        { new: true }
      );
  
      if (!playlist) {
        return res.status(404).json({ message: 'Playlist not found or not owned by user' });
      }
  
      res.json(playlist);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

exports.getUserPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find({ createdBy: req.userId })
            .populate('songs');

        res.json(playlists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPlaylistById = async (req, res) => {
    try {
        const { id } = req.params;

        const playlist = await Playlist.findById(id).populate('songs');

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        // If not public and not owned by user, deny access
        if (!playlist.isPublic && playlist.createdBy.toString() !== req.userId) {
            return res.status(403).json({ message: 'Access denied' });
        }

        res.json(playlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.deletePlaylist = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedPlaylist = await Playlist.findOneAndDelete({
        _id: id,
        createdBy: req.userId,
      });
  
      if (!deletedPlaylist) {
        return res.status(404).json({ message: 'Playlist not found or not owned by user' });
      }
  
      // Optionally, remove playlist from user's playlists array
      await User.findByIdAndUpdate(req.userId, {
        $pull: { playlists: id }
      });
  
      res.json({ message: 'Playlist deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  