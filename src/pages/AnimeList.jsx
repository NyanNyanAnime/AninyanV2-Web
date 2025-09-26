import { useState, useEffect, useRef } from 'react';
import { Grid3X3, List, ChevronUp, Play } from 'lucide-react';
import GetAnimeList from '../apis/GetAnimeList';
import Navbar from '../components/navbar';
import { useSearchParams, Link } from "react-router-dom";
import Footer from '../components/Footer';
import AnimeCard from '../components/AnimeCard';

const AnimeListPage = () => {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentLetter, setCurrentLetter] = useState('');
    const [showScrollTop, setShowScrollTop] = useState(false);

    const containerRef = useRef(null);
    const letterRefs = useRef({});

    const [searchParams, setSearchParams] = useSearchParams();
    const initialPage = parseInt(searchParams.get("page")) || 1;
    const [page, setPage] = useState(initialPage);
    const [orderBy, setOrderBy] = useState('ascending');

    useEffect(() => {
        const params = { page: page.toString(), order_by: orderBy };
        setSearchParams(params);
    }, [page, orderBy, setSearchParams]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });

        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await GetAnimeList(page, orderBy);
                setAnimeList(data);
            } catch (error) {
                console.error("Failed to fetch anime list:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [page, orderBy]);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);

            const scrollTop = window.scrollY + 200;
            let currentLetterFound = '';

            Object.entries(letterRefs.current).forEach(([letter, ref]) => {
                if (ref && ref.offsetTop <= scrollTop) {
                    currentLetterFound = letter;
                }
            });

            if (currentLetterFound !== currentLetter) {
                setCurrentLetter(currentLetterFound);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [currentLetter]);

    const filteredAnime = (animeList.listAnime || []).filter(anime =>
        anime.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const groupedAnime = {};
    filteredAnime.forEach(anime => {
        const firstChar = anime.title.charAt(0).toUpperCase();
        const key = /^[A-Z]$/.test(firstChar) ? firstChar : '#';

        if (!groupedAnime[key]) {
            groupedAnime[key] = [];
        }
        groupedAnime[key].push(anime);
    });

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <div className="pt-20 max-w-7xl mx-auto px-4 md:px-6 py-6 flex gap-6">
                <div className="flex-1" ref={containerRef}>
                    {loading ? (
                        <div className="space-y-8">
                            {[1, 2, 3].map(section => (
                                <div key={section} className="space-y-4">
                                    <div className="bg-gray-800 h-8 w-32 rounded animate-pulse"></div>
                                    <div className={`grid gap-3 ${orderBy === 'ascending'
                                        ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                                        : 'grid-cols-1'
                                        }`}>
                                        {Array.from({ length: 8 }).map((_, i) => (
                                            <div key={i} className="bg-gray-800 h-16 rounded animate-pulse"></div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {Object.entries(groupedAnime).sort().map(([letter, animes]) => (
                                <section
                                    key={letter}
                                    ref={el => letterRefs.current[letter] = el}
                                    className="space-y-4"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="bg-[#0065F8] w-12 h-12 rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold text-xl">{letter}</span>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-sm">{animes.length} anime</p>
                                        </div>
                                    </div>

                                    <div className={`grid gap-3 ${orderBy === 'ascending'
                                        ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                                        : 'grid-cols-1'
                                        }`}>
                                        {animes.map((anime, index) => (
                                            <div
                                                key={`${anime.animeCode}-${anime.animeId}`}
                                                onClick={() => handleAnimeClick(anime)}
                                                className="group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                                                style={{ animationDelay: `${index * 30}ms` }}
                                            >
                                                {orderBy === 'ascending' ? (
                                                    // Grid View
                                                    <AnimeCard key={anime.id} anime={anime} index={index} />
                                                ) : (
                                                    // List View
                                                    <div className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-all shadow-lg hover:shadow-2xl border border-gray-800 hover:border-[#0065F8]">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex-1">
                                                                <h3 className="text-white font-medium text-base group-hover:text-[#0065F8] transition-colors">
                                                                    {anime.title}
                                                                </h3>
                                                            </div>
                                                            <Link to={`/anime/${anime.animeCode}/${anime.animeId}`}>
                                                                <button className="opacity-0 group-hover:opacity-100 bg-[#0065F8] hover:bg-[#4300FF] text-white p-3 rounded-full transition-all transform translate-x-4 group-hover:translate-x-0">
                                                                    <Play className="w-5 h-5" />
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-center">
                <div className="flex items-center justify-center space-x-2 gap-4">
                    <button
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                        disabled={!animeList.prevPage || loading}
                        className={`flex items-center space-x-2 px-4 py-2 rounded font-semibold transition-all
                            ${!animeList.prevPage || loading
                                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                : 'bg-gray-800 hover:bg-gray-700 text-white'
                            }`}
                    >
                        Prev
                    </button>

                    <div className="flex items-center space-x-2 bg-[#0065F8] px-4 py-2 rounded font-bold">
                        <span className="text-sm">Page</span>
                        <span>{page}</span>
                    </div>

                    <button
                        onClick={() => setPage(prev => prev + 1)}
                        disabled={!animeList.nextPage || loading}
                        className={`flex items-center space-x-2 px-4 py-2 rounded font-semibold transition-all
                            ${!animeList.nextPage || loading
                                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                : 'bg-gray-800 hover:bg-gray-700 text-white'
                            }`}
                    >
                        Next
                    </button>
                </div>
            </div>

            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-4 right-4 z-50 bg-[#0065F8] hover:bg-[#4300FF] text-white p-3 rounded-full shadow-lg transition-all transform hover:scale-110"
                >
                    <ChevronUp className="w-6 h-6" />
                </button>
            )}
            <div className='fixed bottom-4 left-4 z-50'>
                <div className="flex bg-gray-800 rounded-lg p-1">
                    <button
                        onClick={() => {
                            setOrderBy('ascending');
                        }}
                        className={`p-2 rounded ${orderBy === 'ascending' ? 'bg-[#0065F8] text-white' : 'text-gray-400 hover:text-white'} transition-colors`}
                    >
                        <Grid3X3 className="w-4 h-4" />
                    </button>

                    <button
                        onClick={() => {
                            setOrderBy('text');
                        }}
                        className={`p-2 rounded ${orderBy === 'text' ? 'bg-[#0065F8] text-white' : 'text-gray-400 hover:text-white'} transition-colors`}
                    >
                        <List className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AnimeListPage;