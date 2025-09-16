import {useMusic} from '@/providers/MusicProvider';
import {formatTime} from "@/utils/Date.js";
import {useState} from "react";
import {FaMusic} from "react-icons/fa";

const PlayerBar = () => {
    const {
        isPlaying,
        currentTrack,
        muted,
        volume,
        currentTime,
        duration,
        togglePlayPause,
        toggleMute,
        setVolume,
        nextTrack,
        previousTrack,
        startSeeking,
        endSeeking
    } = useMusic();
    const [isExpanded, setIsExpanded] = useState(false);

    if (!currentTrack) return null;

    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

    const handleSeek = (e) => {
        const seekTime = (e.nativeEvent.offsetX / e.currentTarget.offsetWidth) * duration;
        endSeeking(seekTime);
    };

    const handleSeekStart = () => {
        startSeeking();
    };

    if (!isExpanded) {
        return (
            <div className="fixed bottom-4 right-4 z-50">
                <button
                    onClick={() => setIsExpanded(true)}
                    className="bg-purple-700 hover:bg-purple-600 text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    title="Open Music Player"
                >
                    <FaMusic className="w-6 h-6"/>
                </button>
            </div>
        );
    }

    return (
        <div
            className="fixed bottom-0 left-0 right-0 bg-gray-900 bg-opacity-90 border-t border-purple-700 p-3 z-50 backdrop-blur-md">
            <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-2 right-4 text-gray-400 hover:text-white focus:outline-none"
                title="Close Music Player"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>

            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-700">
                <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all"
                    style={{width: `${progressPercentage}%`}}
                />
            </div>

            <div className="container mx-auto flex items-center justify-between mt-2">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-lg flex-shrink-0">
                        <img
                            src={currentTrack.image}
                            alt={currentTrack.title}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="font-semibold text-sm truncate">{currentTrack.title}</div>
                        <div className="text-xs text-gray-400 truncate">{currentTrack.artist}</div>
                    </div>
                </div>

                <div className="flex flex-col items-center space-y-2 mx-4 flex-1 max-w-md">
                    <div className="flex items-center space-x-4">
                        <button onClick={previousTrack} className="text-gray-400 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/>
                            </svg>
                        </button>

                        <button
                            onClick={togglePlayPause}
                            className="bg-cyan-500 hover:bg-cyan-400 rounded-full p-2 transition-colors"
                        >
                            {isPlaying ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                                </svg>
                            )}
                        </button>

                        <button onClick={nextTrack} className="text-gray-400 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </div>

                    <div className="flex items-center space-x-2 w-full">
            <span className="text-xs text-gray-400 w-10 text-right">
              {formatTime(currentTime)}
            </span>

                        <div
                            className="flex-1 h-2 bg-gray-700 rounded-full cursor-pointer relative"
                            onClick={handleSeek}
                            onMouseDown={handleSeekStart}
                            onTouchStart={handleSeekStart}
                        >
                            <div
                                className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all"
                                style={{width: `${progressPercentage}%`}}
                            />
                            <div
                                className="absolute top-1/2 w-3 h-3 bg-white rounded-full -mt-1.5 -ml-1.5 cursor-pointer"
                                style={{left: `${progressPercentage}%`}}
                            />
                        </div>

                        <span className="text-xs text-gray-400 w-10">
                          {formatTime(duration)}
                        </span>
                    </div>
                </div>

                <div className="flex items-center space-x-2 w-32">
                    <button onClick={toggleMute} className="text-gray-400 hover:text-white transition-colors">
                        {muted || volume === 0 ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/>
                            </svg>
                        ) : volume > 0.5 ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
                            </svg>
                        )}
                    </button>

                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                </div>
            </div>
        </div>
    );
};

export default PlayerBar;