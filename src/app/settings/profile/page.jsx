'use client'
import React, { use, useEffect, useRef, useState } from 'react'
import './profile.css'
import { useUserDataStore } from '@/store/userData-store'
import Image from 'next/image'
import { IoMdAddCircleOutline } from "react-icons/io";
import CustomSettingsMenu from '@/components/customSettingsComp/customSettingsComp'
import { months, numberFrom1To31, yearsFrom1902To2012 } from '@/utils/listOptionSettings'
import { auth } from '@/config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

const SettingsProfile = () => {
    const [user] = useAuthState(auth);
    const refImage = useRef()
    const { dataUser } = useUserDataStore()
    /* name */
    const setFirstName = useUserDataStore(state => state.setFirstName);
    const setLastName = useUserDataStore(state => state.setLastName);
    const firstName = useUserDataStore(state => state.nameSettings.firstName);
    const lastName = useUserDataStore(state => state.nameSettings.lastName);
    const splitNameSurname = dataUser?.displayName?.split(' ');
    /* name */

    /* birthday */
    const month = useUserDataStore(state => state.birthdaySettings.month);
    const day = useUserDataStore(state => state.birthdaySettings.day);
    const year = useUserDataStore(state => state.birthdaySettings.year);
    const setMonth = useUserDataStore(state => state.setMonth);
    const setDay = useUserDataStore(state => state.setDay);
    const setYear = useUserDataStore(state => state.setYear);
    const splitBirthday = dataUser?.birthday?.split(' ');
    /* birthday */

    /* gender */
    const setGender = useUserDataStore(state => state.setGender);
    const genderSettings = useUserDataStore(state => state.genderSettings);
    const handleGenderChange = (e) => {
        setGender(e.target.value)
    }
    /* gender */
    console.log(genderSettings);


    return (
        <div className='margin-settings'>
            <h1>My Profile</h1>
            <div className="settings-box">
                <div className="user-image-settings-line">
                    {dataUser?.photoURL && (
                        <div className='img-user-box'>
                            <label className='nameOftheSetting'>Current Photo</label>
                            <div className='img-user-display'>
                                <Image className='image-settings' src={dataUser?.photoURL} width={120} height={120} alt='user-img' onClick={() => refImage.current.click()} />
                                <IoMdAddCircleOutline className='icon-add-userimage' onClick={() => refImage.current.click()} />
                                <button className='btn-remove-img'>Remove</button>
                            </div>
                        </div>
                    )}
                    <input ref={refImage} type="file" accept='image/*' hidden />
                </div>
                <CustomSettingsMenu typeOfMenu={'name'} nameValue={dataUser?.displayName} labelName={'Name'} customClassNameHeight={'user-info-settings-line'} btnRemove={false} nameDataUpdate={'displayName'} dataForUpdateUser={`${firstName === '' ? splitNameSurname?.[0] : firstName} ${lastName === '' ? splitNameSurname?.[0] : lastName}`} uid={user?.uid}>
                    <input
                        type="text"
                        className='input-settings'
                        placeholder='Name'
                        defaultValue={splitNameSurname?.[0]}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        type="text"
                        className='input-settings'
                        placeholder='Sername'
                        defaultValue={splitNameSurname?.[1]}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </CustomSettingsMenu>

                <CustomSettingsMenu typeOfMenu={'birthday'} nameValue={`${month === '' ? splitBirthday?.[0] : month} ${day === '' ? splitBirthday?.[1] : day}, ${year === '' ? splitBirthday?.[2] : year}`} labelName={'Birthday'} customClassNameHeight={'user-info-settings-line'} btnRemove={false} nameDataUpdate={'birthday'} dataForUpdateUser={`${month || splitBirthday?.[0]} ${day || splitBirthday?.[1]} ${year || splitBirthday?.[2]}`} uid={user?.uid}>
                    <div className='settings-options-box'>
                        <select className='select-settings' onChange={(e) => setMonth(e.target.value)} value={splitBirthday?.[0]}>
                            {months.map((month, index) => (
                                <option className='option-settings' key={index} value={month.value}>{month.label}</option>
                            ))}
                        </select>
                        <select className='select-settings' onChange={(e) => setDay(e.target.value)} value={splitBirthday?.[1]}>
                            {numberFrom1To31.map((day, index) => (
                                <option className='option-settings' key={index} value={day}>{day}</option>
                            ))}
                        </select>
                        <select className='select-settings' onChange={(e) => setYear(e.target.value)} value={splitBirthday?.[2]}>
                            {yearsFrom1902To2012.map((year, index) => (
                                <option className='option-settings' key={index} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>

                </CustomSettingsMenu>

                <CustomSettingsMenu typeOfMenu={'gender'} nameValue={dataUser?.gender} labelName={'Gender'} customClassNameHeight={'user-info-settings-radio-line'} btnRemove={false} nameDataUpdate={'gender'} dataForUpdateUser={genderSettings} uid={user?.uid}>
                    <div className='settings-radio-box'>
                        <div>
                            <input type="radio" id='man' value='Man' name='radioGroup' onChange={handleGenderChange} />
                            <label htmlFor="man">Man</label>
                        </div>
                        <div>
                            <input type="radio" id='woman' value='Woman' name='radioGroup' onChange={handleGenderChange} />
                            <label htmlFor="woman">Woman</label>
                        </div>
                        <div>
                            <input type="radio" id='notToSay' value='Prefer not to say' name='radioGroup' onChange={handleGenderChange} />
                            <label htmlFor="notToSay">Prefer not to say</label>
                        </div>
                    </div>

                </CustomSettingsMenu>

                <CustomSettingsMenu typeOfMenu={'location'} nameValue={dataUser?.location} labelName={'Location'} customClassNameHeight={'user-info-settings-line'} btnRemove={false}>
                    <input type="text" className='location-input' />
                </CustomSettingsMenu>

                <CustomSettingsMenu typeOfMenu={'weight'} nameValue={''} labelName={'Weight'} customClassNameHeight={'user-info-settings-line'} btnRemove={true}>
                    <div>
                        <input type="text" className='weight-input' /> <span>kg</span>
                    </div>
                </CustomSettingsMenu>
            </div>
        </div>
    )
}

export default SettingsProfile