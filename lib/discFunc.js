// miliSeconds -> Days
const miliSecondsToDays = ms => ms / 1000 / 60 / 60 / 24 
// date (miliSeconds) -> dif on days respect Date.now()
export const daysOld = ms => {
    const now = new Date()
    return miliSecondsToDays(now - ms)
}
