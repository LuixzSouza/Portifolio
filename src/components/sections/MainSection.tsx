import { ClimUp } from '@/components/widgets/ClimUp';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { FeaturedWork } from '@/components/sections/FeaturedWork';
import { Timeline } from '@/components/sections/Timeline';
import { Skills } from '@/components/sections/Skills';
import { Testimonials } from '@/components/sections/Testimonials';

export function MainSection() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedWork />
      <Testimonials />
      <Timeline />
      <Skills />
      <ClimUp />
    </>
  );
}

export default MainSection;
