import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMusicPlayer } from "@/hooks/use-music-player";
import type { SongWithArtist } from "@shared/schema";

interface TrackCardProps {
  track: SongWithArtist;
}

export default function TrackCard({ track }: TrackCardProps) {
  const { playTrack } = useMusicPlayer();

  const handlePlay = () => {
    playTrack(track);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      className="card glassmorphism p-4 rounded-xl hover-scale cursor-pointer group relative"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
      data-testid={`card-track-${track.id}`}
    >
      <div className="flex items-center space-x-4">
        <img 
          src={track.image || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"} 
          alt={`${track.title} track cover`} 
          className="w-16 h-16 object-cover rounded-lg"
          data-testid={`img-track-cover-${track.id}`}
        />
        <div className="flex-1">
          <h4 className="text-white font-semibold" data-testid={`text-track-title-${track.id}`}>
            {track.title}
          </h4>
          <p className="text-muted-foreground text-sm" data-testid={`text-track-artist-${track.id}`}>
            {track.artist?.name}
          </p>
          <p className="text-xs text-muted-foreground" data-testid={`text-track-duration-${track.id}`}>
            {formatTime(track.duration)}
          </p>
        </div>
        <motion.div 
          className="play-button"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Button 
            className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            onClick={handlePlay}
            data-testid={`button-play-track-${track.id}`}
          >
            <Play className="w-4 h-4 text-white ml-0.5" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
