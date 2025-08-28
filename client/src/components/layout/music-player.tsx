import { motion } from "framer-motion";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Heart, 
  Mic2, 
  ListMusic, 
  MonitorSpeaker, 
  Volume2 
} from "lucide-react";
import { useMusicPlayer } from "@/hooks/use-music-player";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export default function MusicPlayer() {
  const { 
    currentTrack, 
    isPlaying, 
    volume, 
    progress, 
    playPause, 
    nextTrack, 
    previousTrack, 
    toggleShuffle, 
    toggleRepeat, 
    setVolume, 
    setProgress 
  } = useMusicPlayer();

  if (!currentTrack) {
    return null;
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 glassmorphism p-4 border-t border-border z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Current Track Info */}
        <div className="flex items-center space-x-4 flex-1">
          <motion.img 
            src={currentTrack.image || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60"} 
            alt="Currently playing track" 
            className="w-12 h-12 object-cover rounded-lg"
            data-testid="img-current-track"
            whileHover={{ scale: 1.05 }}
          />
          <div>
            <h4 className="text-white font-medium text-sm" data-testid="text-current-title">
              {currentTrack.title}
            </h4>
            <p className="text-muted-foreground text-xs" data-testid="text-current-artist">
              {currentTrack.artist?.name}
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground hover:text-white transition-colors"
            data-testid="button-favorite"
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>

        {/* Player Controls */}
        <div className="flex-1 max-w-md mx-8">
          <div className="flex items-center justify-center space-x-6 mb-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-white transition-colors"
              onClick={toggleShuffle}
              data-testid="button-shuffle"
            >
              <Shuffle className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-white transition-colors"
              onClick={previousTrack}
              data-testid="button-previous"
            >
              <SkipBack className="w-5 h-5" />
            </Button>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                onClick={playPause}
                data-testid="button-play-pause"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-black" />
                ) : (
                  <Play className="w-5 h-5 text-black ml-0.5" />
                )}
              </Button>
            </motion.div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-white transition-colors"
              onClick={nextTrack}
              data-testid="button-next"
            >
              <SkipForward className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-white transition-colors"
              onClick={toggleRepeat}
              data-testid="button-repeat"
            >
              <Repeat className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span data-testid="text-current-time">
              {formatTime(currentTrack.duration * progress / 100)}
            </span>
            <div className="flex-1 group">
              <Slider
                value={[progress]}
                onValueChange={(value) => setProgress(value[0])}
                max={100}
                step={1}
                className="w-full"
                data-testid="slider-progress"
              />
            </div>
            <span data-testid="text-total-time">
              {formatTime(currentTrack.duration)}
            </span>
          </div>
        </div>

        {/* Volume & Additional Controls */}
        <div className="flex items-center space-x-4 flex-1 justify-end">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground hover:text-white transition-colors"
            data-testid="button-lyrics"
          >
            <Mic2 className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground hover:text-white transition-colors"
            data-testid="button-queue"
          >
            <ListMusic className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground hover:text-white transition-colors"
            data-testid="button-devices"
          >
            <MonitorSpeaker className="w-4 h-4" />
          </Button>
          <div className="flex items-center space-x-2">
            <Volume2 className="w-4 h-4 text-muted-foreground" />
            <div className="w-20">
              <Slider
                value={[volume]}
                onValueChange={(value) => setVolume(value[0])}
                max={100}
                step={1}
                className="w-full"
                data-testid="slider-volume"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
