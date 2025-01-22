'use client'
import { app } from "@/config/firebase";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import * as yup from 'yup';
import { getLocation } from "./getCurrentLocation";

const location = await getLocation()

export const addImageToActivity = (e, setSelectedFile, setImageFileUrl) => {
    const file = e.target.files[0];
    if (file) {
        setSelectedFile(file);
        setImageFileUrl(URL.createObjectURL(file));
    }
}

export const uploadImageToStorage = (setImageFileUploading, selectedFile, setImageFileUrl, setSelectedFile) => {
    setImageFileUploading(true);
    const storage = getStorage(app);
    const filename = new Date().getTime() + '-' + selectedFile.name;
    const storageRef = ref(storage, filename);
    const uploadActivity = uploadBytesResumable(storageRef, selectedFile);

    uploadActivity.on(
        'state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        },
        (error) => {
            console.log(error);
            setImageFileUploading(false);
            setImageFileUrl(null);
            setSelectedFile(null);
        },
        () => {
            getDownloadURL(uploadActivity.snapshot.ref).then((downloadURL) => {
                setImageFileUrl(downloadURL);
                setImageFileUploading(false);
            })
        }
    )
}

export const schemaFormAdd = yup.object().shape({
    distance: yup.number().required(),
    durationHr: yup.number().notRequired(),
    durationMin: yup.number().notRequired(),
    durationSec: yup.number(),
    sport: yup.string().required(),
    dateTime: yup.string().required(),
    title: yup.string().required(),
    description: yup.string().required(),
    typeOfSport: yup.string().required(),
    yourFeelings: yup.string().required(),
})

export const schemaFormEdit = yup.object().shape({
    distance: yup.number(),
    duration: yup.string(),
    sport: yup.string(),
    dateTime: yup.string(),
    title: yup.string(),
    description: yup.string(),
    typeOfSport: yup.string(),
    yourFeelings: yup.string()
})

export const createActivityObject1 = (data, dataUser, imageFileUrl) => ({
    uid: dataUser.uid,
    image: imageFileUrl,
    distance: data.distance,
    duration: `${data.durationHr}hr ${data.durationMin}min ${data.durationSec}sec`,
    durationHr: data.durationHr,
    durationMin: data.durationMin,
    durationSec: data.durationSec,
    sport: data.sport,
    dateTime: data.dateTime,
    title: data.title,
    description: data.description,
    typeOfSport: data.typeOfSport,
    yourFeelings: data.yourFeelings,
    nameOfCreator: dataUser?.displayName,
    imgOfCreator: dataUser?.photoURL,
    locationUser: location
});


export const createActivityObject2 = (data, dataUser, imageFileUrl, saveFileName, dataFile) => ({
    uid: dataUser?.uid,
    image: imageFileUrl,
    distance: saveFileName?.endsWith(".fit") ? Number(dataFile?.laps?.[0]?.total_distance) / 1000 : Number(dataFile?.TrainingCenterDatabase?.Activities?.[0]?.Activity?.[0]?.Lap?.[0]?.TotalTimeSeconds?.[0]) / 1000 || "0",
    duration: `${data.durationHr}hr ${data.durationMin}min ${data.durationSec}sec`,
    durationHr: Math.floor(dataFile?.laps?.[0]?.total_timer_time / 3600),
    durationMin: Math.floor((dataFile?.laps?.[0]?.total_timer_time) % 3600 / 60),
    durationSec: dataFile?.laps?.[0]?.total_timer_time % 60,
    sport: saveFileName?.endsWith(".fit") ? dataFile?.laps?.[0]?.sport : dataFile?.TrainingCenterDatabase?.Activities?.[0]?.Activity?.[0]?.$.Sport,
    dateTime: saveFileName?.endsWith(".fit") ? dataFile?.laps?.[0]?.start_time : dataFile?.TrainingCenterDatabase?.Activities?.[0]?.Activity?.[0]?.Id?.[0],
    title: data?.title,
    description: data?.description,
    typeOfSport: data?.typeOfSport,
    yourFeelings: data?.yourFeelings,
    nameOfCreator: dataUser?.displayName,
    imgOfCreator: dataUser?.photoURL,
    avgSpeed: (Number(dataFile?.laps?.[0]?.avg_speed) * 3.6).toFixed(1),
});


