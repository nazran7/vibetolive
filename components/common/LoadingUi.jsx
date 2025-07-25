'use client';

export default function LoadingUI() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">

                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                <p className="text-lg font-semibold text-gray-800 animate-pulse">Loading...</p>
            </div>
        </div>
    );
}
