function getTotalSeconds(timeString) {
    const parts = timeString.split(':').map(Number);
    let totalSeconds = 0;

    if (parts.length === 3) { // HH:MM:SS:ms
        totalSeconds += parts[0] * 3600; // hours to seconds
        totalSeconds += parts[1] * 60;   // minutes to seconds
        totalSeconds += parts[2];
    } else if (parts.length === 2) { // MM:SS:ms
        totalSeconds += parts[0] * 60;   // minutes to seconds
        totalSeconds += parts[1];
    }

    return totalSeconds;
}

module.exports = getTotalSeconds;