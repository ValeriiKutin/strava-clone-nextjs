import React, { useState } from 'react'
import '@/app/settings/profile/profile.css'
import { GoPencil } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { useUserDataStore } from '@/store/userData-store';
import { updateUserData } from '@/utils/queryUserByUid';

const CustomSettingsMenu = ({ typeOfMenu, nameValue, labelName, children, customClassNameHeight, btnRemove, nameDataUpdate, dataForUpdateUser, uid }) => {
    const { activeFiledId, setActiveFiledId } = useUserDataStore()
    return (
        <div className={`${customClassNameHeight} hover-settings`} onClick={() => setActiveFiledId(typeOfMenu)}>
            <label className='nameOftheSetting'>{labelName}</label>
            <b className='name-settings'>{nameValue}</b>
            {activeFiledId !== typeOfMenu && <GoPencil className='pensil-icon' />}
            {activeFiledId === typeOfMenu && (
                <div className='edit-name' onClick={(e) => e.stopPropagation()}>
                    {children}
                    <div>
                        <button className='btn-save-name' onClick={() => updateUserData(uid, nameDataUpdate, dataForUpdateUser)}>Save</button>
                        {btnRemove && <button className='btn-weight-remove'>Remove</button>}
                        <IoMdClose className='close-icon-settings' onClick={() => setActiveFiledId('')} />
                    </div>
                </div>

            )}
        </div>
    )
}

export default CustomSettingsMenu