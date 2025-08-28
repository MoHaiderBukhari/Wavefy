import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Sidebar from "@/components/layout/sidebar";
import MusicPlayer from "@/components/layout/music-player";
import PlaylistCard from "@/components/ui/playlist-card";
import TrackCard from "@/components/ui/track-card";
import { Button } from "@/components/ui/button";
import type { Playlist, SongWithArtist } from "@shared/schema";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const { data: playlists = [], isLoading: playlistsLoading } = useQuery<Playlist[]>({
    queryKey: ["/api/playlists"],
  });

  const { data: recentTracks = [], isLoading: tracksLoading } = useQuery<SongWithArtist[]>({
    queryKey: ["/api/songs/recent"],
  });

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Hero Section */}
        <motion.div 
          className="gradient-bg p-8 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto">
            <motion.h1 
              className="text-6xl font-bold text-white mb-6"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Play your vibe, <span className="gradient-primary bg-clip-text text-transparent">anytime</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Discover millions of songs and create your perfect playlist
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button 
                className="glassmorphism px-8 py-4 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 pulse-glow"
                data-testid="button-start-listening"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Listening
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Content Area */}
        <div className="flex-1 p-8 overflow-y-auto bg-gradient-to-br from-slate-900 to-slate-800 pb-32">
          {/* Featured Playlists */}
          <motion.div 
            className="mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 
              className="text-3xl font-bold text-white mb-6"
              variants={itemVariants}
            >
              Featured Playlists
            </motion.h2>
            {playlistsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="glassmorphism p-4 rounded-xl animate-pulse">
                    <div className="w-full h-48 bg-muted rounded-lg mb-4"></div>
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={containerVariants}
              >
                {playlists.slice(0, 4).map((playlist) => (
                  <motion.div key={playlist.id} variants={itemVariants}>
                    <PlaylistCard playlist={playlist} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Recent Tracks */}
          <motion.div 
            className="mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 
              className="text-3xl font-bold text-white mb-6"
              variants={itemVariants}
            >
              Recent Tracks
            </motion.h2>
            {tracksLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="glassmorphism p-4 rounded-xl animate-pulse">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-muted rounded-lg"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-muted rounded mb-2"></div>
                        <div className="h-3 bg-muted rounded w-2/3 mb-1"></div>
                        <div className="h-2 bg-muted rounded w-1/3"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                variants={containerVariants}
              >
                {recentTracks.slice(0, 6).map((track) => (
                  <motion.div key={track.id} variants={itemVariants}>
                    <TrackCard track={track} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      <MusicPlayer />
    </div>
  );
}
