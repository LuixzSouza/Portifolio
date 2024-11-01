import { HeaderHome } from "@/components/headers/HeaderHome";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Sobre O Luiz",
};


export default function About() {
    return (
        <>
            <HeaderHome/>
            <h2>ABOUT</h2>
            
        </>
    )
}