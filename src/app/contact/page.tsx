import { HeaderHome } from "@/components/HeaderHome";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato",
  description: "Contato do Luiz",
};

export default function Contact() {
  return (
    <>
      <HeaderHome/>
      <h1>Contato</h1>
    </>
  );
}
