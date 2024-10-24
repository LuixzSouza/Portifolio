import Image from 'next/image'

// Components
import {HeaderHome} from '@/components/HeaderHome';
import {Heading} from '@/components/Heading';
import {Paragraph} from '@/components/Paragraph';

export function Homing() {
    return (
        <section className='w-screen h-full bg-black' >
            <HeaderHome/>
            <div>
                <Heading as="h1" size="xlarge" color='white' >LUIZ S<i className='text-playFair' >O</i>UZA</Heading>
                <Image src={'/image/MySelf.jpg'} width={240} height={120} alt='Luiz' />
                <span className="font-roobert text-white text-lg" >developer</span>
                <div>
                    <Paragraph size='small' color='white' >CRAFTING STUNNING DESIGN PROJECTS AROUND THE WORLD</Paragraph>
                </div>
            </div>
        </section>
    )
}