export function Tecnology({ max, height, left, right, top, bottom }) {
    const styles = {
        maxWidth: `${max}px`,
        height: `${height}px`,
        width: '100%',  // Adicionando width 100%
        position: 'absolute',  // Garantindo posicionamento absoluto
        left: left !== undefined ? `${left}%` : 'auto',
        right: right !== undefined ? `${right}%` : 'auto',
        top: top !== undefined ? `${top}%` : 'auto',
        bottom: bottom !== undefined ? `${bottom}%` : 'auto',
    };

    return (
        <div style={styles} className="flex items-center justify-center overflow-hidden">
            <div className="bg-black relative w-full h-full p-1">
                <div 
                    className="absolute inset-0 z-10" 
                    style={{ transformOrigin: 'center', width: '100%', height: '100%' }}
                >
                    <div 
                        className="absolute inset-0 z-10 bg-custom-gradient animate-spin-slow min-w-[200%] min-h-[200%] aspect-ratio-[1/1] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    ></div>
                </div>
                <div className="relative z-20 w-full h-full bg-white flex items-center justify-center shadow-inner shadow-black">
                    <div className="text-center">
                        <h2>Imagem</h2>
                        <p>Description</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
