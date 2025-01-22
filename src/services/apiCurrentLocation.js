import axios from "axios";

export const getCurrentLocation = async (lat, lon) => {
    const apiKey = process.env.NEXT_PUBLIC_OPEN_WEATHER_API;
    const res = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    const data = res.data

    return data;
}