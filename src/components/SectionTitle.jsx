import { Link } from "react-router-dom";
import { ChevronRight, Play, Film, CheckCircle, Sun } from 'lucide-react';

const SectionTitle = ({ title, subtitle, type }) => {
    const iconMap = {
        ongoing: <Play className="w-6 h-6" />,
        finished: <CheckCircle className="w-6 h-6" />,
        movie: <Film className="w-6 h-6" />,
        summer: <Sun className="w-6 h-6" />
    };

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
            <Link
                to={`/anime/${type}?page=1&order_by=latest`}>
                <button className="hidden sm:flex items-center space-x-2 text-white/80 hover:text-white transition-colors group">
                    <span className="text-sm">View All</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </Link>
        </div>
    );
};

export default SectionTitle;
