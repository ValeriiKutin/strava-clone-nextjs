export const calculatePaceOfActivity = (data) => {
    const hourActivity = Number(data?.durationHr) * 3600;
    const minActivity = Number(data?.durationMin) * 60;
    const secActivity = Number(data?.durationSec);
    const paceInSec = (hourActivity + minActivity + secActivity) / data?.distance;
    const resPaceMin = Math.floor(paceInSec / 60);
    const resPaceSec = Math.floor(paceInSec - (resPaceMin * 60));
    return `${resPaceMin}:${resPaceSec} /km`;
}
