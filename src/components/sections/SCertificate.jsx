import { ContainerGrid } from "../layout/ContainerGrid";

export function SCertificate() {
    return(
        <section className="pb-28" >
            <ContainerGrid>
                <div>
                    <object data="/certificates/Certificado_Boost_Luiz.pdf" type="application/pdf">
                        <p>Seu navegador não tem um plugin pra PDF</p>
                    </object>
                </div>
            </ContainerGrid>
        </section>
    )
}