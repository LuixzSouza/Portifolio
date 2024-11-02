import { Heading } from "@/components/typrography/Heading";
import { Paragraph } from "@/components/typrography/Paragraph";
import { Category } from "@/components/buttons/Category";
import Image from "next/image";
import { ContainerGrid } from "../layout/ContainerGrid";

export function SProjetos({image, tec,}) {
    return (
        <section className="flex items-center justify-between w-full h-screen" >
            <ContainerGrid className={"flex items-center justify-between w-full h-full"} >
                <div className="w-full h-full flex flex-col items-start justify-between" >
                    <div className="w-full h-full flex flex-col items-start justify-start gap-9">
                        <div>
                            <Heading as="h4" size="small" color="white" >Fronend Development</Heading>
                        </div>
                        <div>
                            <div>
                                <Category>{tec}TOMA</Category>
                            </div>
                            <Paragraph color="white" >ipsum dolor sit amet consectetur adipisicing elit. Non ea dolorem ab? Distinctio accusamus dicta autem architecto aperiam. Dolorum aut repellat pariatur vitae ipsum sit quas placeat perspiciatis non soluta.</Paragraph>
                        </div>
                    </div>
                    <div className="w-full h-full flex flex-col items-start justify-start gap-9">
                        <div>
                            <Heading as="h4" size="small" color="white" >BackEnd Development</Heading>
                        </div>
                        <div>
                            <div>
                                <Category>{tec}TOMA</Category>
                            </div>
                            <Paragraph color="white" >ipsum dolor sit amet consectetur adipisicing elit. Non ea dolorem ab? Distinctio accusamus dicta autem architecto aperiam. Dolorum aut repellat pariatur vitae ipsum sit quas placeat perspiciatis non soluta.</Paragraph>
                        </div>
                    </div>
                    <div className="w-full h-full flex flex-col items-start justify-start gap-9">
                        <div>
                            <Heading as="h4" size="small" color="white" >UI/UX Design</Heading>
                        </div>
                        <div>
                            <div>
                                <Category>{tec}TOMA</Category>
                            </div>
                            <Paragraph color="white" >ipsum dolor sit amet consectetur adipisicing elit. Non ea dolorem ab? Distinctio accusamus dicta autem architecto aperiam. Dolorum aut repellat pariatur vitae ipsum sit quas placeat perspiciatis non soluta.</Paragraph>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full bg-white" >
                    <div>
                        <Image src={`/${image}`} width={600} height={600} alt="Projeto"/>
                    </div>
                </div>
            </ContainerGrid>
        </section>
    )
}