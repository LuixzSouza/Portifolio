// Heading.js
export function Heading({ as: Tag = "h1", size = "large", color = "black", children }) {
  const sizes = {
      super: "text-[25rem] leading-[150%] tracking-[-0.375rem] font-light",
      xlarge: "text-[17.5rem] leading-[150%] tracking-[-0.375rem] font-light",
      large: "text-[10rem] leading-[150%] tracking-[-0.375rem] font-light",
      medium: "text-[4rem] leading-[150%] font-regular",
      small: "text-[2.5rem] leading-[150%] font-regular",
      tiny: "text-[1.75rem] leading-[150%] font-regular",
  };

  return (
      <Tag className={`${sizes[size]} text-${color}`}>
          {children}
      </Tag>
  );
}
