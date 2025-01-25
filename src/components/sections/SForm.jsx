'use client'

import { useState, useEffect, useRef } from 'react';
import { InputForm } from '@/components/ui/InputForm';
import { BotaoPrimary } from "../buttons/Botao";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { Heading } from "../typrography/Heading";
import { Paragraph } from "../typrography/Paragraph";
import { ContainerGrid } from "../layout/ContainerGrid";
import { LoadingEmail } from "@/components/ui/LoadingEmail"

const socialInfo = [
  {
    icon: '/image/icon-linkedin.svg',
    type: 'Linkedin',
    subtype: 'Luiz Antônio de Souza',
    link: 'https://www.linkedin.com/in/luiz-antonio-souza-5000a226b/',
  },
  {
    icon: '/image/icon-instagram.svg',
    type: 'Instagram',
    subtype: 'luizantonio.souza_',
    link: 'https://www.instagram.com/luizantonio.souza_/?next=%2F',
  },
  {
    icon: '/image/icon-gmail.svg',
    type: 'Gmail',
    subtype: 'ola@luixzsouza.com.br',
    link: 'mailto:ola@luixzsouza.com.br',
  },
  {
    icon: '/image/icon-gmail.svg',
    type: 'Gmail',
    subtype: 'luiz.antoniodesouza004@gmail.com',
    link: 'mailto:luiz.antoniodesouza004@gmail.com',
  },
  {
    icon: '/image/icon-phone.svg',
    type: 'Telefone',
    subtype: '55+ (35) 99735-4797',
    link: 'https://wa.me/5535997354797?text=Olá%20acessei%20seu%20site%20e%20gostaria%20de%20conversar',
  },
];

export function SectionFormulario() {
  const [currentIcon, setCurrentIcon] = useState('f-hello.svg');
  const [animateIcon, setAnimateIcon] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(null); // "loading", "success", "error"
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: '', // Incluído o campo mensagem
  });

  const sectionRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFocus = (icon) => {
    setAnimateIcon(true);
    setCurrentIcon(icon);
    setTimeout(() => setAnimateIcon(false), 300);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      if (!formData.nome || !formData.email || !formData.mensagem) {
          setLoadingStatus("error");
          return;
      }

      setIsLoading(true);
      setLoadingStatus("loading");

      try {
          const response = await fetch('php/sendEmail.php', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
          });

          if (response.ok) {
              setLoadingStatus("success");
              setFormData({ nome: '', email: '', mensagem: '' });
          } else {
              setLoadingStatus("error");
          }
      } catch {
          setLoadingStatus("error");
      } finally {
          // Depois de exibir o status, deixa o componente visível por 3 segundos
          setTimeout(() => {
              setIsLoading(false);
              setLoadingStatus(null); // Isso remove o LoadingEmail após o tempo
          }, 4000); // 3 segundos de delay
      }
  };


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 50%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef}>
      {isLoading && (
        <LoadingEmail
          status={loadingStatus}
          onClose={() => setLoadingStatus(null)}
        />
      )}
      <ContainerGrid className="w-full h-full flex flex-col items-start justify-center py-28 gap-16 md:flex-row">
        <div className="flex flex-col items-start justify-start gap-8 w-full">
          <div>
            <Heading as="h2" size="medium" color="white">
              Tem alguma <span className="text-gradient-black font-semibold">pergunta?</span>
            </Heading>
            <Heading as="h2" size="medium" color="white">
              Pronto para <span className="text-gradient-black font-extrabold">começar?</span>
            </Heading>
          </div>
          <div className="flex flex-col gap-6">
            <Paragraph size="litlleSmall" color="white">
              Vamos iniciar uma conversa! Preencha nosso formulário de contato, <br /> e entraremos em contato com você o mais rápido possível
            </Paragraph>
            <Link href={"/certificates/Curriculo_Luiz_2025.pdf"} target='_blank'>
              <BotaoPrimary estilo="primary">Download CV</BotaoPrimary>
            </Link>
          </div>
          <div className="flex flex-col items-start justify-start gap-4">
            {socialInfo.map((item, index) => (
              <Link
                href={item.link}
                key={index}
                className="flex items-center justify-center gap-6 group transition-all duration-300"
              >
                <Image
                  src={item.icon}
                  width={45}
                  height={45}
                  alt="Icone"
                  className="transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 ease-in-out"
                />
                <div className="flex flex-col items-start justify-start">
                  <Paragraph size="small" color="white">
                    {item.type}
                  </Paragraph>
                  <Paragraph size="tiny" color="white">
                    {item.subtype}
                  </Paragraph>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="relativ bg-white/05 flex flex-col gap-8 w-full rounded-xl shadow-2xl shadow-white/30 p-4 md:p-10">
          <div className={`relative w-full flex items-center justify-start pb-2`}>
            <Heading as="h4" size="medium" color="white" className="break-words w-full max-w-400">
              Olá {formData.nome}
            </Heading>
            <div className={`absolute right-0 top-0 ${animateIcon ? 'animate-icon-change' : ''}`}>
              <Image
                src={`icons/icon-faces/${currentIcon}`}
                width={120}
                height={100}
                alt="Icon"
                className="transition-transform duration-500"
              />
            </div>
          </div>
          <InputForm
            quest="Meu nome é"
            placehold="Insira seu nome"
            tipo="text"
            value={formData.nome}
            onChange={handleInputChange}
            onFocus={() => handleFocus('f-write.svg')}
            name="nome"
          />
          <InputForm
            quest="E-mail"
            placehold="Insira seu e-mail"
            tipo="email"
            onFocus={() => handleFocus('f-email.svg')}
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <InputForm
            quest="Mensagem"
            placehold="Insira sua mensagem"
            tipo="text"
            onFocus={() => handleFocus('f-conversation.svg')}
            name="mensagem"
            value={formData.mensagem}
            onChange={handleInputChange}
          />
          <button type="submit" className="p-6 w-full h-full text-center bg-white rounded-full text-black mt-10">
            ENVIAR
          </button>
        </form>
      </ContainerGrid>
    </section>
  );
}