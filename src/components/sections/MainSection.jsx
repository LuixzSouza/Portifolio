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
      <SectionFooter bg={"bg-hero"} />
      <ClimUp/>
    </section>
  );
}

export default MainSection;
