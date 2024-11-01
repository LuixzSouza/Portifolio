// Habilita hooks e estado
"use client"; 

// React
import { useState } from 'react';

// Componentes
import { ClimUp } from '@/components/widgets/ClimUp';
import { Homing } from '@/components/sections/Homing';
import { SectionWork } from '@/components/sections/SWork';
import { MenuOpened } from '@/components/menus/MenuOpened';
import { SHabilits } from '@/components/sections/SHabilits';
import { SectionFooter } from '@/components/sections/Footer';
import { StimeLines } from '@/components/sections/StimeLines';
import { HeaderFixed } from '@/components/headers/HeaderFixed';
import { CreateImpactProjects } from '@/components/sections/SImpactProjects';

export function MainSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <section className="relative">
      <Homing />
      <HeaderFixed toggleMenu={toggleMenu} />
      <CreateImpactProjects />
      <StimeLines />
      <SectionWork />
      <SHabilits/>
      <div className="relative z-20 w-full h-16 bg-white rounded-bl-custom-80 rounded-br-custom-80"></div>
      <SectionFooter />
      <MenuOpened isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <ClimUp/>
    </section>
  );
}

export default MainSection;
