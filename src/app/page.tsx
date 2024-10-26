"use client"; // Diretiva para indicar que este é um Client Component

import { useState } from 'react';
// Components
import { Homing } from "@/components/Homing";
import { CreateImpactProjects } from "@/components/SImpactProjects";
import { HeaderFixed } from "@/components/HeaderFixed";
import { SectionYears } from "@/components/SYears";
import { SectionWork } from "@/components/SWork";
import { SectionFooter } from "@/components/Footer";
import { MenuOpened } from "@/components/MenuOpened";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <section className="relative">
      <Homing />
      <HeaderFixed toggleMenu={toggleMenu} />
      <CreateImpactProjects />
      <SectionYears />
      <SectionWork />
      <div className="relative z-20 w-full h-16 bg-white rounded-bl-custom-80 rounded-br-custom-80"></div>
      <SectionFooter />
      <MenuOpened isOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </section>
  );
}
