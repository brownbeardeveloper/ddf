export function getOrdinalSuffix(day) {
    if (day === 1 || day === 21 || day === 31) {
        return day + "a";
    } else if (day === 2 || day === 22) {
        return day + "a";
    } else if (day === 3 || day === 23) {
        return day + "e";
    } else {
        return day + "e";
    }
}