import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnimeCard from "./AnimeCard";

const AnimeCardSlider = ({ animeList }) => {
    const sliderRef = useRef(null);

    const scroll = (direction) => {
        if (sliderRef.current) {
            const scrollAmount = sliderRef.current.offsetWidth;
            sliderRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => scroll("left")}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full shadow-lg"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            <div
                ref={sliderRef}
                className="flex overflow-x-auto no-scrollbar gap-4 scroll-smooth py-5"
            >
                {animeList.map((anime, index) => (
                    <div key={anime.id} className="flex-none w-[150px] sm:w-[180px] md:w-[200px] lg:basis-1/6 lg:max-w-[16.66%]">
                        <AnimeCard anime={anime} index={index} />
                    </div>
                ))}
            </div>

            <button
                onClick={() => scroll("right")}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full shadow-lg"
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>
    );
};

export default AnimeCardSlider;
