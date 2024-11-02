// Componentes
import { Looping } from '@/components/animations/Looping';
import { ContainerGrid } from '@/components/layout/ContainerGrid';
import { Heading } from '@/components/typrography/Heading';
import { ServiceList } from '@/components/ui/ServiceList';

export function SHabilits() {
    return (
        <section className="relative z-30 bg-whiteSecondary">
            <Looping />
            <ContainerGrid className="text-center flex flex-col items-center justify-center pt-28">
                <Heading as="h2" size="medium" className='font-semibold text-blue-700'>SERVIÇOS</Heading>
                <ServiceList />
            </ContainerGrid>
        </section>
    );
}