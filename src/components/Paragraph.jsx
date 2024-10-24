export default function Paragraph({size = "medium", children}) {
    const sizes = {
        large: "text-[28px] leading-[1.75rem]",
        medium: "text-[24px] leading-[1.55rem]",
        small: "text-[20px] leading-[1.25rem]",
    };

    return (
        <p className={sizes[size]} >{children}</p>
    )
}