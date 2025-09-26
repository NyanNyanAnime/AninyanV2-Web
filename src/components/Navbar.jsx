import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Home, List, Tags, CalendarDays, Search, Menu, X } from "lucide-react";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [animeSearch, setAnimeSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && animeSearch.trim()) {
            navigate(
                `/anime/search?animeSearch=${encodeURIComponent(
                    animeSearch
                )}&page=1&orderBy=latest`
            );
        }
    };

    const navItems = [
        { label: "Home", path: "/", icon: <Home className="w-5 h-5" /> },
        { label: "Anime List", path: "/animelist", icon: <List className="w-5 h-5" /> },
        { label: "Property", path: "/property", icon: <Tags className="w-5 h-5" /> },
        { label: "Schedule", path: "/schedule", icon: <CalendarDays className="w-5 h-5" /> },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-black/95 backdrop-blur-sm" : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <h1 className="text-2xl font-bold text-white">
                        ANI<span className="bg-white text-black px-2 py-1 rounded ml-1">NYAN</span>
                    </h1>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex space-x-6">
                        {navItems.map(({ label, path }) => (
                            <Link
                                key={label}
                                to={path}
                                className={`font-bold tracking-wide transition-colors duration-300 ${location.pathname === path ? "text-[#0065F8]" : "text-white/80 hover:text-white"
                                    }`}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* Search + Mobile Menu Button */}
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            placeholder="SEARCH ANIME..."
                            value={animeSearch}
                            onChange={(e) => setAnimeSearch(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="hidden md:block bg-gray-900 border border-gray-700 text-white placeholder-gray-400 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0065F8] transition-all"
                        />
                        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-black/95 px-4 py-4 space-y-4">
                    {navItems.map(({ label, path, icon }) => (
                        <Link
                            key={label}
                            to={path}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center space-x-2 text-lg font-medium ${location.pathname === path ? "text-[#0065F8]" : "text-white/80 hover:text-white"
                                }`}
                        >
                            <span>{icon}</span>
                            <span>{label}</span>
                        </Link>
                    ))}
                    <input
                        type="text"
                        placeholder="SEARCH ANIME..."
                        value={animeSearch}
                        onChange={(e) => setAnimeSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-400 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0065F8]"
                    />
                </div>
            )}
        </nav>
    );
};

export default Navbar;
