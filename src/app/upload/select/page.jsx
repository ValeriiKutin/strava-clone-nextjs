'use client'
import useHandleFileUploading from '@/hooks/useHandleFileUploading';
import React, { useEffect } from 'react'
import './select.css'
import FormAddActivity from '@/components/form-add-activity/FormAddActivity';
import { createActivityObject2, schemaFormEdit } from '@/helpers/formFunctions';

const SelectPage = () => {
    const [error, dataFile, handleFileUpload, setDataFile, saveFileName] = useHandleFileUploading();
    // console.log(dataFile?.TrainingCenterDatabase?.Activities?.[0]?.Activity?.[0]?.Id?.[0]);

    return (
        <div className='selectPage'>
            <h1>Activity File Parser</h1>
            <input type="file" accept=".fit,.gpx,.tcx" onChange={handleFileUpload} />
            {dataFile && <FormAddActivity schema={schemaFormEdit} activityObj={createActivityObject2} enableFirstCol={false} enableThirdCol={false} dataFile={dataFile} saveFileName={saveFileName} />}
        </div>
    )
}

export default SelectPage


/*      const duration = dataFile?.TrainingCenterDatabase?.Activities?.[0]?.Activity?.[0]?.Lap?.[0]?.TotalTimeSeconds?.[0] || "0"; */


/*   const duration = dataFile?.laps?.[0]?.total_distance; */