import { Link } from "react-router-dom";
import { ChevronRight, Play, Film, CheckCircle, Leaf, Globe, Tag } from 'lucide-react';

const SectionTitle = ({ title, subtitle, type, activeValue }) => {
    const iconMap = {
        ongoing: <Play className="w-6 h-6" />,
        finished: <CheckCircle className="w-6 h-6" />,
        movie: <Film className="w-6 h-6" />,
        fall: <Leaf className="w-6 h-6" />,
        genre: <Tag className="w-6 h-6" />,
        country: <Globe className="w-6 h-6" />
    };

    // Default URL
    let linkUrl = `/anime/${type}?page=1&order_by=latest`;

    // Kalau type genre/country, ikut activeValue
    if (type === "genre" && activeValue) {
        linkUrl = `/property/genre/${activeValue}`;
    } else if (type === "country" && activeValue) {
        linkUrl = `/property/country/${activeValue}`;
    } else if (type == "season") {
        linkUrl = `/property/season/${activeValue}`;
    }

    return (
        <div className="flex items-center justify-between mb-6 md:mb-8">
            <div className="flex items-center space-x-3">
                <div className="text-[#0065F8]">
                    {iconMap[type]}
                </div>
                <div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                        {title}
                    </h2>
                    <p className="text-gray-400 text-sm">{subtitle}</p>
                </div>
            </div>
            <Link to={linkUrl}>
                <button className="hidden sm:flex items-center space-x-2 text-white/80 hover:text-white transition-colors group">
                    <span className="text-sm">View All</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </Link>
        </div>
    );
};

export default SectionTitle;
