'use client'
import React, { useEffect } from 'react'
import './header.css'
import Container from '../container/Container'
import Link from 'next/link'
import Image from 'next/image'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '@/config/firebase'
import { useUserDataStore } from '@/store/userData-store'
import { handleSign, handleSignOut } from '@/utils/functionToAuth'
import { GrUploadOption } from "react-icons/gr";

const Header = () => {
    const [user] = useAuthState(auth);

    const { setUserData, dataUser } = useUserDataStore();


    useEffect(() => {
        if (user) {
            setUserData(user)
        }
    }, [user])

    return (
        <header className='global-header'>
            <Container>
                <nav className='navbar'>
                    <Link href='/'>
                        <Image src='/logo.png' width={100} height={100} alt='logo-strava' />
                    </Link>
                    <div className='box-right-nav'>
                        {dataUser?.photoURL && (
                            <>
                                <div className='box-img'>
                                    <div className='user-img'>
                                        <Image className='user-img' src={dataUser?.photoURL} width={35} height={35} alt='user-img' />
                                        <div className='menu-profile'>
                                            <ul className='menu-ul'>
                                                <li className='menu-profile-li'>
                                                    My Profile
                                                </li>
                                                <li className='menu-profile-li'>
                                                    {dataUser && (
                                                        <button className='btn-auth-menu' onClick={() => handleSignOut(setUserData)}>Log Out</button>
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {dataUser && (
                            <div className="box-add-activity">
                                <button className='button-add-activity'>
                                    <div className="menu-add-activity">
                                        <ul className='menu-ul'>
                                            <li className='menu-add-li'>
                                                <Link href='/upload' className='upload-activity-icon'>
                                                    <GrUploadOption className='GrUploadOption' />
                                                    Upload activity
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </button>
                            </div>
                        )}

                        {!dataUser && (
                            <button className='btn-auth' onClick={handleSign}>Log In</button>

                        )}

                    </div>
                </nav>
            </Container>

        </header>
    )
}

export default Header
