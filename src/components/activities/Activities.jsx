import { useUserDataStore } from '@/store/userData-store'
import './Activities.css'
import React, { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/config/firebase';
import Activity from '@/components/Activity/Activity';
import { getActivity } from '@/helpers/getActivity';


const Activities = () => {
    const { listActivity, setListActivity, dataUser, searchActivity } = useUserDataStore();

    const filteredActivities = listActivity.filter((activity) =>
        activity.title.toLowerCase().includes(searchActivity.toLowerCase())
    );


    const deleteActivity = async (activityToDeleteId, userToDeleteId) => {
        try {
            if (userToDeleteId !== dataUser?.uid) {
                return;
            }
            const activityToDelete = doc(db, 'activity', activityToDeleteId);
            await deleteDoc(activityToDelete);
            // setListActivity((task) => task.filter((item) => item.id !== activityToDelete.id));
            getActivity(setListActivity)
        } catch (error) {
            console.error(error);
        }

    }
    useEffect(() => {
        getActivity(setListActivity)
    }, [])

    return (
        <div className='container-activity'>
            {filteredActivities?.length > 0 && Array.isArray(filteredActivities) ?
                filteredActivities?.map((data) => (
                    <div className='activities-box' key={data.id}>
                        <Activity data={data} deleteActivity={deleteActivity} />
                    </div>
                )) : (
                    <p>No activities available</p>
                )
            }
        </div>
    )
}

export default Activities;