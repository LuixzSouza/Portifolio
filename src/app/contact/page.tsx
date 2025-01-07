import { HeaderHome } from "@/components/headers/HeaderHome";
import {SectionContato} from "@/components/sections/SectionContato"
import { MenuDefaultOpen } from "@/components/menus/MenuDefaultOpen"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato",
  description: "Contato do Luiz",
};

export default function Contact() {
  return (
    <>
      <MenuDefaultOpen/>
      <HeaderHome/>
      <SectionContato/>
    </>
  );
}
