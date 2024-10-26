export function Heading({ 
    as: Tag = "h1", 
    size = "large", 
    color = "black", 
    lineHeight = "normal", 
    align = 'left',
    className = "", // Adiciona suporte para className dinâmico
    children 
}) {
  const sizes = {
      super: "text-[25rem] tracking-[-0.375rem] font-light", 
      xlarge: "text-[17.5rem] tracking-[-0.375rem] font-light", 
      large: "text-[10rem] tracking-[-0.375rem] font-light", 
      midlle: "text-[7.5rem] tracking-[-0.375rem] font-light", 
      menu: "text-[6.25rem] font-normal", 
      medium: "text-[4rem] font-regular", 
      small: "text-[2.5rem] font-regular", 
      tiny: "text-[1.75rem] font-regular", 
  };

  const lineHeights = {
      normal: "leading-normal",
      tight: "leading-tight",
      relaxed: "leading-relaxed",
      none: "leading-none",
      custom: `leading-[${lineHeight}]`,
  };

  return (
      <Tag 
          className={`
              ${sizes[size]} 
              ${lineHeights[lineHeight] || lineHeights.custom} 
              text-${color} 
              text-${align} 
              w-full 
              transition-transform duration-300 ease-in-out ${className}
          `}
      >
          {children}
      </Tag>
  );
}
