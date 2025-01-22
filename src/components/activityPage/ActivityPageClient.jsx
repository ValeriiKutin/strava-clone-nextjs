'use client';
import React, { useEffect, useState } from 'react';
import { updatingFirebaseData } from '@/utils/updatingFirebaseData';
import Container from '../container/Container';
import Image from 'next/image';
import './activityPageClient.css'
import { getFormmatedDate } from './helper/getFormattedDate';
import { calculatePaceOfActivity } from '../Activity/helper/calculatePaceOfActivity';

const ActivityPageClient = ({ id }) => {
    const [currentData, setCurrentData] = useState(null);
    const formattedDate = getFormmatedDate(currentData?.dateTime);
    const pace = calculatePaceOfActivity(currentData);
    useEffect(() => {
        updatingFirebaseData(id, setCurrentData);
    }, [id]);



    return (
        <Container>
            <div className="ActivityPageClient">
                <label className='activity-label-page'>{currentData?.nameOfCreator} – {currentData?.sport} – {currentData?.typeOfSport}</label>
                <div className='separateActivityPage-mainBox'>
                    <div className="separateActivityPage-left-box">
                        {currentData?.imgOfCreator && (
                            <Image className='separateActivityPage-userImg' src={currentData?.imgOfCreator} width={100} height={100} alt='user-img' />
                        )}
                        <div className="separateActivityPage-info">
                            <span className='separateActivityPage-formattedDate'>{formattedDate}</span>
                            <p className='separateActivityPage-title'>{currentData?.title}</p>
                            <p className='separateActivityPage-description'>{currentData?.description}</p>
                        </div>
                    </div>
                    <div className="separateActivityPage-right-box">
                        <label>
                            <span>{currentData?.distance} km</span>
                            <p>Distance</p>
                        </label>
                        <label>
                            <span>
                                {currentData?.durationHr !== 0 && `${currentData?.durationHr}hr `}
                                {currentData?.durationMin !== 0 && `${currentData?.durationMin}min `}
                                {currentData?.durationSec}sec
                            </span>
                            <p>Moving Time</p>
                        </label>
                        <label>
                            <span>{pace}</span>
                            <p>Pace</p>
                        </label>
                        <div className="box-for-feelenings">
                            <label htmlFor="">Perceived effort</label>
                            <div className="yourFeelings-wrapper">
                                <div className="yourFeelings" style={{ width: `${currentData?.yourFeelings * 10}%` }}></div>
                                <span className='effortValue'>{currentData?.yourFeelings} / 10</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ActivityPageClient;