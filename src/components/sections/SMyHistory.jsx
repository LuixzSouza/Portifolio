import Image from "next/image"
import { ContainerGrid } from "../layout/ContainerGrid"
import { Paragraph } from "../typrography/Paragraph"
import { LinkCustom } from "../ui/LinkCustom"
import { Clock } from "../widgets/Clock"

export function SMyHistory() {
    return (
        <section className="pt-28" >
            <ContainerGrid className={"flex flex-col"} >
                <div className="relative -bottom-4 z-20" >
                    <Paragraph size="large" color="white" >
                        Olá, pessoal, <br/>
                        Sou Luiz Antônio, um jovem de 20 anos nascido e criado no interior de Minas Gerais, em uma cidade com menos de 7 mil habitantes. Crescer em um ambiente tão pequeno me motivou a buscar conhecimento além das fronteiras da minha realidade. Todos os dias, percorro 100 km para chegar à faculdade, onde estudo Bacharelado em Sistemas de Informação e sigo em busca de evolução constante. Já atuo na área de desenvolvimento e web design há mais de dois anos, absorvendo tudo que posso para me tornar um profissional cada vez mais capacitado.
                    </Paragraph>
                </div>
                <div className="relative flex flex-col items-start justify-between gap-10 w-full h-full md:flex-row" >
                    <div className="relative w-full h-full bg-gradient-black-white md:sticky md:-top-0">
                        <Image src={"/image/MySelf.png"} width={900} height={600} alt="Luiz Foto"/>
                    </div>
                    <div className="w-full flex flex-col gap-10 py-24" >
                        <div className="flex flex-col items-start justify-center gap-5" >
                            <Paragraph size="small" color="white" >
                                Minha história de vida é marcada por desafios e superações. Meus pais eram surdos e mudos, mas, felizmente, não herdei essa condição. Quando eu tinha apenas 2 anos, minha mãe faleceu, e fui encontrado chorando ao seu lado. Com a perda, meu pai, que não podia cuidar de mim sozinho, me deixou aos cuidados de meus avós. Durante esse período, fui separado da minha irmã, algo que me marcou profundamente. Mais tarde, perdi minha avó, e meu avô, já com idade avançada, também não tinha condições de me criar. Foi então que minha tia Edmara, por parte de pai, me acolheu como filho.
                            </Paragraph>
                            <Paragraph size="small" color="white" >
                                Meu pai sempre me visitava, mas, em um triste dia, ele passou mal e, a caminho do hospital, sofreu um acidente dentro da ambulância que o deixou em coma. Ele resistiu por um tempo, mas não tive a oportunidade de me despedir, e guardo dele apenas as memórias.
                            </Paragraph>
                            <Paragraph size="small" color="white" >
                                Na infância, especialmente quando ainda vivia com meus avós, eu era uma criança rebelde, passando boa parte do tempo na rua. Quando fui morar com minha tia e meu tio (que considero como meus pais), trouxe muitos desafios para eles, pois era muito arteiro. Mesmo assim, eles me educaram com amor e paciência. Enfrentei dificuldades na escola e, em certo momento, precisei repetir de ano para conseguir acompanhar os estudos. Mas, graças ao apoio incondicional da minha família, pude crescer e aprender o que significa realmente ter uma família.
                            </Paragraph>
                            <Paragraph size="small" color="white" >
                                Com o tempo, percebi o quanto sou abençoado por ter minha tia Edmara e meu tio João como pais e meu irmão adotivo, Edu, que tanto admiro. Sou grato também pela família dele, com a Amanda e o pequeno Nicolas, a quem adoro ser tio. Além disso, encontrei o amor verdadeiro com minha namorada, Ingrid, minha primeira e única namorada, que me mostrou o que é amar de verdade.
                            </Paragraph>
                            <Paragraph size="small" color="white" >
                                Hoje, gosto de aproveitar meu tempo livre com minha família e me envolver em atividades que me fazem feliz. Amo jogos, tanto eletrônicos quanto esportivos, e a academia faz parte da minha rotina. Sou apaixonado por animais, especialmente por minha cachorrinha Lola, que já foi do meu irmão Edu. Embora muitas vezes seja uma pessoa tranquila e observadora, dependendo da situação, me abro e me mostro mais.
                            </Paragraph>
                            <Paragraph size="small" color="white" >
                                Descobri que uma das coisas que mais me traz satisfação é resolver problemas. Enfrentar desafios e superá-los com dedicação é uma das minhas maiores fontes de realização. Sou um entusiasta por estudos e livros, com preferência por aqueles que trazem conhecimento prático e informativo. Essa é uma breve jornada sobre quem sou. Se você leu até aqui, agradeço de coração e ficarei feliz em nos conhecermos.
                            </Paragraph>
                        </div>
                        <div className="w-full flex items-center justify-between" >
                            <LinkCustom link={"/work"} color={"white"} img={"image/icon-gmail.svg"} >ENTRAR EM CONTATO</LinkCustom>
                            <Clock/>
                        </div>
                    </div>
                </div>
            </ContainerGrid>
        </section>
    )
}