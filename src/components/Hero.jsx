import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Info, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = ({ animeList }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);

    useEffect(() => {
        if (!isAutoPlay || animeList.length === 0) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % animeList.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlay, animeList]);

    if (!animeList || animeList.length === 0) {
        return null;
    }

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % animeList.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + animeList.length) % animeList.length);
    };

    const currentAnime = animeList[currentSlide];

    return (
        <div className="relative h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                style={{ backgroundImage: `url(${currentAnime.image})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>

            <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <div className="mb-4">
                            <span className="bg-[#4300FF] text-white px-3 py-1 rounded text-sm font-semibold uppercase tracking-wider">
                                Ongoing
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight line-clamp-2">
                            {currentAnime.title}
                        </h1>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {currentAnime.genres.map((genre, index) => (
                                <span
                                    key={index}
                                    className="bg-white/20 text-white px-2 py-1 rounded text-xs font-medium"
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>

                        <p className="text-white/90 text-sm md:text-base lg:text-lg mb-8 leading-relaxed line-clamp-3">
                            {currentAnime.description || "No description available."}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to={`/anime/${currentAnime.animeCode}/${currentAnime.animeId}`}
                                className="flex items-center justify-center space-x-2 bg-white text-black px-6 py-3 rounded font-semibold hover:bg-white/90 transition-colors"
                            >
                                <Play className="w-5 h-5" />
                                <span>Watch Now</span>
                            </Link>
                            <Link
                                to={`/anime/${currentAnime.animeCode}/${currentAnime.animeId}`}
                                className="flex items-center justify-center space-x-2 bg-white/20 text-white px-6 py-3 rounded font-semibold hover:bg-white/30 transition-colors">
                                <Info className="w-5 h-5" />
                                <span>Details</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {animeList.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        onMouseEnter={() => setIsAutoPlay(false)}
                        onMouseLeave={() => setIsAutoPlay(true)}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        onMouseEnter={() => setIsAutoPlay(false)}
                        onMouseLeave={() => setIsAutoPlay(true)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
                        {animeList.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Hero;
