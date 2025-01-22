'use client'
import React from 'react'
import './layoutLeftSettingsMenu.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LayoutLeftSettingsMenu = () => {
    const pathname = usePathname()
    return (

        <div className="settings-left-menu">
            <Link className={`settings-link ${pathname === '/settings/profile' && 'add-orange-bg'}`} href='/settings/profile'>My Profile</Link>
            <Link className={`settings-link ${pathname === '/settings/account' && 'add-orange-bg'}`} href='/settings/account'>My Account</Link>
            <Link className={`settings-link ${pathname === '/settings/performance' && 'add-orange-bg'}`} href='/settings/performance'>My Performance</Link>
            <Link className={`settings-link ${pathname === '/settings/preferences' && 'add-orange-bg'}`} href='/settings/preferences'>Display Preferences</Link>
        </div>
    )

}
export default LayoutLeftSettingsMenu