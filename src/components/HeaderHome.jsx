
// Components
import { ContainerGrid } from "@/components/ContainerGrid";
import { LinkNav } from "@/components/LinkNav";

export function HeaderHome() {
    return (
        <ContainerGrid>
            <LinkNav link="/" firstText="LUIZ SOUZA" secondText="LUIZ SOUZA"/>
            <nav>
                <LinkNav link="/" firstText="WORK" secondText="WORK"/>
                <LinkNav link="/" firstText="ABOUT" secondText="ABOUT"/>
                <LinkNav link="/" firstText="CONTACT" secondText="CONTACT"/>
            </nav>
            <div>
                <span>09:12 PM GMT-3</span>
            </div>
        </ContainerGrid>
    )
}