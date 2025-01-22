'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from 'react';
import { HiOutlinePhotograph } from "react-icons/hi";
import './formAddActivity.css'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useUserDataStore } from '@/store/userData-store';
import { useRouter } from 'next/navigation';
import { addImageToActivity, uploadImageToStorage } from '@/helpers/formFunctions';

const FormAddActivity = ({ schema, activityObj, enableFirstCol, enableThirdCol, dataFile, saveFileName }) => {
    const imagePickRef = useRef(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const { dataUser } = useUserDataStore();

    const router = useRouter()
    useEffect(() => {
        if (selectedFile) {
            uploadImageToStorage(setImageFileUploading, selectedFile, setImageFileUrl, setSelectedFile);
        }
    }, [selectedFile]);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const submitFunc = async (data) => {
        const activity = activityObj(data, dataUser, imageFileUrl, saveFileName, dataFile);

        await addDoc(collection(db, 'activity'), activity)
        router.push('/')
    }

    return (
        <div className='form-box'>
            <h2 className='form-title'>Manual Entry</h2>
            <form onSubmit={handleSubmit(submitFunc)}>
                {enableFirstCol && (
                    <div className='first-col'>
                        <div className='distance-box'>
                            <label className='label-form'>Distance</label>
                            <input
                                className='distance-input'
                                type="text"
                                {...register('distance')}
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^0-9.]/g, '');
                                }}
                            />
                        </div>
                        <div className='duration-box'>
                            <label className='label-form'>Duration</label>
                            <div className='duration-inner-box'>
                                <div className='durationHr'>
                                    <input
                                        type="number"
                                        {...register('durationHr')}
                                        onInput={(e) => {
                                            if (!e.target.value) e.target.value = ""; // Забезпечення пустого значення
                                        }}
                                        placeholder="01"
                                    />
                                    <span>hr</span>
                                </div>
                                <div className='durationMin'>
                                    <input type="number" {...register('durationMin')} placeholder='0' />
                                    <span>min</span>
                                </div>
                                <div className='durationSec'>
                                    <input type="number" {...register('durationSec')} placeholder='00' />
                                    <span>s</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="second-col">
                    <div className='image-upload'>
                        <label className='label-form'>Upload Activity Image</label>
                        {!selectedFile ? (
                            <div onClick={() => imagePickRef.current.click()} className='box-icon-upload'>
                                <HiOutlinePhotograph className="icon-upload-img" />
                            </div>
                        ) : (
                            <button onClick={() => {
                                setImageFileUrl(null);
                                setSelectedFile(null);
                            }}>Delete image</button>
                        )}

                        <input
                            type="file"
                            ref={imagePickRef}
                            accept="image/*"
                            onChange={(e) => addImageToActivity(e, setSelectedFile, setImageFileUrl)}
                            hidden
                        />
                        {errors.activityImage && <p>{errors.activityImage.message}</p>}
                        {selectedFile && (
                            <img
                                className='img-upload'
                                src={imageFileUrl}
                                alt="image"
                            />
                        )}
                    </div>
                </div>
                <div className="third-col">
                    {enableThirdCol && (
                        <div className='third-col-box-line1'>
                            <div className='box-sport'>
                                <label className='label-form'>Sport</label>
                                <select className='select-sport' {...register('sport')}>
                                    <option value="cycling">Ride</option>
                                    <option value="Run">Run</option>
                                </select>
                            </div>
                            <div className="box-dateAndTime">
                                <label className='label-form'>Date & Time</label>
                                <input type="datetime-local" className='date-input' {...register('dateTime')} />
                            </div>
                        </div>
                    )}

                    <div className="third-col-box-line2">
                        <div className='box-title'>
                            <label className='label-form'>Title</label>
                            <input className='title-input' type="text" placeholder='Lunch...' {...register('title')} />
                        </div>
                        <div className="box-description">
                            <label className='label-form'>Description</label>
                            <textarea className='description-textarea' placeholder="How'd it go?" {...register('description')}>
                            </textarea>
                        </div>
                    </div>
                </div>
                <div className="fourth-col">
                    <div className="fourth-col-box-line1">
                        <div className="box-typeOfSport">
                            <label className='label-form'>Type Of Ride</label>
                            <select className='select-sport' {...register('typeOfSport')}>
                                <option value="Race">Race</option>
                                <option value="Long Run">Long Run</option>
                                <option value="Workout">Workout</option>
                            </select>
                        </div>
                        <div className="box-YourFeeling">
                            <label className='label-form'>Perceived Exertion</label>
                            <select className='select-sport' {...register('yourFeelings')}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                            <label className='label-form subtitle'>Where 1 - easy, 10 - hard</label>
                        </div>
                    </div>
                </div>
                <input type="submit" className='submit-btn' value='Create' />
            </form>
        </div >
    )
}

export default FormAddActivity;