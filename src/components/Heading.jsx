export function Heading({ 
    as: Tag = "h1", 
    size = "large", 
    color = "black", 
    lineHeight = "normal", 
    children 
}) {
  const sizes = {
      super: "text-[25rem] tracking-[-0.375rem] font-light", //400px
      xlarge: "text-[17.5rem] tracking-[-0.375rem] font-light", //280px
      large: "text-[10rem] tracking-[-0.375rem] font-light", //160px
      midlle: "text-[7.5rem] tracking-[-0.375rem] font-light", //120px
      medium: "text-[4rem] font-regular", //64px
      small: "text-[2.5rem] font-regular", //40px
      tiny: "text-[1.75rem] font-regular", //28px
  };

  const lineHeights = {
      normal: "leading-normal",
      tight: "leading-tight",
      relaxed: "leading-relaxed",
      none: "leading-none",
      custom: `leading-[${lineHeight}]`, // Suporte para valor personalizado
  };

  return (
      <Tag className={`${sizes[size]} ${lineHeights[lineHeight] || lineHeights.custom} text-${color} w-full`}>
          {children}
      </Tag>
  );
}
