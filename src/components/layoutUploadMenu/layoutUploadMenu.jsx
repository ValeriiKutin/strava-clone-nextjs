'use client'
import React from 'react'
import './LayoutUploadMenu.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LayoutUploadMenu = () => {
    const pathname = usePathname()
    console.log(pathname);

    return (
        <div className='layoutUploadMenu-box'>
            <Link href='/upload/select' className={`${pathname === '/upload/select' && 'add-orange-line'}`}>File</Link>
            <Link href='/upload/manual' className={`${pathname === '/upload/manual' && 'add-orange-line'}`}>Manual</Link>
        </div>

    )
}

export default LayoutUploadMenu