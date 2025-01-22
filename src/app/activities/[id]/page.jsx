import ActivityPageClient from '@/components/activityPage/ActivityPageClient';
import React from 'react'

const ActivityPage = async ({ params }) => {
    const { id } = await params;

    return (
        <ActivityPageClient id={id} />
    )
}

export default ActivityPage;