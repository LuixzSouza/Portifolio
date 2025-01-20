import { ContainerGrid } from "../layout/ContainerGrid";
import { ContentVideo } from "@/components/ui/ContentVideo"
import { Paragraph } from "../typrography/Paragraph";
import { Heading } from "../typrography/Heading";

export function Svideo() {
    return (
        <section className="relative py-28" >
            <ContainerGrid className={"relative z-30"} >
                <div className="flex flex-col gap-6 items-center justify-center pb-16">
                    <div className="rounded-lg overflow-hidden w-full max-w-screen-lg">
                        <iframe
                        src="https://drive.google.com/file/d/1j6tl672n3leC4IZ3b5H09EtWHythhlI8/preview"
                        className="w-full aspect-[16/9] object-cover"
                        allow="autoplay"
                        />
                    </div>
                    <div className="w-full flex flex-col items-start justify-start max-w-screen-lg">
                        <Paragraph size="tiny" className="text-red-600 font-semibold">
                        SOBRE
                        </Paragraph>
                        <Heading as="h5" size="tiny" color="white">
                        Quem sou eu?
                        </Heading>
                        <div>
                        <Paragraph size="tiny" className="text-white/60">
                            20/01/2025 • 10min de video
                        </Paragraph>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col items-center justify-between gap-6 sm:flex-row" >
                    <ContentVideo
                        video={"https://drive.google.com/file/d/1tn03XJZXC6ljF-WcVbbyTSuXuaKCu0pC/preview"}
                        tipo={"TECNOLOGIA"}
                        titulo={"Oque é Front-End? #1"}
                        data={"18 de nov. de 2024"}
                        tempo={"5min"}
                    />
                    <ContentVideo
                        video={"https://drive.google.com/file/d/1j6tl672n3leC4IZ3b5H09EtWHythhlI8/preview"}
                        tipo={"TECNOLOGIA"}
                        titulo={"Oque é Front-End? #2"}
                        data={"26 de nov. de 2024"}
                        tempo={"3min"}
                    />
                </div>
            </ContainerGrid>
            <div className="absolute bottom-0 h-5/6 w-full bg-white/10 z-20 md:h-2/3" ></div>
        </section>
    )
}
