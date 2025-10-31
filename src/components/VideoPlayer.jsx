import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, XCircle, RotateCcw, RotateCw } from 'lucide-react';

const VideoPlayer = ({ url, animeData, episodeData }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const progressRef = useRef(null);
    const controlsTimeoutRef = useRef(null);

    // Load progress sebelumnya
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const history = JSON.parse(localStorage.getItem("animeHistory")) || [];
        const existing = history.find(
            (item) => item.title === episodeData?.title
        );

        if (existing?.progress) {
            video.currentTime = existing.progress;
        }
    }, [animeData, episodeData]);

    // sync state fullscreen dengan event browser
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
        document.addEventListener("mozfullscreenchange", handleFullscreenChange);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
            document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
        };
    }, []);

    // Update progress & simpan ke localStorage
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateTime = () => {
            if (!isDragging && animeData && episodeData) {
                setCurrentTime(video.currentTime);

                const history = JSON.parse(localStorage.getItem("animeHistory")) || [];

                const newEntry = {
                    url: window.location.href,
                    image: animeData.image,
                    title: episodeData.title,
                    progress: video.currentTime,
                    duration: video.duration,
                };

                const filtered = history.filter(
                    (item) => item.title !== newEntry.title
                );

                filtered.unshift(newEntry);
                if (filtered.length > 4) filtered.pop();

                localStorage.setItem("animeHistory", JSON.stringify(filtered));
            }
        };

        const updateDuration = () => setDuration(video.duration);

        video.addEventListener("timeupdate", updateTime);
        video.addEventListener("loadedmetadata", updateDuration);

        return () => {
            video.removeEventListener("timeupdate", updateTime);
            video.removeEventListener("loadedmetadata", updateDuration);
        };
    }, [isDragging, animeData, episodeData]);

    const togglePlay = () => {
        const video = videoRef.current;
        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    const handleSkip = (seconds) => {
        const video = videoRef.current;
        video.currentTime = Math.max(0, Math.min(video.currentTime + seconds, duration));
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        videoRef.current.volume = newVolume;
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    };

    const toggleMute = () => {
        const video = videoRef.current;
        if (isMuted) {
            video.volume = volume || 0.5;
            setIsMuted(false);
        } else {
            video.volume = 0;
            setIsMuted(true);
        }
    };

    const updateProgress = (e) => {
        const rect = progressRef.current.getBoundingClientRect();
        const pos = Math.max(0, Math.min((e.clientX - rect.left) / rect.width, 1));
        const newTime = pos * duration;
        setCurrentTime(newTime);
        return newTime;
    };

    const handleProgressMouseDown = (e) => {
        setIsDragging(true);
        const newTime = updateProgress(e);
        videoRef.current.currentTime = newTime;
    };

    const handleProgressMouseMove = (e) => {
        if (isDragging) {
            updateProgress(e);
        }
    };

    const handleProgressMouseUp = (e) => {
        if (isDragging) {
            const newTime = updateProgress(e);
            videoRef.current.currentTime = newTime;
            setIsDragging(false);
        }
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleProgressMouseMove);
            window.addEventListener('mouseup', handleProgressMouseUp);
            return () => {
                window.removeEventListener('mousemove', handleProgressMouseMove);
                window.removeEventListener('mouseup', handleProgressMouseUp);
            };
        }
    }, [isDragging]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let hideTimeout;

        const showControlsHandler = () => {
            setShowControls(true);
            clearTimeout(hideTimeout);

            if (isPlaying) {
                hideTimeout = setTimeout(() => {
                    setShowControls(false);
                }, 3000);
            }
        };

        // Desktop
        container.addEventListener("mousemove", showControlsHandler);

        // Mobile
        const touchHandler = () => {
            showControlsHandler();
        };
        container.addEventListener("touchstart", touchHandler);
        container.addEventListener("touchmove", touchHandler);
        container.addEventListener("touchend", touchHandler);

        return () => {
            container.removeEventListener("mousemove", showControlsHandler);
            container.removeEventListener("touchstart", touchHandler);
            container.removeEventListener("touchmove", touchHandler);
            container.removeEventListener("touchend", touchHandler);
            clearTimeout(hideTimeout);
        };
    }, [isPlaying]);


    const toggleFullscreen = () => {
        const container = containerRef.current;
        if (!document.fullscreenElement) {
            container.requestFullscreen?.() ||
                container.webkitRequestFullscreen?.() ||
                container.mozRequestFullScreen?.();
        } else {
            document.exitFullscreen?.() ||
                document.webkitExitFullscreen?.() ||
                document.mozCancelFullScreen?.();
        }
    };

    const formatTime = (time) => {
        if (isNaN(time)) return '0:00';
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleMouseMove = () => {
        setShowControls(true);
        clearTimeout(controlsTimeoutRef.current);
        controlsTimeoutRef.current = setTimeout(() => {
            if (isPlaying) setShowControls(false);
        }, 3000);
    };

    if (!url) {
        return (
            <div className="w-full aspect-video bg-black rounded-lg flex flex-col items-center justify-center space-y-4">
                <div className="relative">
                    <div className="absolute inset-0 bg-[#5409DA]/20 rounded-full blur-3xl animate-pulse" /> <div className="relative bg-gradient-to-br from-gray-700 to-gray-800 p-8 rounded-full shadow-xl">
                        <XCircle className="w-20 h-20 text-[#0065F8 ]" />
                    </div>
                </div>
                <h3 className="text-lg font-semibold text-white">Video Tidak Tersedia</h3>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="relative w-full bg-black rounded-lg overflow-hidden shadow-lg group"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setShowControls(false)}
        >
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
                    <div className="w-12 h-12 border-4 border-[#5409DA] border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            <video
                ref={videoRef}
                src={url}
                className={`${isFullscreen
                    ? "w-auto h-full max-w-full max-h-full mx-auto my-auto flex justify-center items-center object-contain"
                    : "w-full h-auto aspect-video"
                    }`}
                crossOrigin="anonymous"
                onClick={togglePlay}
                onLoadedData={() => setIsLoading(false)}
                onPlaying={() => setIsLoading(false)}
                onWaiting={() => setIsLoading(true)}
            />

            {/* Controls Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
                {/* Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <button
                        onClick={togglePlay}
                        className="w-16 h-16 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-all"
                    >
                        {isPlaying ? (
                            <Pause className="w-8 h-8 text-white" />
                        ) : (
                            <Play className="w-8 h-8 text-white ml-1" />
                        )}
                    </button>
                </div>

                {/* Bottom Controls */}
                <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                    {/* Progress Bar */}
                    <div
                        ref={progressRef}
                        className="w-full h-2 bg-white/30 rounded-full cursor-pointer group/progress relative"
                        onMouseDown={handleProgressMouseDown}
                    >
                        <div
                            className="h-full bg-[#4300FF] rounded-full relative transition-all"
                            style={{ width: `${(currentTime / duration) * 100}%` }}
                        >
                            <div
                                className={`absolute right-0 top-1/2 -translate-y-1/2 mr-[-10px] w-4 h-4 bg-white rounded-full shadow-lg transition-opacity ${isDragging ? 'opacity-100 scale-125' : 'opacity-0 group-hover/progress:opacity-100'}`}
                            />
                        </div>
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-5">
                            {/* Play/Pause */}
                            <button
                                onClick={togglePlay}
                                className="text-white hover:text-[#5409DA] transition-colors"
                            >
                                {isPlaying ? (
                                    <Pause className="w-6 h-6" />
                                ) : (
                                    <Play className="w-6 h-6" />
                                )}
                            </button>

                            <div className="flex items-center">
                                {/* Skip Backward 5s */}
                                <button
                                    onClick={() => handleSkip(-10)}
                                    className="relative flex items-center justify-center w-10 h-10 text-white hover:text-[#5409DA] transition-colors"
                                    title="Mundur 5 detik"
                                >
                                    <RotateCcw className="w-8 h-8" />
                                    <span className="absolute text-[10px] font-bold">10</span>
                                </button>

                                {/* Skip Forward 5s */}
                                <button
                                    onClick={() => handleSkip(10)}
                                    className="relative flex items-center justify-center w-10 h-10 text-white hover:text-[#5409DA] transition-colors"
                                    title="Maju 5 detik"
                                >
                                    <RotateCw className="w-8 h-8" />
                                    <span className="absolute text-[10px] font-bold">10</span>
                                </button>
                            </div>


                            {/* Volume Control */}
                            <div className="flex items-center gap-2 group/volume">
                                <button
                                    onClick={toggleMute}
                                    className="text-white hover:text-[#5409DA] transition-colors"
                                >
                                    {isMuted || volume === 0 ? (
                                        <VolumeX className="w-6 h-6" />
                                    ) : (
                                        <Volume2 className="w-6 h-6" />
                                    )}
                                </button>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={isMuted ? 0 : volume}
                                    onChange={handleVolumeChange}
                                    style={{
                                        background: `linear-gradient(to right, white ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.3) ${(isMuted ? 0 : volume) * 100}%)`
                                    }}
                                    className="w-0 opacity-0 group-hover/volume:w-20 group-hover/volume:opacity-100 
                                                transition-all duration-300 h-1 rounded-full appearance-none cursor-pointer
                                                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 
                                                [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                                />
                            </div>

                            {/* Time Display */}
                            <span className="text-white text-sm font-medium">
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                        </div>

                        {/* Fullscreen Button */}
                        <button
                            onClick={toggleFullscreen}
                            className="text-white hover:text-[#4E71FF] transition-colors"
                            title="Layar penuh"
                        >
                            <Maximize className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;