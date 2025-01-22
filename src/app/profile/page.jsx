'use client'
import Container from '@/components/container/Container'
import { useUserDataStore } from '@/store/userData-store'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import './profile.css'
import { getActivity } from '@/helpers/getActivity'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { GrNext, GrPrevious } from "react-icons/gr";
import { IoLocationOutline } from "react-icons/io5";

const Profile = () => {
    const { dataUser, listActivity, setListActivity } = useUserDataStore()
    const [filterGalleryIMG, setFilterGalleryIMG] = useState([]);
    const dialogRefs = useRef([]);

    useEffect(() => {
        if (listActivity.length > 0) {
            setFilterGalleryIMG(listActivity.filter((activity) => activity?.uid === dataUser?.uid));
        }
    }, [listActivity, dataUser]);

    const closeIndexModal = (index) => dialogRefs.current[index].close();

    const showModal = (index) => {
        if (dialogRefs.current[index]) {
            dialogRefs.current[index].showModal();
        }
    };

    const closeModal = (index) => {
        if (dialogRefs.current[index]) {
            closeIndexModal(index)
        }
    };

    const nextSlide = (index) => {
        if (dialogRefs.current[index]) {
            closeIndexModal(index)
        }
        if (dialogRefs.current[index + 1]) {
            dialogRefs.current[index + 1].showModal();
        }
    }
    const prevSlide = (index) => {
        if (dialogRefs.current[index]) {
            closeIndexModal(index)
        }
        if (dialogRefs.current[index - 1]) {
            dialogRefs.current[index - 1].showModal();
        }
    }



    useEffect(() => {
        getActivity(setListActivity)
    }, [])


    return (
        <div className="profile-box">
            <Container>
                <div className='profile-wrapper'>
                    <div className="profile-gallery">
                        {filterGalleryIMG.slice(0, 4).map((item, index) => (
                            <div key={item.id} className='box-modal'>
                                <button onClick={() => showModal(index)} className='btn-modal'>
                                    <Image src={item.image} width={300} height={300} alt='img-activity' />
                                </button>
                            </div>
                        ))}
                    </div>

                    {filterGalleryIMG.map((item, index) => (
                        <dialog key={item.id} ref={(el) => (dialogRefs.current[index] = el)} className='dialog-modal'>
                            <Image src={item.image} layout='responsive' width={400} height={100} alt='img-activity' />
                            <IoIosCloseCircleOutline className='dialog-btn-close' onClick={() => closeModal(index)} />
                            <div className="arrow-slide-box">
                                <div className="background-arrow-slide" onClick={() => prevSlide(index)}>
                                    <GrPrevious className='arrow-slide' />
                                </div>
                                <div className="background-arrow-slide" onClick={() => nextSlide(index)}>
                                    <GrNext className='arrow-slide' />
                                </div>
                            </div>
                        </dialog>
                    ))}

                    <div className="personal-info-box">
                        <div className="personal-info-left">
                            {dataUser?.photoURL && (
                                <Image src={dataUser?.photoURL} width={132} height={132} alt='user-img' className='profile-img' />
                            )}
                            <div className='personal-info-name'>{dataUser?.displayName}</div>
                            <div className='personal-info-location'><IoLocationOutline className='location-icon' />{dataUser?.location}</div>

                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Profile;
