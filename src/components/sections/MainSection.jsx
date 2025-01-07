// Componentes
import { ClimUp } from '@/components/widgets/ClimUp';
import { Homing } from '@/components/sections/Homing';
import { SectionWork } from '@/components/sections/SWork';
import { SHabilits } from '@/components/sections/SHabilits';
import { SectionFooter } from '@/components/sections/Footer';
import { StimeLines } from '@/components/sections/StimeLines';
import { CreateImpactProjects } from '@/components/sections/SImpactProjects';
import { MenuDefaultOpen } from "@/components/menus/MenuDefaultOpen"

export function MainSection() {

  return (
    <section className="relative">
      <MenuDefaultOpen/>
      <Homing />
      <CreateImpactProjects />
      <StimeLines />
      <SectionWork />
      <SHabilits/>
      <div className="relative z-20 w-full h-16 bg-whiteSecondary rounded-bl-custom-80 rounded-br-custom-80"></div>
      <SectionFooter />
      <ClimUp/>
    </section>
  );
}

export default MainSection;
