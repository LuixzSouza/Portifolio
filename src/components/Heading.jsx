// Heading.js
export function Heading({ as: Tag = "h1", size = "large", color = "black", children }) {
  const sizes = {
      super: "text-[25rem] tracking-[-0.375rem] font-light",
      xlarge: "text-[17.5rem] tracking-[-0.375rem] font-light",
      large: "text-[10rem] tracking-[-0.375rem] font-light",
      medium: "text-[4rem] font-regular",
      small: "text-[2.5rem] font-regular",
      tiny: "text-[1.75rem] font-regular",
  };

  return (
      <Tag className={`${sizes[size]} text-${color}`}>
          {children}
      </Tag>
  );
}
