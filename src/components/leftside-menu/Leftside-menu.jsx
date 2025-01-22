import React from 'react'
import './leftside-menu.css'
import { useUserDataStore } from '@/store/userData-store'
import Image from 'next/image'
import { getFormmatedDate } from '../activityPage/helper/getFormattedDate'
import {useEffect} from 'react'

const LeftsideMenu = () => {
    const { dataUser, listActivity } = useUserDataStore();
    const latestActivity = listActivity.sort((a, b) => b.dateTime - a.dateTime);
    const formattedDate = getFormmatedDate(latestActivity[0]?.dateTime);

    return (
        <>
            {dataUser?.uid ? (
                <div className='leftsideMenu-box' style={listActivity.length === 0 ? { height: '115px' } : {}}>
                    {dataUser?.photoURL && (
                        <Image className='leftsideManu-userImg' src={dataUser?.photoURL} width={65} height={65} alt='user-img' />

                    )}
                    <p className='leftsideMenu-userName'>{dataUser?.displayName}</p>
                    {listActivity.length > 0 && (
                        <>
                            <div className='numberOfactivities'>
                                <label className='numberOfactivities-label'>Activities</label>
                                <span className='numberOfactivities-number'>{listActivity.length}</span>
                            </div>

                            <div className='latestActivity'>
                                <label className='numberOfactivities-label'>Latest Activity</label>

                                <div className="latestActivity-title">{latestActivity[0]?.title} <span className='latestActivity-date'>{formattedDate}</span></div>

                            </div>
                        </>
                    )}
                </div>
            ):(
                <div className='leftsideMenu-box' style={{ height: '115px' }}>
                    <p className='leftsideMenu-userName'>Guest</p>
                </div>
            )}
        </>
    )
}

export default LeftsideMenu