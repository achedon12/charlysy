import {createContext, useContext, useEffect, useRef, useState} from "react";

export const MusicContext = createContext();

export const useMusic = () => {
    const context = useContext(MusicContext);
    if (!context) {
        throw new Error('useMusic must be used within a MusicProvider');
    }
    return context;
};

const MusicProvider = ({children}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [muted, setMuted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);
    const seekingRef = useRef(false);

    useEffect(() => {
        const savedMuted = localStorage.getItem('muted');
        const savedVolume = localStorage.getItem('volume');

        if (savedMuted) {
            setMuted(JSON.parse(savedMuted));
        }
        if (savedVolume) {
            setVolume(parseFloat(savedVolume));
        }
        setLoading(false);

        const audio = audioRef.current;

        const handleTimeUpdate = () => {
            if (!seekingRef.current) {
                setCurrentTime(audio.currentTime);
            }
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTrack(null);
        };

        const handleError = () => {
            console.error("Erreur de chargement audio");
            setIsPlaying(false);
            setCurrentTrack(null);
        };

        if (audio) {
            audio.addEventListener('timeupdate', handleTimeUpdate);
            audio.addEventListener('loadedmetadata', handleLoadedMetadata);
            audio.addEventListener('ended', handleEnded);
            audio.addEventListener('error', handleError);
        }

        return () => {
            if (audio) {
                audio.removeEventListener('timeupdate', handleTimeUpdate);
                audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
                audio.removeEventListener('ended', handleEnded);
                audio.removeEventListener('error', handleError);
            }
        };
    }, []);

    useEffect(() => {
        if (!loading) {
            localStorage.setItem('muted', JSON.stringify(muted));
            localStorage.setItem('volume', volume.toString());
        }
    }, [muted, volume, loading]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = muted ? 0 : volume;
        }
    }, [volume, muted]);

    const musicTracks = [
        {
            id: 1,
            title: "Sun side of the Moon",
            duration: "2:46",
            plays: "27.4k",
            previewUrl: `${import.meta.env.VITE_REACT_APP_BASE_URL}musics/previews/Sun side of the Moon.mp3`,
            artist: "Charly Sy",
            image: `${import.meta.env.VITE_REACT_APP_BASE_URL}musics/covers/Sun side of the Moon.jpg`
        }
    ];

    const playRandomTrack = () => {
        const randomIndex = Math.floor(Math.random() * musicTracks.length);
        const track = musicTracks[randomIndex];
        playTrack(track);
    };

    const playTrack = (track) => {
        setCurrentTrack(track);
        setIsPlaying(true);

        if (audioRef.current) {
            audioRef.current.src = track.previewUrl;
            audioRef.current.volume = muted ? 0 : volume;
            audioRef.current.play().catch(error => {
                console.error("Erreur de lecture audio:", error);
                setIsPlaying(false);
            });
        }
    };

    const pauseMusic = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
        setIsPlaying(false);
    };

    const resumeMusic = () => {
        if (audioRef.current && currentTrack) {
            audioRef.current.play().catch(error => {
                console.error("Erreur de reprise audio:", error);
            });
            setIsPlaying(true);
        }
    };

    const stopMusic = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setIsPlaying(false);
        setCurrentTrack(null);
    };

    const togglePlayPause = () => {
        if (isPlaying) {
            pauseMusic();
        } else if (currentTrack) {
            resumeMusic();
        } else {
            playRandomTrack();
        }
    };

    const toggleMute = () => {
        setMuted(!muted);
    };

    const setVolumeLevel = (level) => {
        setVolume(level);
        if (level > 0) {
            setMuted(false);
        }
    };

    const nextTrack = () => {
        if (currentTrack) {
            const currentIndex = musicTracks.findIndex(track => track.id === currentTrack.id);
            const nextIndex = (currentIndex + 1) % musicTracks.length;
            playTrack(musicTracks[nextIndex]);
        } else {
            playRandomTrack();
        }
    };

    const previousTrack = () => {
        if (currentTrack) {
            const currentIndex = musicTracks.findIndex(track => track.id === currentTrack.id);
            const prevIndex = (currentIndex - 1 + musicTracks.length) % musicTracks.length;
            playTrack(musicTracks[prevIndex]);
        }
    };

    const startSeeking = () => {
        seekingRef.current = true;
    }

    const endSeeking = (seekTime) => {
        if (audioRef.current) {
            audioRef.current.currentTime = seekTime;
        }
        setCurrentTime(seekTime);
        seekingRef.current = false;
    }

    const value = {
        isPlaying,
        currentTrack,
        muted,
        volume,
        currentTime,
        duration,
        loading,
        musicTracks,
        playTrack,
        pauseMusic,
        resumeMusic,
        stopMusic,
        togglePlayPause,
        toggleMute,
        setVolume: setVolumeLevel,
        nextTrack,
        previousTrack,
        playRandomTrack,
        startSeeking,
        endSeeking
    };

    return (
        <MusicContext.Provider value={value}>
            {children}
            <audio ref={audioRef} preload="auto"/>
        </MusicContext.Provider>
    );
};

export default MusicProvider;