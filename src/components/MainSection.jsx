// components/SectionHero.js
"use client"; // Habilita hooks e estado

import { useState } from 'react';
import { Homing } from '@/components/sections/Homing';
import { CreateImpactProjects } from '@/components/sections/SImpactProjects';
import { HeaderFixed } from '@/components/headers/HeaderFixed';//ok
import Steps from '@/components/sections/Steps'; // Importação correta
import { SectionWork } from '@/components/sections/SWork';
import { SectionFooter } from '@/components/sections/Footer';
import { MenuOpened } from '@/components/menus/MenuOpened';//ok

export function MainSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <section className="relative">
      <Homing />
      <HeaderFixed toggleMenu={toggleMenu} />
      <CreateImpactProjects />
      <Steps /> {/* Agora o Steps está funcionando */}
      <SectionWork />
      <div className="relative z-20 w-full h-16 bg-white rounded-bl-custom-80 rounded-br-custom-80"></div>
      <SectionFooter />
      <MenuOpened isOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </section>
  );
}

export default MainSection;
