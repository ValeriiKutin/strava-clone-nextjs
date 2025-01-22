import React from 'react'
import FormAddActivity from '@/components/form-add-activity/FormAddActivity';
import { createActivityObject1, schemaFormAdd } from '@/helpers/formFunctions';

const ManualPage = () => {

    return (
        <>
            <FormAddActivity schema={schemaFormAdd} activityObj={createActivityObject1} enableFirstCol={true} enableThirdCol={true} />
        </>
    )
}

export default ManualPage;