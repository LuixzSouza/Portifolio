
'use client'

import { useState } from 'react';

import { HeaderFixed } from '@/components/headers/HeaderFixed';
import { MenuOpened } from '@/components/menus/MenuOpened';

export function MenuDefaultOpen() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    return (
        <>
            <HeaderFixed toggleMenu={toggleMenu} />
            <MenuOpened isOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </>
    )
}