export function Paragraph({ 
    size = "medium", 
    color = "black", 
    max, 
    children, 
    className 
}) {
    const sizes = {
        large: "text-[1.75rem] leading-[2.5rem] sm:text-[1.75rem] sm:leading-[2.5rem] md:text-[2rem] md:leading-[2.75rem]", 
        medium: "text-[1.5rem] leading-[2rem] sm:text-[1.5rem] sm:leading-[2rem] md:text-[1.75rem] md:leading-[2.25rem]", 
        small: "text-[1.25rem] leading-[1.75rem] sm:text-[1.25rem] sm:leading-[1.75rem] md:text-[1.5rem] md:leading-[2rem]", 
        litlleSmall: "text-[1rem] leading-[1.5rem] sm:text-[1rem] sm:leading-[1.5rem] md:text-[1.25rem] md:leading-[1.75rem]", 
    };

    return (
        <p
            className={`w-full ${sizes[size]} text-${color} ${className}`}
            style={{ maxWidth: max }}
        >
            {children}
        </p>
    );
}
