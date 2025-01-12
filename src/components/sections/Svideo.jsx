import { ContainerGrid } from "../layout/ContainerGrid";

export function Svideo() {
    return (
        <section className="py-28" >
            <ContainerGrid>
                <div className="flex items-center justify-center pb-16" >
                    <div className="rounded-lg overflow-hidden" >
                        <iframe src="https://drive.google.com/file/d/1j6tl672n3leC4IZ3b5H09EtWHythhlI8/preview" width="1200" height="480" allow="autoplay"></iframe>
                    </div>
                </div>
                <div className="w-full flex flex-col items-center justify-between gap-6 sm:flex-row" >
                    <div className="rounded-lg overflow-hidden" >
                        <iframe src="https://drive.google.com/file/d/1j6tl672n3leC4IZ3b5H09EtWHythhlI8/preview" width="640" height="480" allow="autoplay"></iframe>
                    </div>
                    <div className="rounded-lg overflow-hidden" >
                        <iframe src="https://drive.google.com/file/d/1tn03XJZXC6ljF-WcVbbyTSuXuaKCu0pC/preview" width="640" height="480" allow="autoplay"></iframe>
                    </div>
                </div>
            </ContainerGrid>
        </section>
    )
}
