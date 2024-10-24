import { HeaderHome } from "@/components/HeaderHome";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trabalho",
  description: "Trabalho do Luiz Antönio de Souza",
};

export default function Work() {
    return (
        <>
            <HeaderHome />
            <h1>Work</h1>
        </>
    )
}