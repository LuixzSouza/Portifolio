'use client'
// Components
import { ContainerGrid } from "@/components/ContainerGrid";
import { LinkNav } from "@/components/LinkNav";
import { Clock } from "@/components/Clock";

export function HeaderHome() {
    return (
        <ContainerGrid className={"flex justify-between items-center py-5 w-full"} >
            <LinkNav   link="/" firstText="LUIZ SOUZA" secondText="LUIZ SOUZA"/>
            <nav className="flex justify-center items-center gap-16" >
                <LinkNav link="/work" firstText="WORK" secondText="WORK"/>
                <LinkNav link="/about" firstText="ABOUT" secondText="ABOUT"/>
                <LinkNav link="/contact" firstText="CONTACT" secondText="CONTACT"/>
            </nav>
            <div className="flex justify-center items-center gap-8 w-full max-w-48" >
                <Clock />
            </div>
        </ContainerGrid>
    )
}