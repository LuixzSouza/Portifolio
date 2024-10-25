
// Components
import { ContainerGrid } from "@/components/ContainerGrid";
import { LinkNav } from "@/components/LinkNav";

export function HeaderFixed() {

    return (
        <header className="sticky top-0 z-50  bg-white">
            <ContainerGrid 
                className={`flex justify-between items-center py-5 w-full transition-all duration-700`}>
                <div>
                    <LinkNav link="/" firstText="LUIZ SOUZA" secondText="LUIZ SOUZA" color={"black"} />
                </div>
                <nav className={`flex justify-center items-center gap-16`}>
                    <LinkNav link="/work" firstText="WORK" secondText="WORK" color={"black"}/>
                    <LinkNav link="/about" firstText="ABOUT" secondText="ABOUT" color={"black"}/>
                    <LinkNav link="/contact" firstText="CONTACT" secondText="CONTACT" color={"black"}/>
                </nav>
            </ContainerGrid>
        </header>
    );
}
