import FitParser from "fit-file-parser";
import { parseString } from "xml2js"; // Для GPX
export const parseFIT = (file, setError, setDataFile) => {
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

export const parseGPX = (file, setError, setDataFile) => {
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