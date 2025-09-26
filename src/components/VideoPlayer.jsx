import ReactPlayer from "react-player";

const VideoPlayer = ({ url }) => {
    if (!url) {
        return (
            <div className="w-full bg-black rounded-lg overflow-hidden shadow-lg flex items-center justify-center aspect-video">
                <p className="text-white">Video tidak tersedia</p>
            </div>
        );
    }

    return (
        <div className="w-full bg-black rounded-lg overflow-hidden shadow-lg">
            <video
                src={url}
                controls
                className="w-full h-auto aspect-video"
                crossOrigin="anonymous"
            />
        </div>
    );
};

export default VideoPlayer;
