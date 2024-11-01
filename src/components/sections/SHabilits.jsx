// Componentes
import { Looping } from '@/components/animations/Looping'
import { ContainerGrid } from '@/components/layout/ContainerGrid'

export function SHabilits() {
    return(
        <section className="relative z-30 bg-white" >
            <Looping/>
            <ContainerGrid>
            </ContainerGrid>
        </section>
    )
}