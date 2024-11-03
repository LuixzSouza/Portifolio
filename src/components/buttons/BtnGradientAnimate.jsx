export function BtnGradientAnimate({ children, onClick, className }) {
    return (
        <button
            onClick={onClick}
            className={`relative overflow-hidden shadow-sm shadow-black transform p-1 rounded-full ease-in-out duration-300 ${className} hover:scale-110 `}
        >
            <div className={`absolute inset-0 z-10 blur-sm bg-gradient-black-white animate-spin-slow min-w-[200%] min-h-[200%] aspect-ratio-[1/1] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}></div>
            <div className={`relative z-20 w-full h-full rounded-full bg-black p-5 bg-center bg-cover bg-no-repeat flex items-center justify-center`}>
                <div>
                    <span className="w-full text-base text-white font-roobert font-semibold">{children}</span>
                </div>
            </div>
        </button>
    );
}
