/* 'use client'
import { useState } from "react";
import FitParser from "fit-file-parser";
import { parseString } from "xml2js"; // Для GPX

export default function Home() {
    const [dataFile, setDataFile] = useState(null);
    const [error, setError] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileName = file.name.toLowerCase();
            if (fileName.endsWith(".fit")) {
                parseFIT(file);
            } else if (fileName.endsWith(".gpx")) {
                parseGPX(file);
            } else {
                setError("Unsupported file format. Please upload a .fit or .gpx file.");
            }
        }
    };

    const parseFIT = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const fitParser = new FitParser({
                force: true, // Ігнорує помилки CRC
            });
            
            fitParser.parse(e.target.result, (error, data) => {
                if (error) {
                    setError("Error parsing FIT file.");
                    console.error(error);
                } else {
                    setDataFile(data);
                    setError(null);
                    console.log("Parsed FIT data:", data);
                }
            });
        };
        reader.readAsArrayBuffer(file);
    };

    const parseGPX = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const gpxContent = e.target.result;
            parseString(gpxContent, (err, result) => {
                if (err) {
                    setError("Error parsing GPX file.");
                    console.error(err);
                } else {
                    setDataFile(result);
                    setError(null);
                    console.log("Parsed GPX data:", result);
                }
            });
        };
        reader.readAsText(file);
    };
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
    );
}
 */