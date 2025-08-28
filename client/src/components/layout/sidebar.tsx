import { motion } from "framer-motion";
import { Home, ListMusic, Heart, Settings, Music } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Playlists", href: "/playlists", icon: ListMusic },
  { name: "Favorites", href: "/favorites", icon: Heart },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <motion.div 
      className="w-64 glassmorphism p-6 flex flex-col space-y-8"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo */}
      <motion.div 
        className="flex items-center space-x-3"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
          <Music className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold text-white">Wavefy</h1>
      </motion.div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navigation.map((item, index) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          
          return (
            <motion.div
              key={item.name}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Link href={item.href}>
                <a 
                  className={cn(
                    "sidebar-item flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300",
                    isActive 
                      ? "text-white bg-primary/20" 
                      : "text-muted-foreground hover:text-white"
                  )}
                  data-testid={`link-${item.name.toLowerCase()}`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </a>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* User Profile */}
      <motion.div 
        className="glassmorphism p-4 rounded-lg"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center space-x-3">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150" 
            alt="User profile" 
            className="w-10 h-10 rounded-full object-cover"
            data-testid="img-user-profile"
          />
          <div>
            <p className="text-sm font-medium text-white" data-testid="text-username">Alex Johnson</p>
            <p className="text-xs text-muted-foreground" data-testid="text-user-status">Premium User</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
