'use client'
import React, { useEffect } from 'react'
import './header.css'
import Container from '../container/Container'
import Link from 'next/link'
import Image from 'next/image'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, provider } from '@/config/firebase'
import { useUserDataStore } from '@/store/userData-store'
import { handleSignIn, handleSignOut } from '@/utils/functionToAuth'
import { GrUploadOption } from "react-icons/gr";
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { addDoc, collection } from 'firebase/firestore'
import { signInWithPopup } from 'firebase/auth'
import { checkUserExists, getCurrentDataUser, queryUserByUid } from '@/utils/queryUserByUid'


const Header = () => {
    const [user] = useAuthState(auth);

    const { dataUser, setSearchActivity, setLocationUser, setUserData, locationUser } = useUserDataStore();
    const router = useRouter()
    console.log(dataUser);

    const notifySignIn = () => toast('Succsess Sign In!');

    /*     const getCurrentDataUser = async (uid) => {
            const userSnapshot = await queryUserByUid(uid);
            if (userSnapshot && !userSnapshot.empty) {
                setUserData(userSnapshot.docs[0].data());
            }
        } */

    const handleSignIn = async () => {
        try {
            // Авторизація через Firebase Popup
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;

            const isExist = await checkUserExists(user?.uid);

            // Додавання користувача до Firestore
            if (isExist && user) {
                const userToAddRef = collection(db, 'users');
                await addDoc(userToAddRef, {
                    uid: user?.uid,
                    displayName: user?.displayName || '',
                    email: user?.email || '',
                    photoURL: user?.photoURL || '',
                    location: locationUser || '',
                    birthday: '',
                    gender: '',
                    weight: '',
                });

                setUserData(user); // Збереження даних у стані
                notifySignIn(); // Сповіщення про успішний вхід
            }
        } catch (error) {
            console.error("Error during sign-in: ", error);
            toast.error("Failed to sign in. Please try again.");
        }
    };

    useEffect(() => {
        if (user) {
            getCurrentDataUser(user?.uid, setUserData);
            setLocationUser()
        }

    }, [user])

    return (
        <header className='global-header'>
            <Container>
                <nav className='navbar'>
                    <Link href='/'>
                        <Image src='/logo.png' width={100} height={100} alt='logo-strava' />
                    </Link>
                    <div className="searchBox">
                        <input type="text" placeholder='Search' className='search-input' onChange={(e) => setSearchActivity(e.target.value)} />
                    </div>
                    <div className='box-right-nav'>
                        {dataUser?.photoURL && (
                            <>
                                <div className='box-img'>
                                    <div className='user-img'>
                                        <Image className='user-img' src={dataUser?.photoURL} width={35} height={35} alt='user-img' />
                                        <div className='menu-profile'>
                                            <ul className='menu-ul'>
                                                <li className='menu-profile-li'>
                                                    <Link href='/profile' className='my-prof-link'>My profile</Link>
                                                </li>
                                                <li className='menu-profile-li'>
                                                    <Link href='/settings/profile' className='my-prof-link'>Settings</Link>
                                                </li>
                                                <li className='menu-profile-li'>
                                                    {dataUser && (
                                                        <button className='btn-auth-menu' onClick={() => {
                                                            handleSignOut(setUserData);
                                                            router.push('/');
                                                        }}>Log Out</button>
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {dataUser?.uid && (
                            <div className="box-add-activity">
                                <button className='button-add-activity'>
                                    <div className="menu-add-activity">
                                        <ul className='menu-ul'>
                                            <li className='menu-add-li'>
                                                <Link href='/upload/manual' className='upload-activity-icon'>
                                                    <GrUploadOption className='GrUploadOption' />
                                                    Upload activity
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </button>
                            </div>
                        )}

                        {!dataUser?.uid && (
                            <button className='btn-auth' onClick={handleSignIn}>Log In</button>
                        )}

                    </div>
                </nav>
            </Container>

        </header>
    )
}

export default Header
