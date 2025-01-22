import { getCurrentLocation } from "@/services/apiCurrentLocation";
export const getLocation = async () => {
    try {
        //перевірка чи бразуер підтримує API Geolocation
        if (navigator.geolocation) {
            //обгортаємо getCurrentPostition в new Promise
            return new Promise((resolve, reject) => {
                /* 
                getCurrentPosition - приймає дві callback-функції
                1) onSuccess - викликається, якщо вдалося отримати щось
                2) onError - викликається, якщо сталась помилка
                */
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const lat = position?.coords.latitude;
                        const lon = position?.coords.longitude;
                        try {
                            const data = await getCurrentLocation(lat, lon);
                            resolve(data[0]?.name || "Unknown location");
                        } catch (error) {
                            console.error(error);
                            resolve("Unknown location");
                        }
                    },
                    (error) => {
                        console.error(error);
                        resolve("Unknown location");
                    }
                );
            });
        } else {
            return "Geolocation not supported";
        }
    } catch (error) {
        console.error(error);
        return "Unknown location";
    }
};
/* 
Для чого використовується new Promise?
-navigator.geolocation.getCurrentPosition - це асинхронний метод, але він не повертає Promise за замовчуванням. 
Замість цього, він використовує callback-функції(onSuccess та onError)
Для того щоб зробити код зручнішим і дозволити використовувати async/await або .then() для обробки резульататів(в моєму випадку я використовую const location = await getLocation()), метод getCurrentPosition обгортають у Promise
-------------------------------------------------------------------------------------------------
Трішки детальніше про Promise:
new Promise приймає 2 метода:
    1)resolve - викликається, якщо операція виконана успішно. Результат передається через цей метод.
    2)reject - виклається у разі помилки( у цьому коді, який вище він не використовується, замість нього всі помилки обробляються через resolve)
-------------------------------------------------------------------------------------------------
Передача getCurrentPosition у Promise:
getCurrentPosition - приймає дві callback-функції
    1) onSuccess - викликається, якщо вдалося отримати щось
    2) onError - викликається, якщо сталась помилка
-------------------------------------------------------------------------------------------------
Результат Promise:
    Promise завершується двома можливими варіантами" 
        1) resolve("назва міста"), якщо успішно отримано координати і дані
        2) resolve("Unknown location"), якщо сталася помилка
*/