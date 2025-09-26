import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, Star } from 'lucide-react';

const AnimeCard = ({ anime, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link to={`/anime/${anime.animeCode}/${anime.animeId}`}>
            <div
                className="group relative cursor-pointer transition-all duration-300 hover:scale-105"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ animationDelay: `${index * 100}ms` }}
            >
                <div className="relative overflow-hidden rounded-lg bg-gray-900 shadow-lg">
                    <div className="relative aspect-[3/4] overflow-hidden">
                        <img
                            src={anime.image}
                            alt={anime.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        <div className="absolute top-3 right-3 bg-[#4300FF] text-white px-2 py-1 rounded text-xs font-semibold">
                            {anime.episode}
                        </div>

                        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded flex items-center space-x-1 text-xs">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            {anime.score && anime.score.trim() !== "" ? anime.score : anime.ratings}
                        </div>

                        <div className="absolute bottom-3 left-3 bg-white/90 text-black px-2 py-1 rounded text-xs font-semibold">
                            {anime.type}
                        </div>

                        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                            }`}>
                            <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-4 rounded-full transition-colors">
                                <Play className="w-8 h-8" />
                            </button>
                        </div>
                    </div>

                    <div className="p-4">
                        <h3 className="text-white font-semibold text-sm md:text-base line-clamp-1 group-hover:text-[#0065F8] transition-colors">
                            {anime.title}
                        </h3>
                    </div>

                    <div className={`absolute inset-0 border-2 border-[#0065F8] rounded-lg transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                        }`}></div>
                </div>
            </div>
        </Link>
    );
};

export default AnimeCard;
