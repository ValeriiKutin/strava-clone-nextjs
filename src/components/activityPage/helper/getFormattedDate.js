export const getFormmatedDate = (currentData) => {
    const date = new Date(currentData);

    const options = {
        year: date.getFullYear(),
        month: date.toLocaleString("uk-UA", { month: "long" }),
        day: date.getDate().toString().padStart(2, "0"),
        hours: date.getHours().toString().padStart(2, "0"),
        minutes: date.getMinutes().toString().padStart(2, "0"),
    };

    const formattedDate = `${options.day} ${options.month} ${options.year} р., ${options.hours}:${options.minutes}`;

    return formattedDate;
}