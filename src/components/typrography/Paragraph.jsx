export function Paragraph({ size = "medium", color = "black", max, children, className }) {
    const sizes = {
        large: "text-[1.75rem] leading-[2.5rem]", //28px
        medium: "text-[1.5rem] leading-[2rem]", //24px
        small: "text-[1.25rem] leading-[1.75rem]", //20px
        litlleSmall: "text-[1rem] leading-[1.5rem]", //18px
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

