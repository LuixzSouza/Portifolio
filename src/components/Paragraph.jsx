export function Paragraph({size = "medium", color = "black", children}) {
    const sizes = {
        large: "text-[1.75rem] leading-[2.5rem]",//28px
        medium: "text-[1.5rem] leading-[2rem]",//24px
        small: "text-[1.25rem] leading-[1.75rem]", //20px
    };

    return (
        <p className={`${sizes[size]} text-${color}`}>{children}</p>
    )
}