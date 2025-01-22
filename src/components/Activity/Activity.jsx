'use client'
import React, { useEffect, useState } from 'react'
import { PiSneakerMoveBold, PiBicycleBold } from "react-icons/pi";
import Image from 'next/image';
import { useUserDataStore } from '@/store/userData-store';
import { RiDeleteBin6Line } from "react-icons/ri";
import Link from 'next/link';
import { getFormmatedDate } from '../activityPage/helper/getFormattedDate';
import { calculatePaceOfActivity } from './helper/calculatePaceOfActivity';
import { collection, deleteDoc, doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { useAuthState } from 'react-firebase-hooks/auth';

const Activity = ({ data, deleteActivity }) => {
    const { dataUser } = useUserDataStore();
    const [likes, setLikes] = useState([]);
    const [isLiked, setIsLiked] = useState(false);

    const formattedDate = getFormmatedDate(data?.dateTime)
    const pace = calculatePaceOfActivity(data);

    const likeActivity = async () => {
        if (dataUser) {
            await setDoc(doc(db, 'activity', data.id, 'likes', dataUser?.uid), {
                username: dataUser?.displayName,
                timestamp: serverTimestamp()
            });
        }
    }

    const unLikeActivity = async () => {
        await deleteDoc(doc(db, 'activity', data.id, 'likes', dataUser?.uid));
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'activity', data.id, 'likes'),
            (snapshot) => {
                setLikes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            });

        return () => unsubscribe();
    }, [db])

    useEffect(() => {
        setIsLiked(likes?.findIndex((like) => like.id === dataUser?.uid) !== -1);
    }, [likes])

    return (
        <>
            <div className='activity-box-top'>
                {data?.imgOfCreator && <Image className='activity-userImg' src={data?.imgOfCreator} width={35} height={35} alt='user-img' />}
                <div className="activities-userInfo-box">
                    <p className='activities-userName'>{data?.nameOfCreator}</p>
                    <span className='activities-dateOfActivity'>{formattedDate} {data?.locationUser}</span>
                </div>
            </div>
            {data.sport === 'Run' ? (
                <PiSneakerMoveBold className='icon-type-of-sport' />

            ) : (
                <PiBicycleBold className='icon-type-of-sport' />

            )}
            <Link href={`activities/${data.id}`}>
                <h3 className='activities-title'>{data.title}</h3>
            </Link>
            <div className="activities-box-of-info">
                <div className='activity-info-box'>
                    <label className='activity-label'>Distance</label>
                    <span className='activity-infoNumber'>{data.distance} km</span>
                </div>
                <div className='activity-info-box'>
                    <label className='activity-label'>Pace</label>
                    <span className='activity-infoNumber'>{data?.sport === 'cycling' ? `${data?.avgSpeed} /km` : pace}</span>
                </div>
                <div className='activity-info-box'>
                    <label className='activity-label'>Time</label>
                    <span className='activity-infoNumber'>
                        {data?.durationHr !== 0 && `${data?.durationHr}hr `}
                        {data?.durationMin !== 0 && `${data?.durationMin}min `}
                        {data?.durationSec}sec
                    </span>
                </div>
            </div>
            {data.image && <Image src={data.image} layout='responsive' width={700} height={300} alt='activity-img' />}
            {dataUser?.uid && (
                <div className="activity-likes">
                    {isLiked ? (
                        <HiHeart className='like-icon like-icon-unlike' onClick={unLikeActivity} />
                    ) : (
                        <HiOutlineHeart className='like-icon like-icon-like' onClick={likeActivity} />
                    )}
                    <span style={{ color: isLiked && 'red' }}>{likes?.length > 0 && likes?.length}</span>
                </div >
            )}

            {dataUser?.uid === data?.uid && (
                <button className='delete-btn'><RiDeleteBin6Line className='delete-btn-icon' onClick={() => deleteActivity(data.id, data.uid)} /></button>
            )
            }

        </>
    )
}

export default Activity