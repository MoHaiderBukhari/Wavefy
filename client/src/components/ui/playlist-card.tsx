import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMusicPlayer } from "@/hooks/use-music-player";
import type { Playlist } from "@shared/schema";

interface PlaylistCardProps {
  playlist: Playlist;
}

export default function PlaylistCard({ playlist }: PlaylistCardProps) {
  const { playPlaylist } = useMusicPlayer();

  const handlePlay = () => {
    playPlaylist(playlist.id);
  };

  return (
    <motion.div 
      className="card glassmorphism p-4 rounded-xl hover-scale cursor-pointer group relative overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      data-testid={`card-playlist-${playlist.id}`}
    >
      <img 
        src={playlist.image || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"} 
        alt={`${playlist.name} playlist cover`} 
        className="w-full h-48 object-cover rounded-lg mb-4"
        data-testid={`img-playlist-cover-${playlist.id}`}
      />
      <h3 className="text-lg font-semibold text-white mb-1" data-testid={`text-playlist-name-${playlist.id}`}>
        {playlist.name}
      </h3>
      <p className="text-sm text-muted-foreground mb-3" data-testid={`text-playlist-description-${playlist.id}`}>
        {playlist.description}
      </p>
      
      <motion.div 
        className="play-button absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Button 
          className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform"
          onClick={handlePlay}
          data-testid={`button-play-playlist-${playlist.id}`}
        >
          <Play className="w-6 h-6 text-white ml-1" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
