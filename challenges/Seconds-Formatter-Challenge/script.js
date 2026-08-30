function getSpokenDuration(seconds) {
    let temp = seconds / 60
    let secondsT = (seconds % 60)
    let minutesT = Math.trunc(temp % 60)
    let hoursT = Math.trunc(temp / 60)

    const secondSuf = secondsT > 1 ? "seconds" : "second"
    const minuteSuf = minutesT > 1 ? "minutes" : "minute"
    const hourSuf = hoursT > 1 ? "hours" : "hour"

    const parts = [];

    if (hoursT > 0) {
        parts.push(`${hoursT} ${hourSuf}`);
    }

    if (minutesT > 0) {
        parts.push(`${minutesT} ${minuteSuf}`);
    }

    if (secondsT > 0) {
        parts.push(`${secondsT} ${secondSuf}`);
    }

    let result = [];

    if (parts.length === 1) {
        result = parts[0];
    } else if (parts.length === 2) {
        result = parts.join(" and ");
    } else {
        result = parts.slice(0, -1).join(", ") + " and " + parts[parts.length - 1];
    }
    return result;
}

console.log(getSpokenDuration(3723))