// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  users;
  artists;
  songs;
  playlists;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.artists = /* @__PURE__ */ new Map();
    this.songs = /* @__PURE__ */ new Map();
    this.playlists = /* @__PURE__ */ new Map();
    this.initializeSampleData();
  }
  initializeSampleData() {
    const artists = [
      { id: "1", name: "Luna Rodriguez", image: null },
      { id: "2", name: "Storm Riders", image: null },
      { id: "3", name: "Maya Chen", image: null },
      { id: "4", name: "DJ Syntax", image: null },
      { id: "5", name: "Echo Collective", image: null },
      { id: "6", name: "River Folk", image: null }
    ];
    artists.forEach((artist) => this.artists.set(artist.id, artist));
    const songs = [
      {
        id: "1",
        title: "Midnight Dreams",
        artistId: "1",
        duration: 222,
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&h=400",
        audioUrl: null
      },
      {
        id: "2",
        title: "Electric Thunder",
        artistId: "2",
        duration: 255,
        image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?auto=format&fit=crop&w=400&h=400",
        audioUrl: null
      },
      {
        id: "3",
        title: "Soulful Nights",
        artistId: "3",
        duration: 208,
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&h=400",
        audioUrl: null
      },
      {
        id: "4",
        title: "Neon Pulse",
        artistId: "4",
        duration: 302,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&h=400",
        audioUrl: null
      },
      {
        id: "5",
        title: "Symphonic Dreams",
        artistId: "5",
        duration: 378,
        image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=400&h=400",
        audioUrl: null
      },
      {
        id: "6",
        title: "Woodland Tales",
        artistId: "6",
        duration: 273,
        image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&w=400&h=400",
        audioUrl: null
      }
    ];
    songs.forEach((song) => this.songs.set(song.id, song));
    const playlists = [
      {
        id: "1",
        name: "Electronic Vibes",
        description: "Best electronic beats",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&h=400",
        userId: null
      },
      {
        id: "2",
        name: "Hip Hop Hits",
        description: "Top rap and hip hop tracks",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&h=400",
        userId: null
      },
      {
        id: "3",
        name: "Indie Rock",
        description: "Alternative and indie favorites",
        image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=400&h=400",
        userId: null
      },
      {
        id: "4",
        name: "Jazz Classics",
        description: "Timeless jazz standards",
        image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&w=400&h=400",
        userId: null
      }
    ];
    playlists.forEach((playlist) => this.playlists.set(playlist.id, playlist));
  }
  // Users
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Artists
  async getArtist(id) {
    return this.artists.get(id);
  }
  async createArtist(insertArtist) {
    const id = randomUUID();
    const artist = { ...insertArtist, id };
    this.artists.set(id, artist);
    return artist;
  }
  async getAllArtists() {
    return Array.from(this.artists.values());
  }
  // Songs
  async getSong(id) {
    return this.songs.get(id);
  }
  async getSongWithArtist(id) {
    const song = this.songs.get(id);
    if (!song) return void 0;
    const artist = song.artistId ? this.artists.get(song.artistId) : void 0;
    return { ...song, artist: artist || { id: "", name: "Unknown Artist", image: null } };
  }
  async createSong(insertSong) {
    const id = randomUUID();
    const song = { ...insertSong, id };
    this.songs.set(id, song);
    return song;
  }
  async getAllSongs() {
    const songs = Array.from(this.songs.values());
    return Promise.all(
      songs.map(async (song) => {
        const artist = song.artistId ? this.artists.get(song.artistId) : void 0;
        return { ...song, artist: artist || { id: "", name: "Unknown Artist", image: null } };
      })
    );
  }
  async getRecentSongs(limit = 10) {
    const allSongs = await this.getAllSongs();
    return allSongs.slice(0, limit);
  }
  // Playlists
  async getPlaylist(id) {
    return this.playlists.get(id);
  }
  async createPlaylist(insertPlaylist) {
    const id = randomUUID();
    const playlist = { ...insertPlaylist, id };
    this.playlists.set(id, playlist);
    return playlist;
  }
  async getAllPlaylists() {
    return Array.from(this.playlists.values());
  }
};
var storage = new MemStorage();

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/playlists", async (req, res) => {
    try {
      const playlists = await storage.getAllPlaylists();
      res.json(playlists);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch playlists" });
    }
  });
  app2.get("/api/playlists/:id", async (req, res) => {
    try {
      const playlist = await storage.getPlaylist(req.params.id);
      if (!playlist) {
        return res.status(404).json({ message: "Playlist not found" });
      }
      res.json(playlist);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch playlist" });
    }
  });
  app2.get("/api/songs", async (req, res) => {
    try {
      const songs = await storage.getAllSongs();
      res.json(songs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch songs" });
    }
  });
  app2.get("/api/songs/recent", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 10;
      const songs = await storage.getRecentSongs(limit);
      res.json(songs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recent songs" });
    }
  });
  app2.get("/api/songs/:id", async (req, res) => {
    try {
      const song = await storage.getSongWithArtist(req.params.id);
      if (!song) {
        return res.status(404).json({ message: "Song not found" });
      }
      res.json(song);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch song" });
    }
  });
  app2.get("/api/artists", async (req, res) => {
    try {
      const artists = await storage.getAllArtists();
      res.json(artists);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch artists" });
    }
  });
  app2.get("/api/artists/:id", async (req, res) => {
    try {
      const artist = await storage.getArtist(req.params.id);
      if (!artist) {
        return res.status(404).json({ message: "Artist not found" });
      }
      res.json(artist);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch artist" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  base: "Wavefy",
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` localhost ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  const PORT = Number(process.env.PORT) || 5e3;
  const HOST = "localhost";
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  app.listen(PORT, HOST, () => console.log(`Server on http://${HOST}:${PORT}`));
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "localhost",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
