export default function Loading() {
    return (
        <div className="fixed inset-0 bg-white dark:bg-dark-DEFAULT z-[9999] flex flex-col items-center justify-center">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] animate-pulse"></div>
            </div>

            <div className="relative flex flex-col items-center">
                {/* Animated Icon */}
                <div className="w-20 h-20 mb-8 relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-2xl animate-ping opacity-75"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-glow-blue animate-float">
                        <svg
                            className="w-10 h-10 text-white drop-shadow-md"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="20,6 9,17 4,12" />
                        </svg>
                    </div>
                </div>

                {/* Loading Text */}
                <div className="flex flex-col items-center gap-2">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-pulse">
                        Todo Manager
                    </h2>
                    <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
