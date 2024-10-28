// components/SectionHero.js
"use client"; // Habilita hooks e estado

import { useState } from 'react';
import { Homing } from '@/components/Homing';
import { CreateImpactProjects } from '@/components/SImpactProjects';
import { HeaderFixed } from '@/components/HeaderFixed';
import Steps from '@/components/Steps'; // Importação correta
import { SectionWork } from '@/components/SWork';
import { SectionFooter } from '@/components/Footer';
import { MenuOpened } from '@/components/MenuOpened';

export function SectionHero() {
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

export default SectionHero;
