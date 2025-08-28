import { type User, type InsertUser, type Artist, type InsertArtist, type Song, type InsertSong, type Playlist, type InsertPlaylist, type SongWithArtist } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Artists
  getArtist(id: string): Promise<Artist | undefined>;
  createArtist(artist: InsertArtist): Promise<Artist>;
  getAllArtists(): Promise<Artist[]>;
  
  // Songs
  getSong(id: string): Promise<Song | undefined>;
  getSongWithArtist(id: string): Promise<SongWithArtist | undefined>;
  createSong(song: InsertSong): Promise<Song>;
  getAllSongs(): Promise<SongWithArtist[]>;
  getRecentSongs(limit?: number): Promise<SongWithArtist[]>;
  
  // Playlists
  getPlaylist(id: string): Promise<Playlist | undefined>;
  createPlaylist(playlist: InsertPlaylist): Promise<Playlist>;
  getAllPlaylists(): Promise<Playlist[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private artists: Map<string, Artist>;
  private songs: Map<string, Song>;
  private playlists: Map<string, Playlist>;

  constructor() {
    this.users = new Map();
    this.artists = new Map();
    this.songs = new Map();
    this.playlists = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample artists
    const artists = [
      { id: "1", name: "Luna Rodriguez", image: null },
      { id: "2", name: "Storm Riders", image: null },
      { id: "3", name: "Maya Chen", image: null },
      { id: "4", name: "DJ Syntax", image: null },
      { id: "5", name: "Echo Collective", image: null },
      { id: "6", name: "River Folk", image: null },
    ];

    artists.forEach(artist => this.artists.set(artist.id, artist));

    // Sample songs
    const songs = [
      {
        id: "1",
        title: "Midnight Dreams",
        artistId: "1",
        duration: 222,
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&h=400",
        audioUrl: null,
      },
      {
        id: "2",
        title: "Electric Thunder",
        artistId: "2",
        duration: 255,
        image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?auto=format&fit=crop&w=400&h=400",
        audioUrl: null,
      },
      {
        id: "3",
        title: "Soulful Nights",
        artistId: "3",
        duration: 208,
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&h=400",
        audioUrl: null,
      },
      {
        id: "4",
        title: "Neon Pulse",
        artistId: "4",
        duration: 302,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&h=400",
        audioUrl: null,
      },
      {
        id: "5",
        title: "Symphonic Dreams",
        artistId: "5",
        duration: 378,
        image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=400&h=400",
        audioUrl: null,
      },
      {
        id: "6",
        title: "Woodland Tales",
        artistId: "6",
        duration: 273,
        image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&w=400&h=400",
        audioUrl: null,
      },
    ];

    songs.forEach(song => this.songs.set(song.id, song));

    // Sample playlists
    const playlists = [
      {
        id: "1",
        name: "Electronic Vibes",
        description: "Best electronic beats",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&h=400",
        userId: null,
      },
      {
        id: "2",
        name: "Hip Hop Hits",
        description: "Top rap and hip hop tracks",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&h=400",
        userId: null,
      },
      {
        id: "3",
        name: "Indie Rock",
        description: "Alternative and indie favorites",
        image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=400&h=400",
        userId: null,
      },
      {
        id: "4",
        name: "Jazz Classics",
        description: "Timeless jazz standards",
        image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&w=400&h=400",
        userId: null,
      },
    ];

    playlists.forEach(playlist => this.playlists.set(playlist.id, playlist));
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Artists
  async getArtist(id: string): Promise<Artist | undefined> {
    return this.artists.get(id);
  }

  async createArtist(insertArtist: InsertArtist): Promise<Artist> {
    const id = randomUUID();
    const artist: Artist = { ...insertArtist, id };
    this.artists.set(id, artist);
    return artist;
  }

  async getAllArtists(): Promise<Artist[]> {
    return Array.from(this.artists.values());
  }

  // Songs
  async getSong(id: string): Promise<Song | undefined> {
    return this.songs.get(id);
  }

  async getSongWithArtist(id: string): Promise<SongWithArtist | undefined> {
    const song = this.songs.get(id);
    if (!song) return undefined;
    
    const artist = song.artistId ? this.artists.get(song.artistId) : undefined;
    return { ...song, artist: artist || { id: "", name: "Unknown Artist", image: null } };
  }

  async createSong(insertSong: InsertSong): Promise<Song> {
    const id = randomUUID();
    const song: Song = { ...insertSong, id };
    this.songs.set(id, song);
    return song;
  }

  async getAllSongs(): Promise<SongWithArtist[]> {
    const songs = Array.from(this.songs.values());
    return Promise.all(
      songs.map(async (song) => {
        const artist = song.artistId ? this.artists.get(song.artistId) : undefined;
        return { ...song, artist: artist || { id: "", name: "Unknown Artist", image: null } };
      })
    );
  }

  async getRecentSongs(limit = 10): Promise<SongWithArtist[]> {
    const allSongs = await this.getAllSongs();
    return allSongs.slice(0, limit);
  }

  // Playlists
  async getPlaylist(id: string): Promise<Playlist | undefined> {
    return this.playlists.get(id);
  }

  async createPlaylist(insertPlaylist: InsertPlaylist): Promise<Playlist> {
    const id = randomUUID();
    const playlist: Playlist = { ...insertPlaylist, id };
    this.playlists.set(id, playlist);
    return playlist;
  }

  async getAllPlaylists(): Promise<Playlist[]> {
    return Array.from(this.playlists.values());
  }
}

export const storage = new MemStorage();
