const LoadingDetail = () => {
    return (
        <div className="h-screen bg-black text-white relative overflow-hidden flex justify-center items-center">
            <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
                <div className="w-12 h-12 border-4 border-[#4300FF] border-t-transparent rounded-full animate-spin"></div>
            </div>
        </div>
    );
};

export default LoadingDetail;
