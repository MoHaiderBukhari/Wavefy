import React, { createContext, useContext, useState, useCallback } from "react";
import type { SongWithArtist } from "@shared/schema";

interface MusicPlayerState {
  currentTrack: SongWithArtist | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  shuffle: boolean;
  repeat: boolean;
}

interface MusicPlayerContextType extends MusicPlayerState {
  playTrack: (track: SongWithArtist) => void;
  playPlaylist: (playlistId: string) => void;
  playPause: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

export function MusicPlayerProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<MusicPlayerState>({
    currentTrack: {
      id: "1",
      title: "Midnight Dreams",
      artistId: "1",
      duration: 222, // 3:42
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60",
      audioUrl: null,
      artist: {
        id: "1",
        name: "Luna Rodriguez",
        image: null,
      },
    },
    isPlaying: false,
    volume: 65,
    progress: 33,
    shuffle: false,
    repeat: false,
  });

  const playTrack = useCallback((track: SongWithArtist) => {
    setState(prev => ({
      ...prev,
      currentTrack: track,
      isPlaying: true,
      progress: 0,
    }));
  }, []);

  const playPlaylist = useCallback((playlistId: string) => {
    // TODO: Fetch playlist tracks and play first one
    console.log("Playing playlist:", playlistId);
  }, []);

  const playPause = useCallback(() => {
    setState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying,
    }));
  }, []);

  const nextTrack = useCallback(() => {
    // TODO: Implement next track logic
    console.log("Next track");
  }, []);

  const previousTrack = useCallback(() => {
    // TODO: Implement previous track logic
    console.log("Previous track");
  }, []);

  const toggleShuffle = useCallback(() => {
    setState(prev => ({
      ...prev,
      shuffle: !prev.shuffle,
    }));
  }, []);

  const toggleRepeat = useCallback(() => {
    setState(prev => ({
      ...prev,
      repeat: !prev.repeat,
    }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    setState(prev => ({
      ...prev,
      volume,
    }));
  }, []);

  const setProgress = useCallback((progress: number) => {
    setState(prev => ({
      ...prev,
      progress,
    }));
  }, []);

  const value: MusicPlayerContextType = {
    ...state,
    playTrack,
    playPlaylist,
    playPause,
    nextTrack,
    previousTrack,
    toggleShuffle,
    toggleRepeat,
    setVolume,
    setProgress,
  };

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const context = useContext(MusicPlayerContext);
  if (context === undefined) {
    throw new Error("useMusicPlayer must be used within a MusicPlayerProvider");
  }
  return context;
}
