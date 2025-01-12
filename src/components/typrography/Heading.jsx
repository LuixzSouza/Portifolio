export function Heading({ 
    as: Tag = "h1", 
    size = "large", 
    color = "black", 
    lineHeight = "normal", 
    align = 'left',
    className = "", // Adiciona suporte para className dinâmico
    children,
    ref
}) {
    const sizes = {
        super: "text-[12rem] tracking-[-0.375rem] font-light sm:text-[18rem] lg:text-[25rem]", 
        xlarge: "text-[6rem] tracking-[-0.375rem] font-light sm:text-[12rem] lg:text-[17.5rem]", 
        larger: "text-[6rem] tracking-[-0.375] font-light sm:text-[9rem] lg:text-[13.5rem]", 
        large: "text-[5rem] tracking-[-0.375rem] font-light sm:text-[7rem] md:text-[10rem]", 
        midlle: "text-[3.5rem] tracking-[-0.375rem] font-light sm:text-[5rem] md:text-[7.5rem]", 
        menu: "text-[3rem] font-normal sm:text-[4.5rem] md:text-[6.25rem]", 
        medium: "text-[2rem] font-regular md:text-[3rem]",
        small: "text-[1.25rem] font-regular sm:text-[1.75rem] md:text-[2.5rem]", 
        tiny: "text-[1rem] font-regular sm:text-[1.45rem] md:text-[1.75rem]", 
        litlle: "text-[1rem] font-regular md:text-[1.20rem]", 
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
        ref = {ref}
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
