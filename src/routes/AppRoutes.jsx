import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home'
import DetailAnime from '../pages/DetailAnime'
import VideoAnime from '../pages/VideoAnime'
import ViewMore from '../pages/ViewMore'
import SearchAnime from '../pages/SearchAnime'
import AnimeList from '../pages/AnimeList'
import AnimeProperties from '../pages/AnimeProperty'
import ViewMoreProperty from '../pages/ViewMoreProperty'

const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/anime/:type" element={<ViewMore />} />
                <Route path="/anime/search" element={<SearchAnime />} />
                <Route path="/anime/:animeCode/:animeId" element={<DetailAnime />} />
                <Route path="/anime/:animeCode/:animeId/:episodeId" element={<VideoAnime />} />
                <Route path="/animelist" element={<AnimeList />} />
                <Route path="/property" element={<AnimeProperties />} />
                <Route path="/property/:type/:id" element={<ViewMoreProperty />} />
            </Routes>
        </div>
    )
}

export default AppRoutes