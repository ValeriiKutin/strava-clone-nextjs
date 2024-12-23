'use client'
import { useState } from "react";
import { parseFIT } from '@/utils/handleFitGpxFiles'
import { parseGPX } from '@/utils/handleFitGpxFiles'

const useHandleFileUploading = () => {
    const [dataFile, setDataFile] = useState(null);
    const [error, setError] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileName = file.name.toLowerCase();
            if (fileName.endsWith(".fit")) {
                parseFIT(file, setError, setDataFile);
            } else if (fileName.endsWith(".gpx")) {
                parseGPX(file, setError, setDataFile);
            } else {
                setError("Unsupported file format. Please upload a .fit or .gpx file.");
            }
        }
    };

    return [error, dataFile, handleFileUpload, setDataFile]
}

export default useHandleFileUploading;


/* const [error, dataFile, handleFileUpload] = useHandleFileUploading();
return (
    <div>
        <h1>Activity File Parser</h1>
        <input type="file" accept=".fit,.gpx" onChange={handleFileUpload} />
        {error && <p style={{ color: "red" }}>{error}</p>}
        {dataFile && (
            <pre style={{ whiteSpace: "pre-wrap" }}>
                {JSON.stringify(dataFile, null, 2)}
            </pre>
        )}
    </div>
); */